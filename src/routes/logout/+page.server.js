import { redirect } from '@sveltejs/kit';
import { invalidateSession } from '$lib/server/auth.js';
 
// Diese Route hat absichtlich keine +page.svelte. Wer sie direkt im Browser
// aufruft, wird einfach zur Startseite geschickt.
export async function load() {
    redirect(303, '/');
}
 
export const actions = {
    // Loggt den User aus: löscht die Session in der DB und das Cookie im Browser.
    logout: async ({ cookies }) => {
        const sessionId = cookies.get('session');
 
        if (sessionId) {
            // In der Datenbank löschen, damit die Session wirklich ungültig ist
            // und nicht nur das Cookie fehlt.
            await invalidateSession(sessionId);
            cookies.delete('session', { path: '/' });
        }
 
        redirect(303, '/');
    }
};