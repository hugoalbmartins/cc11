# CC11 - Carpintaria & Construção

Website profissional para CC11, empresa especializada em carpintaria, marcenaria, lacagem, restauro e pinturas de interiores.

## Tecnologias Utilizadas

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Edge Functions + PostgreSQL)
- **Icons**: Lucide React
- **Deploy**: Vercel

## Funcionalidades

- Design moderno e responsivo
- Galeria de projetos organizada por categorias
- Formulário de contacto funcional com backend
- Política de privacidade e cookies
- Botões flutuantes para WhatsApp e telefone
- Animações suaves e transições
- Otimizado para SEO e performance

## Desenvolvimento Local

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

O site estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Preview do Build

```bash
npm run preview
```

## Deployment

Para instruções detalhadas sobre deployment na Vercel, consulte [DEPLOYMENT.md](./DEPLOYMENT.md)

### Resumo Rápido

1. Push para GitHub
2. Importar projeto na Vercel
3. Configurar variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automático

## Estrutura do Projeto

```
├── public/               # Assets estáticos
│   └── images/          # Imagens da galeria
├── src/
│   ├── components/      # Componentes React
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   ├── lib/
│   │   └── galleryData.ts  # Dados da galeria
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── functions/       # Edge Functions
│   └── migrations/      # Migrações da BD
└── DEPLOYMENT.md        # Guia de deployment

```

## Backend (Supabase)

### Edge Function

A edge function `send-contact-email` processa os envios do formulário de contacto:
- Valida os dados recebidos
- Guarda na base de dados PostgreSQL
- Responde com confirmação de sucesso

### Base de Dados

Tabela `contact_submissions`:
- `id` (uuid, primary key)
- `name` (text)
- `email` (text)
- `phone` (text, opcional)
- `message` (text)
- `created_at` (timestamp)

RLS (Row Level Security) ativo com políticas apropriadas.

## Contacto

- **Email**: geral@cc11.pt
- **Telefone**: +351 911 823 153
- **WhatsApp**: +351 911 823 153

## Licença

Propriedade de CC11. Todos os direitos reservados.
