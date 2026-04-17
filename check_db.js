import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../server/database.sqlite');
console.log('Verificando banco em:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao abrir banco:', err.message);
        process.exit(1);
    }
});

db.serialize(() => {
    console.log('\n--- Esquema da tabela articles ---');
    db.all("PRAGMA table_info(articles)", (err, rows) => {
        if (err) {
            console.error('Erro ao ler esquema:', err.message);
        } else {
            console.table(rows);
        }
    });

    console.log('\n--- Conteúdo da tabela articles ---');
    db.all("SELECT id, title, slug, is_published, published_at FROM articles", (err, rows) => {
        if (err) {
            console.error('Erro ao ler artigos (provavelmente coluna faltante):', err.message);
            // Tenta sem colunas suspeitas
            db.all("SELECT id, title, slug, is_published FROM articles", (err, rows) => {
                if (err) console.error('Erro fatal ao ler artigos:', err.message);
                else console.table(rows);
            });
        } else {
            console.table(rows);
        }
        db.close();
    });
});
