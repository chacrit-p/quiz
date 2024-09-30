import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../lib/mongoDb";
import Transaction from "../../../../models/Transaction";

export async function GET(req, { params }) {
  await connectToMongoDB();
  const transactions = await Transaction.findOne({ _id: params.id });
  return NextResponse.json(transactions, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const { amount, date, type, note } = await req.json();

    await connectToMongoDB();
    await Transaction.findByIdAndUpdate(id, {
      amount,
      date,
      type,
      note,
    });

    return NextResponse.json(
      {
        message: "Transaction updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updated transaction:", error);
    return NextResponse.json(
      { message: "Failed to updated transaction", error: error.message },
      { status: 500 }
    );
  }
}
