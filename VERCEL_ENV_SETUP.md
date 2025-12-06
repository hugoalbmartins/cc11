# Configurar Variáveis de Ambiente no Vercel

## Problema
O formulário de contacto não funciona em produção porque as variáveis de ambiente não estão configuradas no Vercel.

## Erro Atual
```
URL: VITE_SUPABASE_URL=https://vhttobbnwhuqrjqvoaab.supabase.co/functions/v1/send-contact-email
```

Isto mostra que `import.meta.env.VITE_SUPABASE_URL` está a retornar `undefined`, fazendo com que o URL fique incorreto.

## Solução: Configurar no Vercel Dashboard

### Passo 1: Aceder ao Vercel Dashboard
1. Ir a [vercel.com](https://vercel.com)
2. Fazer login
3. Selecionar o projeto: **cc11**

### Passo 2: Adicionar Variáveis de Ambiente
1. Clicar em **Settings**
2. No menu lateral, clicar em **Environment Variables**
3. Adicionar as seguintes variáveis:

#### Variável 1: VITE_SUPABASE_URL
- **Key:** `VITE_SUPABASE_URL`
- **Value:** `https://vhttobbnwhuqrjqvoaab.supabase.co`
- **Environments:** Selecionar todas (Production, Preview, Development)
- Clicar em **Save**

#### Variável 2: VITE_SUPABASE_ANON_KEY
- **Key:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodHRvYmJud2h1cXJqcXZvYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NTIxMzEsImV4cCI6MjA3OTEyODEzMX0.aWQLKhYFTrrbSG3CcVp0WpTGtSzjOR4AYMF-gw4dLpY`
- **Environments:** Selecionar todas (Production, Preview, Development)
- Clicar em **Save**

### Passo 3: Re-deploy do Projeto
Depois de adicionar as variáveis, é necessário fazer re-deploy:

**Opção A: Re-deploy Automático**
1. No Vercel Dashboard, ir a **Deployments**
2. Clicar nos três pontos (...) no deployment mais recente
3. Clicar em **Redeploy**
4. Confirmar clicando em **Redeploy** novamente

**Opção B: Novo Commit**
1. Fazer qualquer alteração pequena no projeto
2. Fazer commit e push para o GitHub
3. O Vercel vai fazer deploy automaticamente

### Passo 4: Verificar
1. Aguardar o deployment terminar (1-2 minutos)
2. Aceder ao site: https://cc11.pt
3. Abrir o console do browser (F12 → Console)
4. Preencher e submeter o formulário
5. Verificar que o URL agora está correto:
   ```
   URL: https://vhttobbnwhuqrjqvoaab.supabase.co/functions/v1/send-contact-email
   ```

## Screenshot do Processo

### Como deve ficar no Vercel:
```
Environment Variables

VITE_SUPABASE_URL
Value: https://vhttobbnwhuqrjqvoaab.supabase.co
Environments: Production, Preview, Development
Status: ✓ Active

VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environments: Production, Preview, Development
Status: ✓ Active
```

## Notas Importantes

### Sobre as Variáveis VITE_*
- As variáveis **DEVEM** começar com `VITE_` para serem acessíveis no frontend
- Sem o prefixo `VITE_`, o Vite não vai incluí-las no build
- Estas variáveis são seguras de expor no frontend (não são secrets)

### Segurança
- O `ANON_KEY` é seguro de expor publicamente
- Este key tem permissões limitadas (configuradas no Supabase RLS)
- Nunca expor `SERVICE_ROLE_KEY` no frontend

### Verificação Rápida
Se as variáveis estiverem configuradas corretamente, este comando deve retornar os valores:

**No console do browser (depois do re-deploy):**
```javascript
console.log({
  url: import.meta.env.VITE_SUPABASE_URL,
  hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
  keyPreview: import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
});

// Deve retornar:
// {
//   url: "https://vhttobbnwhuqrjqvoaab.supabase.co",
//   hasKey: true,
//   keyPreview: "eyJhbGciOiJIUzI1NiIsI..."
// }
```

## Troubleshooting

### As variáveis ainda não funcionam após re-deploy
1. Limpar cache do browser (Ctrl+Shift+Delete)
2. Abrir em modo incógnito/privado
3. Verificar que as variáveis estão em **todos** os ambientes no Vercel
4. Verificar que o deployment foi feito **após** adicionar as variáveis

### Erro: "This value will be available on your next deployment"
Isto é normal. As variáveis só ficam ativas no próximo deployment. Fazer re-deploy.

### Ainda recebo 405 Method Not Allowed
Se as variáveis estiverem corretas mas ainda houver erro 405:
1. Verificar que o URL no console não tem "VITE_SUPABASE_URL=" no início
2. Se o URL estiver correto, o problema pode ser no Supabase Edge Function
3. Ver logs no Supabase Dashboard → Edge Functions → send-contact-email → Logs

## Link Direto

Acesso rápido às configurações:
1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **Projeto Settings:** https://vercel.com/[seu-username]/cc11/settings/environment-variables

## Suporte

Se tiver dúvidas:
1. Consultar [Vercel Docs - Environment Variables](https://vercel.com/docs/environment-variables)
2. Consultar [Vite Docs - Env Variables](https://vitejs.dev/guide/env-and-mode.html)
