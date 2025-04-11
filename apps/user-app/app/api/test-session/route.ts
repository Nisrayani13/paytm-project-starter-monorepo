// app/api/test-session/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("Session from /api/test-session:", session);
  return NextResponse.json({ session });
}
