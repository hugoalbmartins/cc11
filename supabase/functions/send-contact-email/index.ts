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

async function sendEmail(formData: ContactFormData): Promise<void> {
  const smtpConfig = {
    hostname: Deno.env.get("SMTP_HOSTNAME") || "mail.cc11.pt",
    port: parseInt(Deno.env.get("SMTP_PORT") || "465"),
    username: Deno.env.get("SMTP_USERNAME") || "contactos@cc11.pt",
    password: Deno.env.get("SMTP_PASSWORD") || "",
  };

  const client = new SMTPClient({
    connection: {
      hostname: smtpConfig.hostname,
      port: smtpConfig.port,
      tls: true,
      auth: {
        username: smtpConfig.username,
        password: smtpConfig.password,
      },
    },
  });

  const emailBody = `
Nova mensagem de contacto recebida:

Nome: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Telefone: ${formData.phone}` : ''}

Mensagem:
${formData.message}

---
Enviado através do formulário de contacto do website CC11
  `.trim();

  await client.send({
    from: smtpConfig.username,
    to: "geral@cc11.pt",
    subject: `Novo contacto de ${formData.name}`,
    content: emailBody,
  });

  await client.close();
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
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
        message: formData.message
      }]);

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save submission" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    try {
      await sendEmail(formData);
    } catch (emailError) {
      console.error("Email error:", emailError);
      return new Response(
        JSON.stringify({
          success: true,
          message: "Contact form submitted but email notification failed",
          warning: "Data saved but email not sent"
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact form submitted and email sent successfully",
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