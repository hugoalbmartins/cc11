# Configuração do Ping Periódico da Base de Dados

## O que foi implementado

Foi criada uma Edge Function (`database-keepalive`) que executa uma consulta simples à base de dados para mantê-la ativa e evitar que "adormeça" por falta de utilização.

A função faz uma consulta básica à tabela `contact_submissions` e regista o resultado, mantendo a base de dados ativa.

## Como configurar o ping automático a cada 4 dias

### Opção 1: Usar cron-job.org (Recomendado - Gratuito)

1. **Criar conta**
   - Aceder a https://cron-job.org/en/
   - Criar uma conta gratuita
   - Confirmar o email

2. **Configurar o cron job**
   - Fazer login no painel de controlo
   - Clicar em "Create cronjob"
   - Configurar:
     - **Title**: Database Keepalive CC11
     - **Address**: `https://[SEU-PROJETO].supabase.co/functions/v1/database-keepalive`
     - **Schedule**: Custom
       - Executar a cada **4 dias** (96 horas)
       - Sugestão: Configurar para executar às 3:00 AM
     - **Request method**: GET
     - **Enable job**: Ativado

3. **Obter o URL da sua função**
   - Aceder ao dashboard do Supabase
   - Ir a Edge Functions
   - Copiar o URL completo da função `database-keepalive`
   - Formato: `https://[project-ref].supabase.co/functions/v1/database-keepalive`

### Opção 2: Usar outro serviço de cron gratuito

Alternativas ao cron-job.org:
- **Cronless.com** - Interface simples e intuitiva
- **EasyCron.com** - Plano gratuito disponível
- **Cronnomy** - Serviço de cron jobs gratuito

Todos funcionam de forma similar: agendar uma chamada HTTP GET ao endpoint da função a cada 4 dias.

## Verificar que está a funcionar

1. **No cron-job.org**:
   - Ver histórico de execuções
   - Verificar se o status é "Success" (código 200)

2. **No Supabase**:
   - Ir a Edge Functions > database-keepalive
   - Ver os logs de execução
   - Deve aparecer: "Database keepalive ping successful"

## URL da Função

```
https://[SEU-PROJETO-ID].supabase.co/functions/v1/database-keepalive
```

Substitua `[SEU-PROJETO-ID]` pelo ID real do seu projeto Supabase.

## Frequência Recomendada

- **A cada 4 dias** conforme solicitado
- Isso equivale a aproximadamente 7-8 execuções por mês
- Suficiente para manter a base de dados ativa sem consumo excessivo

## Notas Importantes

- A função é pública (não requer autenticação) para permitir chamadas externas
- A consulta é extremamente leve (apenas seleciona 1 ID)
- Não tem impacto no desempenho da aplicação
- Os logs ficam disponíveis no Supabase para monitorização
