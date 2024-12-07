import { NextResponse } from "next/server";
import startDb from "@/lib/db";
import { User } from "@/models/user";

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    await startDb();
    const userData = await request.json();
    const user = await User.findByIdAndUpdate(params.userId, userData, {
      new: true,
    });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    await startDb();
    const user = await User.findByIdAndDelete(params.userId);
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
