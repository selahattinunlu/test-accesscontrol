import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();

  return NextResponse.json({
    role: body.username,
  });
};
