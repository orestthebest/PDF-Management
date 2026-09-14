import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { verifyPassword, createSession, SESSION_COOKIE_MAX_AGE } from '$lib/server/auth.js';
 
// Wer schon eingeloggt ist, braucht die Login-Seite nicht mehr zu sehen.
export async function load({ locals }) {
    if (locals.user) {
        redirect(303, locals.user.role === 'admin' ? '/admin' : '/dashboard');
    }
    return {};
}
 
export const actions = {
    // Prüft die Login-Daten und erstellt bei Erfolg eine Session.
    login: async ({ request, cookies }) => {
        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');
 
        if (!username || !password) {
            return fail(400, { error: 'Please fill in all fields' });
        }
 
        const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
 
        // Gleiche Fehlermeldung für "User existiert nicht" und "falsches Passwort",
        // damit man nicht herausfinden kann, welche Usernamen es gibt.
        if (rows.length === 0) {
            return fail(400, { error: 'Wrong username or password', username });
        }
 
        const valid = await verifyPassword(password, rows[0].password_hash);
        if (!valid) {
            return fail(400, { error: 'Wrong username or password', username });
        }
 
        // Session in der Datenbank anlegen und die ID ins Cookie schreiben.
        const sessionId = await createSession(rows[0].id);
        cookies.set('session', sessionId, {
            path: '/',
            httpOnly: true, // JavaScript im Browser kommt nicht an das Cookie heran
            sameSite: 'lax', // schützt vor fremden Seiten, die Formulare abschicken
            maxAge: SESSION_COOKIE_MAX_AGE
        });
 
        // Admins landen direkt im Admin-Panel, normale User im Dashboard.
        redirect(303, rows[0].role === 'admin' ? '/admin' : '/dashboard');
    }
};