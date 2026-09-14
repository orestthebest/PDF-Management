// Alles rund um Passwörter und Sessions.
import pool from './database.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
 
// Wie lange ein Login gültig bleibt: 30 Tage (in Millisekunden).
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000;
 
// Dieselbe Dauer in Sekunden, weil Cookies in Sekunden rechnen.
export const SESSION_COOKIE_MAX_AGE = SESSION_DURATION / 1000;
 
// Verschlüsselt ein Passwort zu einem Hash.
// Die 10 ist die Anzahl der Rechenrunden: höher heißt sicherer, aber langsamer.
export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}
 
// Vergleicht ein eingegebenes Passwort mit dem gespeicherten Hash.
export async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}
 
// Erstellt eine neue Session für einen User und speichert sie in der Datenbank.
// Zurück kommt die Session-ID, die danach ins Cookie geschrieben wird.
export async function createSession(userId) {
    const sessionId = randomUUID();
    const expiresAt = new Date(Date.now() + SESSION_DURATION);
 
    await pool.execute(
        'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)',
        [sessionId, userId, expiresAt]
    );
 
    return sessionId;
}
 
// Prüft eine Session und gibt den dazugehörigen User zurück (oder null).
// Die Rolle wird gleich mitgeladen, damit später keine zweite Query nötig ist.
export async function validateSession(sessionId) {
    const [rows] = await pool.execute(
        `SELECT users.id, users.username, users.role
         FROM sessions
         JOIN users ON sessions.user_id = users.id
         WHERE sessions.id = ? AND sessions.expires_at > NOW()`,
        [sessionId]
    );
 
    return rows[0] ?? null;
}
 
// Löscht eine Session aus der Datenbank (Logout).
export async function invalidateSession(sessionId) {
    await pool.execute('DELETE FROM sessions WHERE id = ?', [sessionId]);
}