import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

async function sendEmail(formData: ContactFormData): Promise<{ toCompany: boolean; toClient: boolean }> {
  try {
    const smtpServer = 'mail.cc11.pt';
    const smtpPort = 587;
    const smtpUser = 'contactos@cc11.pt';
    const smtpPassword = 'CC11contactos2025';
    const companyEmail = 'geral@cc11.pt';

    const emailToCompany = `
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone || 'Não fornecido'}

Mensagem:
${formData.message}
    `;

    const emailToClient = `Prezado(a) ${formData.name},

Agradecemos sinceramente o seu contacto com a CC11 Acabamentos.

Recebemos a sua mensagem e comprometemo-nos em responder brevemente com a informação solicitada.

A sua mensagem foi registada com sucesso e será analisada pela nossa equipa, que entrará em contacto consigo em breve.

Caso tenha alguma questão urgente, não hesite em ligar-nos directamente para +351 911 823 153.

Agradecemos a sua preferência e confiança na CC11 Acabamentos!

Com cordiais saudações,
Equipa CC11 Acabamentos
    `;

    const responseToCompany = await fetch(`http://localhost:1025/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: smtpUser,
        to: companyEmail,
        subject: 'Novo contacto - CC11 Acabamentos',
        text: emailToCompany,
      }),
    });

    const responseToClient = await fetch(`http://localhost:1025/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: smtpUser,
        to: formData.email,
        subject: 'Confirmação de contacto - CC11 Acabamentos',
        text: emailToClient,
      }),
    });

    return {
      toCompany: responseToCompany.ok,
      toClient: responseToClient.ok,
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return { toCompany: false, toClient: false };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const formData: ContactFormData = await req.json();

    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([formData]);

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save submission');
    }

    const emailResults = await sendEmail(formData);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully',
        emails: emailResults,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});