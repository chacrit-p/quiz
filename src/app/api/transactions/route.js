import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../lib/mongoDb";
import Transaction from "../../models/Transaction";

export async function POST(req) {
  try {
    const { amount, date, type, note, userId } = await req.json();

    await connectToMongoDB();

    const newTransaction = await Transaction.create({
      amount,
      date,
      type,
      note,
      userId,
    });

    return NextResponse.json(
      {
        message: "Transaction saved successfully",
        transaction: newTransaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving transaction:", error);
    return NextResponse.json(
      { message: "Failed to save transaction", error: error.message },
      { status: 500 }
    );
  }
}
