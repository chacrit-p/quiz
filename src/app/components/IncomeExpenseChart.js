import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getMonthlyData = (transactions) => {
  const currentDate = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(currentDate.getMonth() - 2);

  const monthlyData = {
    income: Array(2).fill(0),
    expense: Array(2).fill(0),
  };

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    if (transactionDate >= twoMonthsAgo && transactionDate <= currentDate) {
      const monthIndex = currentDate.getMonth() - transactionDate.getMonth();
      if (transaction.type === "income") {
        monthlyData.income[monthIndex] += transaction.amount;
      } else if (transaction.type === "expense") {
        monthlyData.expense[monthIndex] += transaction.amount;
      }
    }
  });

  return monthlyData;
};

const IncomeExpenseChart = ({ transactions }) => {
  const monthlyData = getMonthlyData(transactions);

  const data = {
    labels: ["Last Month", "Current Month"],
    datasets: [
      {
        label: "Income",
        data: monthlyData.income,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expenses",
        data: monthlyData.expense,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income and Expenses Over the Last 2 Months",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default IncomeExpenseChart;
