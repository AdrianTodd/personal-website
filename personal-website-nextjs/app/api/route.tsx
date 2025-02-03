import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);
const fromEmail = process.env.FROM_EMAIL as string;

export async function POST(req: Request, res: Response) {
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
      to: [fromEmail, email],
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </>
      ),
    });
    return new NextResponse(JSON.stringify(data), { status: 201 }); // 201 Created
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    }); // More specific error
  }
}
