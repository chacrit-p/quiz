import mongoose, { Schema, Document } from "mongoose";

interface ITransaction extends Document {
  amount: number;
  date: Date;
  type: "income" | "expense";
  note?: string;
  userId: mongoose.Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    note: { type: String },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", transactionSchema);
export default Transaction;