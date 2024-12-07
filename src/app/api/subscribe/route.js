export async function POST(req) {
  try {
    // Check for valid Content-Type
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Invalid Content-Type" }), {
        status: 400,
      });
    }

    const { name, email } = await req.json();

    // Validate input
    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and email are required" }), {
        status: 400,
      });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DATACENTER = API_KEY.split("-")[1];

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    // Make the request to Mailchimp API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`any:${API_KEY}`).toString("base64")}`,
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

    // Handle non-success responses from Mailchimp
    if (!response.ok) {
      const error = await response.json();
      console.error("Mailchimp API Error:", error);
      return new Response(JSON.stringify({ error: error.detail || "An error occurred while subscribing" }), {
        status: response.status,
      });
    }

    // Success response
    return new Response(JSON.stringify({ message: "Successfully subscribed!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing subscription:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
