import { error, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';

// Diese Route liefert keine Seite, sondern die Datei selbst.
// Deshalb +server.js mit einer GET-Funktion statt +page.svelte.
export async function GET({ params, locals }) {
    if (!locals.user) redirect(303, '/login');

    const [rows] = await pool.execute(
        'SELECT id, filename, blob_url, owner_id FROM pdfs WHERE id = ?',
        [params.id]
    );

    if (rows.length === 0) error(404, 'This document does not exist.');

    const pdf = rows[0];

    // Herunterladen darf nur der Besitzer oder ein Admin. Ohne diese Prüfung
    // könnte jeder eingeloggte User einfach fremde IDs durchprobieren.
    const isOwner = pdf.owner_id === locals.user.id;
    const isAdmin = locals.user.role === 'admin';
    if (!isOwner && !isAdmin) error(403, 'This document belongs to someone else.');

    // Die Datei aus dem Blob-Speicher holen.
    const response = await fetch(pdf.blob_url);
    if (!response.ok) error(502, 'The file could not be loaded from storage.');

    // Datei an den Browser weiterreichen. Content-Disposition attachment sorgt
    // dafür, dass sie heruntergeladen wird und wieder ihren Originalnamen hat.
    return new Response(response.body, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${pdf.filename}"`
        }
    });
}