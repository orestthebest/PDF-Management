// Verbindung zur MySQL-Datenbank über einen Connection-Pool.
// Ein Pool hält mehrere Verbindungen offen und verteilt sie an die Anfragen.
// Das ist schneller, als für jede Query neu zu verbinden.
import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from '$env/static/private';
 
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    // Maximal 10 gleichzeitige Verbindungen, danach warten die Anfragen.
    connectionLimit: 10
});
 
export default pool;