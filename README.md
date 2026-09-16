# PDFVault
 
Mini-Webapp zum Speichern und Herunterladen von PDFs.
Wiederholungsübung PDF-Management, HTL Shkodër 2026.
 
**Team:** Orest (Projektleitung) und Suisa
 
## Funktionen
 
- Login und Logout mit Session in der Datenbank
- Registrierung neuer Benutzer
- Dashboard mit Upload-Formular und den eigenen PDFs
- Download, geprüft auf Besitzer oder Admin
- Admin-Panel mit allen PDFs aller Benutzer und Löschfunktion
- Öffentliche Marketing-Seite ohne Login
 
## Technik
 
| Bereich    | Verwendet                |
| ---------- | ------------------------ |
| Framework  | SvelteKit 2 mit Svelte 5 |
| Styling    | Tailwind CSS 4           |
| Datenbank  | MySQL über mysql2        |
| Dateien    | Vercel Blob              |
| Passwörter | bcrypt                   |
 
## Routen
 
| Route            | Sichtbar für      | Gebaut von |
| ---------------- | ----------------- | ---------- |
| `/`              | alle              | Suisa      |
| `/login`         | alle              | Orest      |
| `/register`      | alle              | Orest      |
| `/logout`        | eingeloggt        | Orest      |
| `/dashboard`     | nur Rolle user    | Suisa      |
| `/download/[id]` | Besitzer o. Admin | Suisa      |
| `/admin`         | nur Rolle admin   | Orest      |
 
## Starten
 
```bash
npm install
npm run dev
```
 
Dazu eine Datei `.env` im Hauptordner anlegen:
 
```
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
DB_PORT=...
```
 
Die Tabellen kommen aus `db/database.sql`.
 
## Wie der Zugriffsschutz funktioniert
 
1. Beim Login wird eine zufällige UUID als Session in der Datenbank gespeichert
   und als httpOnly-Cookie an den Browser geschickt.
2. `src/hooks.server.js` liest dieses Cookie bei jeder Anfrage und legt den
   passenden Benutzer in `locals.user` ab.
3. Jede geschützte Route prüft `locals.user` selbst, sowohl in `load` als auch
   in den Actions. Der Download vergleicht zusätzlich `owner_id` mit der
   eigenen ID und lässt Admins durch.