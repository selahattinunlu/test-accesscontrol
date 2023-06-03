import { NextResponse } from "next/server";
import { auth } from "@/support/api";

export const POST = async () => {
  // once user send request to this route, we'll send request to api which is written with laravel
  // to get the user data.

  const user = await auth.login();
  return NextResponse.json(user);
};
