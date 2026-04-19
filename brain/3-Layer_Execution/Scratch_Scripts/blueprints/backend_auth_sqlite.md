# Backend Blueprint: Auth (JWT) + SQLite

Este blueprint descreve como configurar um backend administrativo leve, seguro e performático utilizando Node.js, Express e SQLite3. Este setup é ideal para sites institucionais com CMS integrado.

## Arquitetura de Dados (SQLite)

Utilizamos o **SQLite** pela sua natureza "zero-config" e armazenamento em um único arquivo (`database.sqlite`), o que facilita backups e deploys em servidores simples.

### Tabelas Principais:
- `articles`: Armazena o conteúdo do blog, metadados de SEO e status de publicação.
- `login_logs`: Rastreia tentativas de acesso para auditoria e segurança.

## Segurança e Autenticação

1. **JWT (JSON Web Tokens)**: Utilizado para gerenciar sessões sem estado no servidor. O token é armazenado em um `httpOnly Cookie` para mitigar ataques XSS.
2. **Rate Limiting**: Aplicado na rota de login (`/api/auth/login`) para impedir ataques de força bruta.
3. **CORS**: Rigorosamente configurado para aceitar apenas o domínio do frontend.

## Fluxo de Login
1. O usuário envia email/senha.
2. O servidor valida contra variáveis de ambiente (ou DB).
3. Um log é inserido na tabela `login_logs`.
4. Em caso de sucesso, um JWT assinado é enviado via Cookie.

## Dependências Necessárias
- `express`
- `sqlite3`
- `jsonwebtoken`
- `cookie-parser`
- `express-rate-limit`
- `dotenv`
- `cors`
- `bcrypt` (para hash de senhas se usar DB para usuários)
