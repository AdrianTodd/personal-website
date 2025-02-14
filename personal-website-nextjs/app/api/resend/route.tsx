import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);
const fromEmail = process.env.FROM_EMAIL as string;

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return new NextResponse("Missing RESEND_API_KEY", { status: 500 });
  }

  if (!process.env.FROM_EMAIL) {
    return new NextResponse("Missing FROM_EMAIL", { status: 500 });
  }

  try {
    const { email, subject, message } = await req.json();
    console.log(email, subject, message);
    const data = await resend.emails.send({
      from: fromEmail,
      to: "todd.r.adrian@gmail.com",
      subject: subject,
      react: (
        <>
          <h1>Subject: {subject}</h1>
          <p>From: {email}</p>
          <p>Message: {message}</p>
        </>
      ),
    });
    if (data.error) {
      return new NextResponse(JSON.stringify({ error: data.error }), {
        status: 500,
      });
    }
    return new NextResponse(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
