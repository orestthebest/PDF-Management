import { fail, redirect } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import pool from '$lib/server/database.js';

// Größte erlaubte Dateigröße: 10 MB.
const MAX_SIZE = 10 * 1024 * 1024;

export async function load({ locals, url }) {
    // Ohne Login geht hier gar nichts.
    if (!locals.user) redirect(303, '/login');

    // Admins haben kein Upload-Formular, sie gehören ins Admin-Panel.
    if (locals.user.role === 'admin') redirect(303, '/admin');

    // Nur die eigenen PDFs laden, neueste zuerst.
    // Das Datum formatiert gleich MySQL, dann braucht die Seite dafür kein JavaScript.
    const [pdfs] = await pool.execute(
        `SELECT id, title, filename, size_bytes,
                DATE_FORMAT(uploaded_at, '%d.%m.%Y') AS uploaded_date
         FROM pdfs
         WHERE owner_id = ?
         ORDER BY uploaded_at DESC`,
        [locals.user.id]
    );

    return {
        pdfs,
        // Nach einem erfolgreichen Upload steht ?uploaded=1 in der Adresse,
        // damit wir eine Erfolgsmeldung anzeigen können.
        uploaded: url.searchParams.get('uploaded') === '1'
    };
}

export const actions = {
    // Lädt ein PDF hoch und speichert die Daten dazu in der Datenbank.
    upload: async ({ request, locals }) => {
        // Sicherheitscheck: die Prüfung in load reicht nicht, eine Action kann
        // auch direkt aufgerufen werden.
        if (!locals.user) redirect(303, '/login');
        if (locals.user.role === 'admin') redirect(303, '/admin');

        const form = await request.formData();
        const file = form.get('file');
        const title = form.get('title');

        if (!title || title.trim() === '') {
            return fail(400, { error: 'Please enter a title' });
        }

        if (!file || file.size === 0) {
            return fail(400, { error: 'Please choose a PDF file' });
        }

        // Nur echte PDFs zulassen. Der Browser schickt den Typ mit, zusätzlich
        // prüfen wir die Endung, falls der Typ fehlt.
        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
        if (!isPdf) {
            return fail(400, { error: 'Only PDF files are allowed' });
        }

        if (file.size > MAX_SIZE) {
            return fail(400, { error: 'The file is larger than 10 MB' });
        }

        // Datei zu Vercel Blob hochladen, zurück kommt eine öffentliche URL.
        // addRandomSuffix hängt eine Zufallsfolge an den Namen, damit zwei User
        // mit gleichem Dateinamen sich nicht gegenseitig überschreiben.
        const blob = await put(`pdfs/${file.name}`, file, {
            access: 'public',
            addRandomSuffix: true,
            token: BLOB_READ_WRITE_TOKEN
        });

        // In der Datenbank landen nur die Metadaten plus die URL.
        await pool.execute(
            `INSERT INTO pdfs (title, filename, blob_url, size_bytes, owner_id)
             VALUES (?, ?, ?, ?, ?)`,
            [title.trim(), file.name, blob.url, file.size, locals.user.id]
        );

        // Weiterleiten statt einfach zurückgeben: so kann man die Seite neu
        // laden, ohne den Upload versehentlich zu wiederholen.
        redirect(303, '/dashboard?uploaded=1');
    }
};