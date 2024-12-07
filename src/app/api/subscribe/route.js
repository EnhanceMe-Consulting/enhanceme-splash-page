export async function GET(req) {
    return new Response(JSON.stringify({ message: "API is working!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  export async function POST(req) {
    try {
      const body = await req.json();
      const { name, email } = body;
  
      if (!name || !email) {
        return new Response(
          JSON.stringify({ error: "Name and email are required" }),
          { status: 400 }
        );
      }
  
      const API_KEY = process.env.MAILCHIMP_API_KEY;
      const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
      const DATACENTER = API_KEY.split("-")[1];
  
      const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`any:${API_KEY}`).toString(
            "base64"
          )}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: name,
          },
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        return new Response(JSON.stringify({ error: error.detail || "An error occurred" }), {
          status: response.status,
        });
      }
  
      return new Response(JSON.stringify({ message: "Successfully subscribed!" }), {
        status: 200,
      });
    } catch (error) {
      console.error("Unexpected Error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  }
  