import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const apiKey  = process.env.MAILCHIMP_API_KEY;
    const listId  = process.env.MAILCHIMP_LIST_ID;
    const dc      = process.env.MAILCHIMP_DC ?? "us1";

    // If Mailchimp isn't configured, simulate success in development
    if (!apiKey || !listId) {
      console.log(`[Newsletter] Would subscribe: ${email} (Mailchimp not configured)`);
      return NextResponse.json({ success: true });
    }

    const res = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          tags: ["cfn-website"],
        }),
      }
    );

    if (!res.ok) {
      const data = await res.json();
      // If already subscribed, treat as success
      if (data.title === "Member Exists") {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json(
        { error: data.detail ?? "Subscription failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "An error occurred. Please try again." }, { status: 500 });
  }
}
