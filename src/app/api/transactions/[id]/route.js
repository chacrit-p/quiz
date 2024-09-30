import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../lib/mongoDb";
import Transaction from "../../../models/Transaction";

export async function GET(req, { params }) {
  const { id } = params;
  await connectToMongoDB();
  const transactions = await Transaction.find({ userId: id });
  return NextResponse.json(transactions, { status: 200 });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await connectToMongoDB();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Transaction Delete" }, { status: 200 });
}
