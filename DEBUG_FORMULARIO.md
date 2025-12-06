# Guia de Debugging do Formulário de Contacto

## Problema Reportado
"Erro ao enviar mensagem. Por favor, tente novamente." ao submeter o formulário.

## Alterações Realizadas

### 1. Logging Detalhado Adicionado
O componente `Contact.tsx` agora inclui logging completo no console:
- URL da API sendo chamada
- Existência das variáveis de ambiente
- Dados do formulário
- Status da resposta HTTP
- Corpo da resposta
- Detalhes de erros

### 2. Correção do .env
Removida linha vazia no início do ficheiro `.env` que poderia causar problemas de parsing.

## Como Debuggar

### Passo 1: Verificar Variáveis de Ambiente

**IMPORTANTE**: Após qualquer alteração ao ficheiro `.env`, é obrigatório reiniciar o servidor de desenvolvimento.

1. **Pare o servidor** (Ctrl+C no terminal)
2. **Reinicie**: `npm run dev`
3. **Abra o browser** e aceda ao site
4. **Abra as DevTools** (F12)
5. **Vá ao Console**

### Passo 2: Analisar os Logs

Quando submeter o formulário, deve ver no console:

```
=== Form Submission Debug ===
Supabase URL: https://vhttobbnwhuqrjqvoaab.supabase.co
Anon Key exists: true
Form data: {name: "...", email: "...", phone: "...", message: "..."}
Calling URL: https://vhttobbnwhuqrjqvoaab.supabase.co/functions/v1/send-contact-email
Response status: 200
Response ok: true
Response data: {success: true, message: "Contact form submitted successfully"}
```

### Passo 3: Diagnosticar Problemas

#### Problema: "Supabase URL: undefined"
**Causa**: Variáveis de ambiente não carregadas
**Solução**:
1. Verificar que o ficheiro `.env` existe na raiz do projeto
2. Verificar que as variáveis começam com `VITE_`
3. **Reiniciar o servidor de desenvolvimento**
4. Fazer hard refresh no browser (Ctrl+Shift+R)

#### Problema: "Anon Key exists: false"
**Causa**: Variável `VITE_SUPABASE_ANON_KEY` não definida
**Solução**:
1. Verificar que a variável está no `.env`
2. Verificar que não há espaços extras
3. **Reiniciar o servidor**

#### Problema: "Response status: 404"
**Causa**: Edge function não existe ou URL incorreto
**Solução**:
1. Verificar que a edge function está deployed no Supabase
2. URL deve ser: `{SUPABASE_URL}/functions/v1/send-contact-email`

#### Problema: "Response status: 401"
**Causa**: Autenticação falhou
**Solução**:
1. Verificar que `VITE_SUPABASE_ANON_KEY` está correto
2. Verificar que a edge function tem `verifyJWT: false`

#### Problema: "Response status: 500"
**Causa**: Erro interno na edge function
**Solução**:
1. Ver logs da edge function no Supabase Dashboard
2. Verificar que a tabela `contact_submissions` existe
3. Verificar políticas RLS

#### Problema: "Network error" ou CORS
**Causa**: Problema de conectividade ou CORS
**Solução**:
1. Verificar conexão à internet
2. Verificar que a edge function tem CORS configurado
3. Ver tab Network nas DevTools para detalhes

## Checklist de Verificação

Antes de submeter o formulário, confirme:

- [ ] Servidor de desenvolvimento está a correr
- [ ] Ficheiro `.env` existe na raiz
- [ ] `.env` contém `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- [ ] Servidor foi reiniciado após alterações ao `.env`
- [ ] Browser DevTools estão abertos na tab Console
- [ ] Página foi recarregada (hard refresh)

## Testar Edge Function Diretamente

Para confirmar que a edge function funciona, teste no terminal:

```bash
curl -X POST "https://vhttobbnwhuqrjqvoaab.supabase.co/functions/v1/send-contact-email" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodHRvYmJud2h1cXJqcXZvYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NTIxMzEsImV4cCI6MjA3OTEyODEzMX0.aWQLKhYFTrrbSG3CcVp0WpTGtSzjOR4AYMF-gw4dLpY" \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@teste.pt","message":"Teste"}'
```

**Resposta esperada**:
```json
{"success":true,"message":"Contact form submitted successfully"}
```

## Verificar Dados na Base de Dados

Após submissão bem-sucedida, verificar que os dados foram guardados:

```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 1;
```

No Supabase Dashboard:
1. Ir para Table Editor
2. Selecionar tabela `contact_submissions`
3. Ver últimas entradas

## Problemas Comuns em Produção (Vercel)

### Problema: Funciona localmente mas não na Vercel
**Causa**: Variáveis de ambiente não configuradas na Vercel
**Solução**:
1. Vercel Dashboard → Settings → Environment Variables
2. Adicionar `VITE_SUPABASE_URL`
3. Adicionar `VITE_SUPABASE_ANON_KEY`
4. Fazer redeploy

### Problema: Build falha
**Causa**: Variáveis não disponíveis durante build
**Solução**:
1. Variáveis devem estar em todas as environments
2. Fazer novo deployment após adicionar variáveis

## Logs da Edge Function

Para ver erros no servidor:
1. Supabase Dashboard
2. Edge Functions → send-contact-email
3. Logs tab
4. Filtrar por erros

## Contacto para Suporte

Se o problema persistir após seguir este guia:
1. Capture screenshot dos logs do console
2. Capture screenshot da tab Network (request/response)
3. Verifique os logs da edge function no Supabase
4. Documente os passos exatos que causam o erro
