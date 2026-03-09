import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

async function sendEmailViaSMTP(formData: ContactFormData): Promise<void> {
  const smtpHost = Deno.env.get("SMTP_HOST");
  const smtpPort = Deno.env.get("SMTP_PORT");
  const smtpUser = Deno.env.get("SMTP_USER");
  const smtpPassword = Deno.env.get("SMTP_PASSWORD");
  const emailFrom = Deno.env.get("EMAIL_FROM") || "contactos@cc11.pt";
  const emailTo = Deno.env.get("EMAIL_TO") || "geral@cc11.pt";

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
    throw new Error("SMTP configuration not complete. Required: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD");
  }

  const emailHtml = `
    <h2>Nova mensagem de contacto recebida</h2>
    <p><strong>Nome:</strong> ${formData.name}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    ${formData.phone ? `<p><strong>Telefone:</strong> ${formData.phone}</p>` : ''}
    <p><strong>Mensagem:</strong></p>
    <p>${formData.message.replace(/\n/g, '<br>')}</p>
    <hr>
    <p><small>Enviado através do formulário de contacto do website CC11</small></p>
  `;

  const emailText = `
Nova mensagem de contacto recebida

Nome: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Telefone: ${formData.phone}\n` : ''}
Mensagem:
${formData.message}

---
Enviado através do formulário de contacto do website CC11
  `;

  const client = new SMTPClient({
    connection: {
      hostname: smtpHost,
      port: parseInt(smtpPort),
      tls: parseInt(smtpPort) === 465,
      auth: {
        username: smtpUser,
        password: smtpPassword,
      },
    },
  });

  await client.send({
    from: emailFrom,
    to: emailTo,
    subject: `Novo contacto de ${formData.name}`,
    content: emailText,
    html: emailHtml,
    replyTo: formData.email,
  });

  await client.close();
}

Deno.serve(async (req: Request) => {
  console.log(`Received ${req.method} request`);

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      console.error(`Method not allowed: ${req.method}`);
      return new Response(
        JSON.stringify({ error: "Method not allowed", method: req.method }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const formData: ContactFormData = await req.json();

    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        created_at: new Date().toISOString()
      }]);

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save submission", details: dbError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Contact form submission saved successfully");

    try {
      await sendEmailViaSMTP(formData);
      console.log("Email sent successfully via SMTP");
    } catch (emailError) {
      console.error("Failed to send email via SMTP:", emailError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Mensagem recebida com sucesso! Entraremos em contacto brevemente.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});