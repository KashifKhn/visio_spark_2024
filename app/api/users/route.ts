import { NextResponse } from "next/server";
import startDb from "@/lib/db";
import { User } from "@/models/user";

export async function GET() {
  try {
    await startDb();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await startDb();
    const userData = await request.json();
    const user = new User(userData);
    await user.save();
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
