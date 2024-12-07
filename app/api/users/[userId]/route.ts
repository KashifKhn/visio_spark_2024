import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { db } = await connectToDatabase();
    const userData = await request.json();
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(params.userId) }, { $set: userData });
    if (result.matchedCount === 0) {
      return new NextResponse("User not found", { status: 404 });
    }
    return NextResponse.json({ _id: params.userId, ...userData });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(params.userId) });
    if (result.deletedCount === 0) {
      return new NextResponse("User not found", { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
