import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { hashPassword, createSession, SESSION_COOKIE_MAX_AGE } from '$lib/server/auth.js';
 
// Wer schon eingeloggt ist, braucht kein neues Konto.
export async function load({ locals }) {
    if (locals.user) {
        redirect(303, locals.user.role === 'admin' ? '/admin' : '/dashboard');
    }
    return {};
}
 
export const actions = {
    // Legt einen neuen User an und loggt ihn direkt ein.
    register: async ({ request, cookies }) => {
        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');
 
        if (!username || !password) {
            return fail(400, { error: 'Please fill in all fields' });
        }
 
        // Kurze Passwörter gar nicht erst zulassen.
        if (password.length < 6) {
            return fail(400, { error: 'The password needs at least 6 characters', username });
        }
 
        let result;
        try {
            // Das Passwort wird gehasht gespeichert, niemals im Klartext.
            // Die Rolle steht NICHT im Formular, sonst könnte sich jeder selbst
            // zum Admin machen. Die Datenbank setzt automatisch 'user'.
            [result] = await pool.execute(
                'INSERT INTO users (username, password_hash) VALUES (?, ?)',
                [username, await hashPassword(password)]
            );
        } catch (err) {
            // username ist in der DB UNIQUE, doppelte Namen lösen diesen Fehler aus.
            if (err.code === 'ER_DUP_ENTRY') {
                return fail(400, { error: 'This username is already taken', username });
            }
            throw err;
        }
 
        // Direkt einloggen, damit man sich nicht zweimal anmelden muss.
        const sessionId = await createSession(result.insertId);
        cookies.set('session', sessionId, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: SESSION_COOKIE_MAX_AGE
        });
 
        // Neue Konten sind immer normale User, also ab ins Dashboard.
        redirect(303, '/dashboard');
    }
};