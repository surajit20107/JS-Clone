import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { sendMail } from "@/lib/sendMail";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();
    
    inngest.send({
      name: "app/user.registered",
      data: { email, name },
    });

    await sendMail(email, name)

    return NextResponse.json({ message: "welcome email send" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
