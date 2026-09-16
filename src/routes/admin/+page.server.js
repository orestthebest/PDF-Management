import { error, redirect } from '@sveltejs/kit';
import { del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import pool from '$lib/server/database.js';
 
export async function load({ locals }) {
    if (!locals.user) redirect(303, '/login');
 
    // Nur Admins dürfen hier rein. 403 statt Weiterleitung, damit ein normaler
    // User klar sieht, dass ihm die Berechtigung fehlt.
    if (locals.user.role !== 'admin') error(403, 'This page is for admins only.');
 
    // Alle PDFs im System, mit dem Namen des Besitzers dazu.
    const [pdfs] = await pool.execute(
        `SELECT pdfs.id, pdfs.title, pdfs.filename, pdfs.size_bytes,
                DATE_FORMAT(pdfs.uploaded_at, '%d.%m.%Y') AS uploaded_date,
                users.username AS owner_name
         FROM pdfs
         JOIN users ON pdfs.owner_id = users.id
         ORDER BY pdfs.uploaded_at DESC`
    );
 
    return { pdfs };
}
 
export const actions = {
    // Löscht ein beliebiges PDF, egal wem es gehört. Das ist das Admin-Recht.
    deletePdf: async ({ request, locals }) => {
        // Auch hier prüfen: eine Action kann direkt aufgerufen werden,
        // ohne dass vorher load gelaufen ist.
        if (!locals.user) redirect(303, '/login');
        if (locals.user.role !== 'admin') error(403, 'This action is for admins only.');
 
        const form = await request.formData();
        const pdfId = form.get('pdfId');
 
        // Zuerst die URL holen, danach ist der Datensatz weg.
        const [rows] = await pool.execute('SELECT blob_url FROM pdfs WHERE id = ?', [pdfId]);
        if (rows.length === 0) redirect(303, '/admin');
 
        // Datei im Blob-Speicher löschen. Falls sie dort schon fehlt, soll der
        // Datenbankeintrag trotzdem verschwinden, deshalb try/catch.
        try {
            await del(rows[0].blob_url, { token: BLOB_READ_WRITE_TOKEN });
        } catch {
            // Datei war nicht mehr da, kein Problem.
        }
 
        await pool.execute('DELETE FROM pdfs WHERE id = ?', [pdfId]);
 
        redirect(303, '/admin');
    }
};