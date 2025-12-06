# Troubleshooting: Erro HTTP 405

## Problema
Ao submeter o formulário de contacto, recebe erro HTTP 405 "Method Not Allowed".

## Diagnóstico

### 1. Verificar Logs no Browser
Abra o console do browser (F12 → Console) e procure por:

```
Submitting form...
URL: https://vhttobbnwhuqrjqvoaab.supabase.co/functions/v1/send-contact-email
Response status: 405
Response data: { error: "Method not allowed", method: "..." }
```

O campo `method` na resposta vai indicar que método HTTP foi recebido pela função.

### 2. Verificar Logs no Supabase

1. Ir ao Supabase Dashboard
2. Edge Functions → send-contact-email → Logs
3. Procurar por:
   ```
   Received [METHOD] request
   ```

Isto vai mostrar que método HTTP a função está a receber.

## Causas Comuns

### Causa 1: Função Desatualizada
A versão deployada pode não ser a mais recente.

**Solução:**
```bash
# Re-deploy da função
supabase functions deploy send-contact-email
```

### Causa 2: CORS Preflight a Falhar
O browser faz um request OPTIONS antes do POST. Se o OPTIONS falhar, o POST pode não ser enviado.

**Verificação:**
No Network tab do browser (F12 → Network):
1. Filtrar por "send-contact-email"
2. Ver se há 2 requests:
   - Um OPTIONS (deve retornar 200)
   - Um POST (deve retornar 200 ou erro)

**Solução:**
Se o OPTIONS falhar, verificar que a função tem:
```typescript
if (req.method === "OPTIONS") {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}
```

### Causa 3: URL Incorreto
O URL pode estar incorreto ou a apontar para um ambiente errado.

**Verificação:**
```javascript
console.log(import.meta.env.VITE_SUPABASE_URL);
// Deve retornar: https://vhttobbnwhuqrjqvoaab.supabase.co
```

**Solução:**
Verificar o ficheiro `.env`:
```
VITE_SUPABASE_URL=https://vhttobbnwhuqrjqvoaab.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Causa 4: Proxy ou CDN a Modificar Request
Algum proxy ou CDN pode estar a modificar o método HTTP.

**Solução:**
Testar diretamente via curl:
```bash
curl -X POST "https://vhttobbnwhuqrjqvoaab.supabase.co/functions/v1/send-contact-email" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodHRvYmJud2h1cXJqcXZvYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NTIxMzEsImV4cCI6MjA3OTEyODEzMX0.aWQLKhYFTrrbSG3CcVp0WpTGtSzjOR4AYMF-gw4dLpY" \
  -d '{
    "name": "Teste",
    "email": "teste@teste.pt",
    "phone": "912345678",
    "message": "Teste"
  }'
```

Se este curl funcionar (retorna 200), o problema está no browser/frontend.

### Causa 5: Função Não Deployada
A função pode não estar realmente deployada ou ativa.

**Verificação:**
```bash
# Listar funções
supabase functions list

# Deve mostrar:
# send-contact-email | ACTIVE
```

**Solução:**
```bash
supabase functions deploy send-contact-email --no-verify-jwt
```

## Passos de Resolução

### Passo 1: Verificar Deployment
```bash
# Ver funções deployadas
supabase functions list
```

### Passo 2: Re-deploy da Função
```bash
# Deploy com flag específica
supabase functions deploy send-contact-email --no-verify-jwt
```

### Passo 3: Verificar Variáveis de Ambiente
```javascript
// No browser console
console.log({
  url: import.meta.env.VITE_SUPABASE_URL,
  hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
});
```

### Passo 4: Testar com curl
```bash
curl -v -X POST "https://vhttobbnwhuqrjqvoaab.supabase.co/functions/v1/send-contact-email" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [ANON_KEY]" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

### Passo 5: Verificar Network Tab
1. F12 → Network
2. Submeter formulário
3. Ver detalhes do request
4. Verificar Method, Status, Response

## Informação de Debug

### Frontend (Contact.tsx)
Agora tem logging detalhado:
- URL sendo chamado
- Dados sendo enviados
- Status da resposta
- Dados da resposta

### Backend (Edge Function)
Agora tem logging detalhado:
- Método HTTP recebido
- Erros específicos de método
- Método retornado na resposta de erro

## Se Nada Funcionar

### Opção 1: Verificar no Supabase Dashboard
1. Ir a Edge Functions
2. Clicar em send-contact-email
3. Ver tab "Details"
4. Verificar se "Status" está ACTIVE
5. Ver tab "Logs" para erros

### Opção 2: Testar Localmente
```bash
# Iniciar função localmente
supabase functions serve send-contact-email

# Testar
curl -X POST "http://localhost:54321/functions/v1/send-contact-email" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

### Opção 3: Verificar Configuração do Projeto
```bash
# Ver config do Supabase
cat supabase/config.toml

# Deve ter:
# [functions.send-contact-email]
# verify_jwt = false
```

## Contacto de Suporte

Se depois de todos estes passos ainda tiver o erro 405:

1. Exportar logs do Supabase
2. Exportar Network tab do browser (HAR file)
3. Copiar resposta exata do erro
4. Verificar status do Supabase: https://status.supabase.com

## Checklist Rápido

- [ ] Função está deployada (ACTIVE)
- [ ] verify_jwt está false
- [ ] CORS headers estão configurados
- [ ] Variáveis de ambiente estão corretas
- [ ] URL está correto
- [ ] Browser permite CORS
- [ ] Sem proxy a interferir
- [ ] Curl direto funciona
