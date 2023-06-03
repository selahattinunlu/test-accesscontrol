import { NextRequest, NextResponse } from "next/server";
import prisma from "@/support/prisma";
import ac from "@/support/accesscontrol";

interface GetParams {
  params: {
    id: string;
  };
}

export const GET = async (req: NextRequest, { params }: GetParams) => {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") as string;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 404 }
    );
  }

  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
  });

  if (post?.authorId !== user.id && !ac.can(username).readAny("post").granted) {
    return NextResponse.json(
      {
        message: "You are not allowed to read this post",
      },
      { status: 403 }
    );
  }

  return NextResponse.json(post);
};
