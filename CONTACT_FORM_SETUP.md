# Configuração do Formulário de Contacto com Envio de Email

## Visão Geral

O formulário de contacto está configurado para:
1. Guardar os dados na base de dados Supabase
2. Enviar email para `geral@cc11.pt` com os detalhes do contacto
3. Enviar do email `contactos@cc11.pt` via servidor SMTP `mail.cc11.pt`

## Configuração SMTP

### Dados do Servidor SMTP
- **Hostname**: `mail.cc11.pt`
- **Port**: `465` (SSL/TLS)
- **Username**: `contactos@cc11.pt`
- **Password**: `jQ,t^aW6s~N9rdh3`
- **Email Destino**: `geral@cc11.pt`

## Passo a Passo: Configurar Variáveis de Ambiente no Supabase

### CRÍTICO: Configurar Secrets na Edge Function

As credenciais SMTP devem ser configuradas como secrets no Supabase. Siga estes passos:

1. **Aceder ao Supabase Dashboard**
   - Ir para: https://supabase.com/dashboard
   - Selecionar o projeto

2. **Ir para Edge Functions**
   - No menu lateral, clicar em "Edge Functions"
   - Selecionar a função `send-contact-email`

3. **Adicionar Secrets**
   - Clicar no separador "Settings" ou "Secrets"
   - Adicionar os seguintes secrets:

   | Nome da Variável | Valor |
   |-----------------|-------|
   | `SMTP_HOSTNAME` | `mail.cc11.pt` |
   | `SMTP_PORT` | `465` |
   | `SMTP_USERNAME` | `contactos@cc11.pt` |
   | `SMTP_PASSWORD` | `jQ,t^aW6s~N9rdh3` |

4. **Guardar e Redeploy**
   - Após adicionar os secrets, a função pode precisar de ser redeployed
   - Alguns secrets são aplicados automaticamente

### Alternativa: Via Supabase CLI

Se preferir usar a CLI:

```bash
supabase secrets set SMTP_HOSTNAME=mail.cc11.pt
supabase secrets set SMTP_PORT=465
supabase secrets set SMTP_USERNAME=contactos@cc11.pt
supabase secrets set SMTP_PASSWORD="jQ,t^aW6s~N9rdh3"
```

## Como Funciona

### 1. Submissão do Formulário
Quando um utilizador preenche o formulário no website:
- Nome
- Email
- Telefone (opcional)
- Mensagem

### 2. Processamento
A edge function `send-contact-email`:
1. Valida os dados recebidos
2. Guarda na tabela `contact_submissions` do Supabase
3. Envia email via SMTP para `geral@cc11.pt`

### 3. Email Enviado
O email terá este formato:

**Assunto**: Novo contacto de [Nome do Cliente]

**Corpo**:
```
Nova mensagem de contacto recebida:

Nome: [Nome]
Email: [Email]
Telefone: [Telefone]

Mensagem:
[Mensagem do cliente]

---
Enviado através do formulário de contacto do website CC11
```

### 4. Email Remetente
- **De**: contactos@cc11.pt
- **Para**: geral@cc11.pt

## Tratamento de Erros

A edge function está configurada para:

1. **Se o email falhar mas a BD guardar**: Retorna sucesso com aviso
   - Os dados ficam guardados na BD
   - Pode ver os contactos no Supabase mesmo que o email não tenha sido enviado

2. **Se a BD falhar**: Retorna erro 500
   - Nada é guardado
   - Email não é enviado

3. **Logs detalhados**: Todos os erros são registados nos logs da edge function

## Verificar Logs

Para verificar se os emails estão a ser enviados:

1. **Supabase Dashboard**
   - Edge Functions → send-contact-email → Logs
   - Ver erros SMTP aqui

2. **Browser Console**
   - F12 → Console
   - Ver resposta da API

## Testar o Envio

### Teste 1: Via Browser
1. Ir ao website
2. Preencher formulário
3. Submeter
4. Verificar inbox de `geral@cc11.pt`

### Teste 2: Via curl
```bash
curl -X POST "https://vhttobbnwhuqrjqvoaab.supabase.co/functions/v1/send-contact-email" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodHRvYmJud2h1cXJqcXZvYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NTIxMzEsImV4cCI6MjA3OTEyODEzMX0.aWQLKhYFTrrbSG3CcVp0WpTGtSzjOR4AYMF-gw4dLpY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@teste.pt",
    "phone": "912345678",
    "message": "Esta é uma mensagem de teste"
  }'
```

**Resposta esperada**:
```json
{
  "success": true,
  "message": "Contact form submitted and email sent successfully"
}
```

## Troubleshooting

### Email não é enviado

1. **Verificar secrets no Supabase**
   - Confirmar que todas as 4 variáveis estão configuradas
   - Verificar que não há espaços extras

2. **Verificar credenciais SMTP**
   - Testar login no email `contactos@cc11.pt` manualmente
   - Confirmar que a password está correta

3. **Verificar logs da edge function**
   - Ver erros específicos SMTP
   - Procurar por "Email error" nos logs

4. **Testar conectividade SMTP**
   - Port 465 deve estar acessível
   - SSL/TLS deve estar ativo

### Dados não são guardados

1. **Verificar tabela `contact_submissions`**
   - Confirmar que existe no Supabase
   - Verificar políticas RLS

2. **Ver logs de "Database error"**
   - Erros de schema ou validação

## Segurança

- **Credenciais**: Nunca expostas no frontend, apenas na edge function
- **CORS**: Configurado para permitir submissões do website
- **Validação**: Campos obrigatórios validados antes de processar
- **RLS**: Tabela protegida com Row Level Security

## Backup dos Dados

Todos os contactos ficam guardados permanentemente na tabela `contact_submissions`:

```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
```

Mesmo que o email falhe, os dados estão sempre seguros na base de dados.

## Próximos Passos

Após deployment:
1. Configurar os secrets no Supabase Dashboard
2. Testar submissão de um formulário
3. Verificar recepção do email em geral@cc11.pt
4. Confirmar dados na tabela contact_submissions
