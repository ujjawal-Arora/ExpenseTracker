"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import History from "@/Components/History";

interface IncomeItem {
  title: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  createdAt: string;
}

interface ExpenseItem {
  title: string;
  type: string;
  category: string;
  description: string;
  amount: number;
  createdAt: string;
}

type TransactionItem = IncomeItem | ExpenseItem;


function Transaction() {
  const [loading, setLoading] = useState(false);
  const [tincome, setTotalIncome] = useState<number>(0);
  const [eexpense, setTotalExpense] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [history, setHistory] = useState<TransactionItem[]>([]);
  const [income, setIncome] = useState<IncomeItem[]>([]);
  const [expense, setExpense] = useState<ExpenseItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const incomeres = await axios.get('http://localhost:3000/api/v1/income/get-income');
        const expnsres = await axios.get('http://localhost:3000/api/v1/expense/get-expense');

        setIncome(incomeres.data);
        setExpense(expnsres.data);

        let totalIncome = 0;
        incomeres.data.forEach((item: IncomeItem) => {
          totalIncome += item.amount;
        });
        setTotalIncome(totalIncome);

        let totalExpense = 0;
        expnsres.data.forEach((item: ExpenseItem) => {
          totalExpense += item.amount;
        });
        setTotalExpense(totalExpense);

        setBalance(totalIncome - totalExpense);

        const combinedHistory = [...incomeres.data, ...expnsres.data];
        combinedHistory.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setHistory(combinedHistory);
        console.log('Combined history:', combinedHistory);

       setInterval(()=>{
        setLoading(false);
       },3000)
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
         <History data={history} />
    </div>
  )
}

export default  Transaction
