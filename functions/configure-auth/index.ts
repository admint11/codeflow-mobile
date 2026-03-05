import { createClient } from "npm:@blinkdotnew/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const blink = createClient({
      projectId: Deno.env.get("BLINK_PROJECT_ID") || "codeflow-mobile-ide-roue6qoq",
      secretKey: Deno.env.get("BLINK_SECRET_KEY"),
    });

    // Get current auth config
    const config = await blink.auth.getAuthConfig();
    
    return new Response(JSON.stringify({ config }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
