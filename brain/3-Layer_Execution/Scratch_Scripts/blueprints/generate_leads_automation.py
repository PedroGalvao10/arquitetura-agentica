import sys
import os

def generate_proxy_endpoint():
    """
    Gera a rota de proxy do backend para enviar leads ao Google Sheets.
    """
    code = '''
// Carregue do seu .env: GOOGLE_SHEETS_WEBHOOK_URL
app.post('/api/leads', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validação básica
        if (!email) return res.status(400).json({ error: 'Email obrigatório' });

        // Envio para o Google Sheets (Proxy)
        const response = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify({ name, email, message, timestamp: new Date() }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            res.json({ success: true, message: 'Lead enviado com sucesso' });
        } else {
            throw new Error('Falha no webhook do Google');
        }
    } catch (error) {
        console.error('Lead Error:', error);
        res.status(500).json({ error: 'Erro interno ao processar lead' });
    }
});
'''
    return code

if __name__ == "__main__":
    print("--- GOOGLE SHEETS PROXY ENDPOINT (JS) ---")
    print(generate_proxy_endpoint())
    print("\n--- INSTRUCTIONS ---")
    print("1. Crie seu Webhook via Google Apps Script.")
    print("2. Adicione GOOGLE_SHEETS_WEBHOOK_URL ao seu arquivo .env.")
    print("3. Use fetch() ou axios por segurança se não estiver em Node 18+.")
