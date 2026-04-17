import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../server/database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('--- Listando todos os artigos no banco ---');
db.all("SELECT id, title, slug, is_published, published_at, created_at FROM articles", (err, rows) => {
    if (err) {
        console.error('Erro:', err.message);
    } else {
        console.table(rows);
        if (rows.length === 0) {
            console.log('Nenhum artigo encontrado.');
        }
    }
    db.close();
});
