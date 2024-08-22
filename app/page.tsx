"use client";
import Image from "next/image";
import ChartCard from "@/Components/ChartCard";
import History from "@/Components/History";
import Total from "@/Components/ToatlCard";
import axios from "axios";
import { useEffect, useState } from "react";

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

export default function Home() {
  const [income, setIncome] = useState<IncomeItem[]>([]);
  const [expense, setExpense] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [tincome, setTotalIncome] = useState<number>(0);
  const [eexpense, setTotalExpense] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [history, setHistory] = useState<TransactionItem[]>([]);

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

        setHistory(combinedHistory.slice(0, 4));
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
    <div className="p-4">
      <div className="text-3xl font-bold text-[#22d3ee]">All Transactions</div>
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-3">
          <ChartCard />
        </div>
        <div className="col-span-2">
         {loading?
         <div className=" animate-pulse">
         <div className="shrink-0">
           <span className="size-12 block bg-gray-200 rounded-full dark:bg-neutral-700"></span>
         </div>
       
         <div className="ms-4 mt-2 w-full">
           <p className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-[40%]"></p>
       
           <ul className="mt-5 space-y-3">
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
           </ul>
         </div>
         <div className="ms-4 mt-2 w-full">
           <p className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-[40%]"></p>
       
           <ul className="mt-10 space-y-3">
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
           </ul>
         </div>
       </div>
       
         : 
         <History data={history} />}
        </div>
      </div>
      <div className=" flex space-x-10 mt-20">
        <Total type="Income" num={tincome} />
        <Total type="Expense" num={eexpense} />
        <Total type="Balance" num={balance} />
      </div>
    </div>
  );
}
