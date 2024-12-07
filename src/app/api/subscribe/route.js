import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // Example: 'us8'
});

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { name, email } = body;

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    try {
      // Attempt to add the user to the list
      const response = await mailchimp.lists.addListMember(
        process.env.MAILCHIMP_AUDIENCE_ID,
        {
          email_address: email,
          status: "subscribed",
          merge_fields: { FNAME: name },
        }
      );

      return new Response(
        JSON.stringify({
          message: "You were successfully subscribed!",
          data: response,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      // Handle duplicate email error
      if (error.response?.body?.title === "Member Exists") {
        return new Response(
          JSON.stringify({
            error: "This email is already subscribed.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Handle other errors
      throw error;
    }
  } catch (error) {
    console.error("Mailchimp Error:", error);
    return new Response(
      JSON.stringify({
        error: error.response?.body?.detail || "An error occurred. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
