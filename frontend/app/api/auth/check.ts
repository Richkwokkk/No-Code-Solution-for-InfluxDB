import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Always return authenticated for now
  return NextResponse.json({ authenticated: true });
}
