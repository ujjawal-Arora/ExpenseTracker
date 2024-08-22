"use client"
import React,{useState,useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

// // Register components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const, // Use 'as const' to ensure the type matches
    },
    title: {
      display: true,
      text: 'Income Chart',
    },
  },
};

interface IncomeItem {
  title: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  _id: string;
  clicked: boolean;
  type: string;
}


interface ExpenseItem {
  title: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  _id: string;
  clicked: boolean;
  type: string;
}

function ChartCard() {
  const [income,setIncome]=useState<IncomeItem[]>([]);

  const [expense,setExpense]=useState<ExpenseItem[]>([]);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeres = await axios.get('http://localhost:3000/api/v1/income/get-income');
        const expnsres = await axios.get('http://localhost:3000/api/v1/expense/get-expense');
console.log(incomeres.data);
        setIncome(incomeres.data);
        setExpense(expnsres.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  
  const data = {
    labels: income.map((item) => item.date.slice(0, 10)),
    datasets: [
      {
        label: 'Income',
        data: income.map((inc) => inc.amount),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Expense',
        data: expense.map((exp) => exp.amount),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Income Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default ChartCard;
