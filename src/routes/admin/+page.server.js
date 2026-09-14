import { error, redirect } from '@sveltejs/kit';
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