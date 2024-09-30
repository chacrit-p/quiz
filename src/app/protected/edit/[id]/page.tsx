"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

function formatDate(input: string): string {
  const date = new Date(input);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function Page({ params }: { params: { id: string } }) {
  const [amount, setAmount] = useState<number | string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [note, setNote] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transactionData = {
      amount: Number(amount),
      date,
      type,
      note,
    };

    try {
      const response = await axios.put(
        `/api/transactions/${params.id}/update`,
        transactionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Transaction updated successfully!");
        setErrorMessage(null);
      } else {
        setErrorMessage("Error updated transaction");
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage("An error occurred while update the transaction.");
      setSuccessMessage(null);
      console.error("An error occurred:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions/${params.id}/update`);
      if (response.status == 200) {
        const transaction = response.data;
        setAmount(transaction.amount);
        setType(transaction.type);
        setNote(transaction.note);
        setDate(formatDate(transaction.date));
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [params.id]);

  return (
    <div>
      <h1>Record income and expenses</h1>
      {successMessage && (
        <div className="text-green-600 my-3">{successMessage}</div>
      )}
      {errorMessage && <div className="text-red-600 my-3">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="amount">Amount:</label>
          <input
            className="p-3 border"
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="date">Date:</label>
          <input
            className="p-3 border"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="type">Type:</label>
          <select
            className="p-3 border"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="note">Note:</label>
          <textarea
            rows={5}
            className="p-3 border"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <Link
          href="/protected"
          className="bg-gray-500 px-5 py-2.5 rounded text-white mt-3 mr-2"
        >
          Back
        </Link>
        <button
          className="bg-blue-500 px-5 py-2.5 rounded text-white mt-3"
          type="submit"
        >
          Edit
        </button>
      </form>
    </div>
  );
}
