import sys
import os

def generate_express_server():
    """
    Gera o boilerplate do servidor Express com Auth e SQLite.
    """
    code = '''
const express = require('express');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3');
const cookieParser = require('cookie-parser');

const app = express();
const db = new sqlite3.Database('./database.sqlite');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.use(express.json());
app.use(cookieParser());

// Middleware de Autenticação
const requireAuth = (req, res, next) => {
    const token = req.cookies.admin_token;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Não autorizado' });
    }
};

// Rota de Login Simplificada
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    // Validação (exemplo contra env)
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
        res.cookie('admin_token', token, { httpOnly: true, maxAge: 8 * 3600000 });
        return res.json({ success: true });
    }
    res.status(401).json({ error: 'Falha no login' });
});

app.listen(3001, () => console.log('Server running on 3001'));
'''
    return code

if __name__ == "__main__":
    print("--- EXPRESS SERVER SETUP (JS) ---")
    print(generate_express_server())
    print("\n--- DEPENDENCIES ---")
    print("npm install express jsonwebtoken sqlite3 cookie-parser dotenv cors bcrypt express-rate-limit")
