# Configuração SMTP para Formulário de Contacto

A edge function `send-contact-email` foi atualizada para usar SMTP diretamente em vez de serviços externos.

## Variáveis de Ambiente Necessárias

Para configurar o envio de emails via SMTP, é necessário definir as seguintes variáveis de ambiente no Supabase:

### Variáveis Obrigatórias

```bash
SMTP_HOST=smtp.seuservidor.com
SMTP_PORT=465
SMTP_USER=seu-email@dominio.com
SMTP_PASSWORD=sua-senha-smtp
```

### Variáveis Opcionais

```bash
EMAIL_FROM=contactos@cc11.pt
EMAIL_TO=geral@cc11.pt
```

Se não forem definidas, os valores padrão são:
- **EMAIL_FROM**: `contactos@cc11.pt`
- **EMAIL_TO**: `geral@cc11.pt`

## Como Configurar no Supabase

1. Aceder ao dashboard do Supabase
2. Ir a **Edge Functions** > **send-contact-email**
3. Clicar em **Secrets**
4. Adicionar cada variável:
   - Nome: `SMTP_HOST`
   - Valor: O hostname do servidor SMTP
   - Repetir para todas as variáveis

## Portas SMTP Comuns

- **465**: SMTP com SSL/TLS (recomendado)
- **587**: SMTP com STARTTLS
- **25**: SMTP sem encriptação (não recomendado)

## Exemplo de Configuração

### Gmail (não recomendado para produção)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=seuemail@gmail.com
SMTP_PASSWORD=senha-de-aplicacao
```

### Outlook/Hotmail
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=seuemail@outlook.com
SMTP_PASSWORD=sua-senha
```

### Servidor SMTP Próprio
```
SMTP_HOST=mail.cc11.pt
SMTP_PORT=465
SMTP_USER=contactos@cc11.pt
SMTP_PASSWORD=sua-senha-segura
```

## Formato do Email

O email enviado inclui:
- **Assunto**: "Novo contacto de [Nome do remetente]"
- **De**: Configurado em `EMAIL_FROM`
- **Para**: Configurado em `EMAIL_TO`
- **Responder para**: Email do utilizador que preencheu o formulário
- **Conteúdo**:
  - Nome do remetente
  - Email do remetente
  - Telefone (se fornecido)
  - Mensagem completa

## Funcionalidades Mantidas

- Gravação na base de dados (`contact_submissions`)
- Validação de campos obrigatórios
- CORS configurado corretamente
- Logs detalhados para debug
- Tratamento de erros robusto

## Notas Importantes

1. A função continua a gravar os dados na base de dados mesmo se o envio do email falhar
2. O utilizador sempre recebe uma resposta de sucesso se os dados forem gravados
3. Erros no envio de email são registados nos logs mas não bloqueiam o processo
4. Recomenda-se usar um servidor SMTP dedicado em vez de provedores pessoais (Gmail, Outlook)
