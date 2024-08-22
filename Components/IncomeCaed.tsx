import axios from 'axios';
import React from "react";
import { FaBitcoin } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdCurrencyPound } from "react-icons/md";
import { HiCurrencyYen } from "react-icons/hi";
import { IoHappyOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { SiNike } from "react-icons/si";

import { IoFastFoodSharp } from "react-icons/io5";

import { FaShoppingCart } from "react-icons/fa";
import { Happy_Monkey } from 'next/font/google';


interface IncomeItem {
  title: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  _id: string;
  clicked: boolean;
  type: string;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

function IncomeCaed({ type, title, date, amount, category, description, _id, setClicked, clicked }: IncomeItem) {
  const showDeleteToast = () => {
    toast.success(`${type} Deleted successfully!`, {
      position: "top-center", // Use string values for positions
    });
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/${type === "Income" ? "income" : "expense"}/delete-${type === "Income" ? "income" : "expense"}?id=${_id}`);
      showDeleteToast();
    
      setClicked(!clicked);
       // Toggle the clicked state to refresh the list

    } catch (error) {
      console.error(`Error deleting ${type.toLowerCase()}:`, error);
      alert(`Failed to delete ${type.toLowerCase()}`);
    }
  };

  const renderIcon = () => {
    if (type === "Income") {
      switch (category) {
        case "Bitcoin":
          return <FaBitcoin />;
        case "Ethereum":
          return <MdCurrencyPound />;
        case "Solana":
          return <HiCurrencyYen />;
        default:
          return <IoHappyOutline />;
      }
    } else {
      switch (category) {
        case "Shopping":
          return <FaShoppingCart />;
        case "Market":
          return <IoFastFoodSharp />;
        case "materialistic":
          return <SiNike />;
        default:
          return <IoHappyOutline />;
      }
    }
  };

  return (
    <div className="bg-gray-300 m-1 mb-8 flex gap-5  rounded-xl h-16 w-[90%] items-center">
     <ToastContainer/>
      <div className="text-5xl w-[20%]">
        {renderIcon()}
      </div>
      <div className='w-[60%]'>
        <div className="flex gap-2 items-center">
          <div className={`${type === "Income" ? "bg-green-500" : "bg-red-500"} rounded-full h-4 w-4`}></div>
          <div className="text-xl font-semibold">{title}</div>
        </div>
        <div className="flex gap-3 mt-1 text-gray-700">
          <div>$ {amount}</div>
          <div className="flex gap-2 items-center">
            <SlCalender />
            <h1>{date}</h1>
          </div>
          <div className="flex gap-2 items-center">
            <SlCalender />
            <h1>{description}</h1>
          </div>
        </div>
      </div>
      <div 
        onClick={handleDelete}
        className="bg-gray-900 h-10 w-10 rounded-full p-2 text-2xl flex items-center text-white cursor-pointer"
      >
        <MdDelete />
      </div>
    </div>
  );
}

export default IncomeCaed;
