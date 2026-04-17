# Leads Automation Blueprint: Google Sheets Proxy

Este blueprint descreve como integrar formulários de captura de leads com o Google Sheets de forma segura, utilizando o backend como um proxy para evitar exposição de URLs e contornar restrições de CORS.

## Fluxo de Automação

1. **Frontend**: O usuário preenche o formulário. O React envia os dados para a sua própria API interna (`/api/leads`).
2. **Backend (Proxy)**: O servidor Node.js recebe os dados, valida-os e então faz um `fetch` para a URL do Webhook do Google Apps Script.
3. **Google Sheets**: O script do Google recebe a requisição, formata os dados e insere uma nova linha na planilha.

## Google Apps Script (Webhook)
O código abaixo deve ser inserido no "Editor de Script" da sua planilha do Google:

```javascript
function doPost(e) {{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Insere: Data, Nome, Email, Mensagem (ajuste conforme seu form)
  sheet.appendRow([new Date(), data.name, data.email, data.message]);
  
  return ContentService.createTextOutput("Sucesso").setMimeType(ContentService.MimeType.TEXT);
}}
```

## Benefícios do Proxy
- **Segurança**: A URL do Webhook do Google fica protegida no arquivo `.env` do servidor, não sendo visível no inspetor do navegador.
- **CORS**: O navegador não bloqueia a requisição, pois ela é feita "servidor para servidor".
- **Logs**: Você pode salvar uma cópia do lead no seu próprio banco de dados SQLite antes de enviar para o Google.

## Dependências Necessárias
- `dotenv` (para a URL secreta)
- No Node.js moderno, o `fetch` já é nativo. Para versões antigas, use `node-fetch`.
