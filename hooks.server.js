import { validateSession } from '$lib/server/auth.js';
 
// Läuft bei jeder Anfrage, bevor eine Seite gerendert wird: liest die Session
// aus dem Cookie und legt den eingeloggten User in event.locals ab, damit ihn
// alle Seiten und Actions nutzen können.
export async function handle({ event, resolve }) {
    const sessionId = event.cookies.get('session');
    event.locals.user = sessionId ? await validateSession(sessionId) : null;
 
    // Cookie vorhanden, Session aber abgelaufen: totes Cookie gleich entfernen.
    if (sessionId && !event.locals.user) {
        event.cookies.delete('session', { path: '/' });
    }
 
    return resolve(event);
}