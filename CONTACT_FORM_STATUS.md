# Estado do Formulário de Contacto

## Resumo

O formulário de contacto está **TOTALMENTE FUNCIONAL** e pronto para produção.

## Testes Realizados

### 1. Teste da Edge Function
- **Data**: 06/12/2025 15:04:33 UTC
- **Método**: curl direto ao endpoint
- **Resultado**: ✅ Sucesso
- **Resposta**: `{"success": true, "message": "Contact form submitted successfully"}`
- **HTTP Status**: 200

### 2. Verificação da Base de Dados
- **Tabela**: `contact_submissions`
- **RLS**: ✅ Ativo
- **Políticas**: ✅ Configuradas corretamente
- **Dados de Teste**: ✅ Guardados com sucesso

### 3. Build do Projeto
- **Comando**: `npm run build`
- **Resultado**: ✅ Sucesso
- **Output**: `dist/` com todos os assets

## Arquitetura

### Frontend (React)
```
src/components/Contact.tsx
├── Formulário HTML5 com validação
├── Estado React (formData, isSubmitting, submitStatus)
├── Handler de submit com fetch API
└── Feedback visual (sucesso/erro)
```

### Backend (Supabase)
```
supabase/functions/send-contact-email/
├── Validação de dados
├── CORS headers configurados
├── Conexão à BD com SERVICE_ROLE_KEY
└── Insert na tabela contact_submissions
```

### Base de Dados
```sql
Table: contact_submissions
├── id (uuid, PK)
├── name (text, NOT NULL)
├── email (text, NOT NULL)
├── phone (text, nullable)
├── message (text, NOT NULL)
└── created_at (timestamptz, DEFAULT now())

RLS Policies:
├── "Allow public form submissions" (INSERT, anon)
└── "Allow authenticated users to view submissions" (SELECT, authenticated)
```

## Fluxo de Funcionamento

1. **Utilizador preenche o formulário** no frontend
2. **Submit do formulário** dispara `handleSubmit()`
3. **Fetch API** envia POST para `{SUPABASE_URL}/functions/v1/send-contact-email`
4. **Edge Function** recebe e valida os dados
5. **Supabase Client** insere os dados na tabela
6. **Resposta** é enviada de volta ao frontend
7. **Frontend** mostra mensagem de sucesso/erro
8. **Dados** ficam guardados permanentemente na BD

## Variáveis de Ambiente Necessárias

### No Frontend (.env)
```
VITE_SUPABASE_URL=https://vhttobbnwhuqrjqvoaab.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Na Edge Function (auto-configuradas pelo Supabase)
```
SUPABASE_URL (auto)
SUPABASE_SERVICE_ROLE_KEY (auto)
```

## Deployment na Vercel

### Checklist

- [x] Código commitado no GitHub
- [x] Edge function deployed no Supabase
- [x] Base de dados configurada com RLS
- [x] Variáveis de ambiente documentadas
- [x] Build testado localmente
- [x] Guia de deployment criado (DEPLOYMENT.md)
- [x] Configuração Vercel criada (vercel.json)

### Passos para Deploy

1. **Importar projeto na Vercel**
   - Conectar repositório GitHub
   - Framework: Vite (auto-detectado)

2. **Configurar variáveis de ambiente**
   - Settings → Environment Variables
   - Adicionar `VITE_SUPABASE_URL`
   - Adicionar `VITE_SUPABASE_ANON_KEY`

3. **Deploy**
   - Vercel faz build automático
   - Site fica disponível no URL fornecido

4. **Verificar**
   - Testar formulário de contacto
   - Verificar submissões na BD Supabase

## Possíveis Problemas e Soluções

### Problema: Formulário não envia
**Causa**: Variáveis de ambiente não configuradas na Vercel
**Solução**: Adicionar `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nas configurações da Vercel

### Problema: Erro 500 ao enviar
**Causa**: Edge function não consegue aceder à BD
**Solução**: Verificar se a edge function está deployed (usar Supabase Dashboard)

### Problema: Erro de CORS
**Causa**: Headers CORS não configurados
**Solução**: Já está configurado corretamente na edge function (linhas 4-8)

### Problema: Build falha
**Causa**: Variáveis de ambiente em falta durante build
**Solução**: Adicionar variáveis antes de fazer deploy

## Monitorização

### Ver Submissões
```sql
SELECT * FROM contact_submissions
ORDER BY created_at DESC;
```

### Estatísticas
```sql
SELECT
  COUNT(*) as total_submissions,
  COUNT(DISTINCT email) as unique_contacts,
  COUNT(CASE WHEN phone IS NOT NULL THEN 1 END) as with_phone
FROM contact_submissions;
```

### Logs da Edge Function
- Supabase Dashboard → Edge Functions → send-contact-email → Logs

## Conclusão

O formulário de contacto está completamente operacional e testado. Todos os componentes (frontend, backend, base de dados) estão a funcionar corretamente. O projeto está pronto para deployment na Vercel.
