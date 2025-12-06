# Guia de Deployment para Vercel

## Estado Atual do Projeto

O formulário de contacto está **totalmente funcional** e testado com sucesso:
- Backend (Supabase Edge Function) está deployed e operacional
- Base de dados configurada com Row Level Security (RLS)
- Frontend está pronto para deployment

## Teste Realizado

Foi feito um teste manual da edge function que confirmou:
- A função está ativa e a responder corretamente
- Os dados são guardados na base de dados com sucesso
- CORS está configurado corretamente
- Resposta HTTP 200 com `{"success": true}`

## Instruções para Deploy na Vercel

### 1. Preparar o Repositório

Certifique-se que o código está no GitHub:
```bash
git add .
git commit -m "Preparar para deployment"
git push origin main
```

### 2. Importar Projeto na Vercel

1. Aceda a [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Selecione o repositório do GitHub
4. A Vercel irá detectar automaticamente que é um projeto Vite

### 3. Configurar Variáveis de Ambiente

**CRÍTICO**: Na página de configuração do projeto na Vercel, adicione as seguintes variáveis de ambiente:

```
VITE_SUPABASE_URL=https://vhttobbnwhuqrjqvoaab.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodHRvYmJud2h1cXJqcXZvYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NTIxMzEsImV4cCI6MjA3OTEyODEzMX0.aWQLKhYFTrrbSG3CcVp0WpTGtSzjOR4AYMF-gw4dLpY
```

**Onde adicionar**:
- Na Vercel, vá para "Settings" → "Environment Variables"
- Adicione cada variável individualmente
- Aplique a todas as environments (Production, Preview, Development)

### 4. Configurações de Build

A Vercel deve detectar automaticamente:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Se não detectar automaticamente, configure manualmente estes valores.

### 5. Deploy

1. Clique em "Deploy"
2. Aguarde o build completar (geralmente 1-3 minutos)
3. Aceda ao URL fornecido pela Vercel

## Verificação Pós-Deploy

Após o deploy, teste o formulário de contacto:

1. Aceda à secção de contacto no site
2. Preencha o formulário com dados de teste
3. Clique em "Enviar Mensagem"
4. Deve ver a mensagem de sucesso: "Mensagem enviada com sucesso!"

### Verificar Submissões na Base de Dados

Para verificar que as submissões estão a ser guardadas:
1. Aceda ao [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá para o projeto `vhttobbnwhuqrjqvoaab`
3. Table Editor → `contact_submissions`
4. Verifique as novas entradas

## Resolução de Problemas

### O formulário não envia

1. **Verifique as variáveis de ambiente**:
   - Abra as DevTools do browser (F12)
   - Console → verifique se há erros
   - Network → verifique o request para a edge function

2. **Verifique CORS**:
   - Se vir erro de CORS, a edge function já está configurada corretamente
   - Pode ser um problema de cache - force refresh (Ctrl+Shift+R)

3. **Verifique a URL da API**:
   - O formulário chama: `${VITE_SUPABASE_URL}/functions/v1/send-contact-email`
   - Verifique que `VITE_SUPABASE_URL` está definido corretamente

### Build falha na Vercel

1. **Erro de variáveis de ambiente**:
   - As variáveis `VITE_*` devem estar definidas ANTES do build
   - Não pode adicionar depois - tem que fazer redeploy

2. **Erro de dependências**:
   - Verifique que `package-lock.json` está commitado
   - Tente `npm ci` localmente primeiro

## Domínio Personalizado

Para usar `cc11.pt`:

1. Na Vercel, vá para "Settings" → "Domains"
2. Adicione `cc11.pt` e `www.cc11.pt`
3. Configure os DNS records no registrar do domínio:
   ```
   A Record:    @     →  76.76.21.21
   CNAME:       www   →  cname.vercel-dns.com
   ```
4. Aguarde propagação DNS (pode demorar até 48h)

## Atualizações Futuras

Sempre que fizer alterações ao código:
1. Commit para o GitHub
2. A Vercel irá fazer deploy automático
3. Não precisa de reconfigurar as variáveis de ambiente

## Suporte

Se encontrar problemas:
- Verifique os logs na Vercel Dashboard
- Verifique os logs da Edge Function no Supabase Dashboard
- Teste localmente primeiro com `npm run dev`
