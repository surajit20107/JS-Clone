import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
//import type { NextRequest } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const userId = session?.user?.id;
  const userEmail = session?.user?.email;

  return NextResponse.json({
    message: "success",
    data: {
      userId,
      userEmail,
    }
  })
}
