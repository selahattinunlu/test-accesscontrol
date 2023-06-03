import { NextRequest, NextResponse } from "next/server";
import prisma from "@/support/prisma";
import ac from "@/support/accesscontrol";
import { Prisma } from "@prisma/client";

// since we did not implement any authentication yet,
// we'll just use a dummy user which is coming from the request body
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  // we should validate the request body here
  // but we'll skip that part for now since it's a test project

  // normally, we will check if user logged in or not in middlewares
  // not here. but this is just a test project, so we'll skip that part
  const user = await prisma.user.findFirst({
    where: {
      username: body.username,
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

  // check if the user is allowed to create a post
  if (!ac.can(user.username).createOwn("post").granted) {
    return NextResponse.json(
      {
        message: "You are not allowed to create a post",
      },
      { status: 403 }
    );
  }

  const post = await prisma.post.create({
    data: {
      title: body.title,
      body: body.body,
      authorId: user.id,
    },
  });

  return NextResponse.json(post);
};

export const GET = async (req: NextRequest) => {
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

  const findManyArgs: Prisma.PostFindManyArgs = {};

  // if user can access only own posts, we'll filter the posts
  if (!ac.can(username).readAny("posts").granted) {
    findManyArgs.where = {
      authorId: user.id,
    };
  }

  const posts = await prisma.post.findMany(findManyArgs);
  return NextResponse.json(posts);
};

export const PUT = async (req: NextRequest) => {
  //
};
