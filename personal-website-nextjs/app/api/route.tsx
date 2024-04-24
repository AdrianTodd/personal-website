import { NextResponse } from "next/server";
import { Resend } from "resend";
import { NextApiRequest, NextApiResponse } from "next";

const resend = new Resend(process.env.RESEND_API_KEY as string);
const fromEmail = process.env.FROM_EMAIL as string;

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, subject, message } = await req.body;
  console.log(email, subject, message);

  try {
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
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error });
  }
}
