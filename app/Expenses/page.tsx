"use client"
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IncomeCaed from '@/Components/IncomeCaed';
interface IncomeItem {
  title: string;
  amount: number;
  category: string;
  date:Date,
  description: string;
  _id: string;
  type: string;
  
}

function Expense() {
  const showToast = () => {
    toast.success("Data saved successfully!", {
      position: "top-center", // Use string values for positions
    });
  };
 
  const [totalincome,setTotalIncome]=useState(0);


  const [income, setIncome] = useState<IncomeItem[]>([]);
  const[clicked,setClicked]=useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const expenseres = await axios.get('http://localhost:3000/api/v1/expense/get-expense');
        console.log(expenseres);
        let totalIncome=0;
        expenseres.data.map((item:any) => {
          totalIncome += item.amount;
        });
        setTotalIncome(totalIncome);
        setIncome(expenseres.data.slice(0,5));
        setInterval(()=>{
          setLoading(false);

          },3000)
            } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [clicked]);
console.log("income"+income);//but it is showing an empty object 

  const [title,setSalaryTitle]=useState("");
  const [amount,setAmount]=useState("");
  const [date,setDate]=useState<Date|null>(null);
  const [category,setCategory]=useState("");
 const[loading,setLoading]=useState(false);

  const [description,setDescription]=useState("");
  const type="Expense"
  const handleChange =async()=>{
         try{
          
          const response =await axios.post('http://localhost:3000/api/v1/expense/add-expense',{
            title,
            amount,
            date,
            category,
            description,
            type,
          });
          console.log(response);
      showToast();
          setClicked(!clicked)
          setSalaryTitle("")
          setAmount("")
          setDate(null);
          setCategory(""),
          setDescription("")
          console.log(loading);
         }catch(error){
            console.log(error);

         }

  }


  return (
    <div className='p-4 px-6'>
      <ToastContainer/>
    <div className='text-3xl text-[#22d3ee] font-semibold'>
      Expenses
    </div>
    <div className='bg-zinc-900 mt-5 rounded lg p-3 '>
            <div className=' flex justify-center '>
              <h1 className='text-2xl text-white font-semibold'>Total Expense :   <span className='text-3xl font-bold text-red-500'> - ${totalincome}</span></h1>
            </div>
           
    </div>
    <div className='grid grid-cols-6 mt-10 gap-4 '>
              <div className='col-span-2 '>
             
            <div className='flex flex-col gap-9 p-4 border rounded-lg' >
               
             <input type="text" className='p-2 text-lg outline-none rounded-lg bg-zinc-800 text-white'
             onChange={(e)=>{
              setSalaryTitle(e.target.value)
             }}
             placeholder='Expense Title'/>
             <input type="text" 
              onChange={(e)=>{
                setAmount(e.target.value)
               }}
             className='p-2 text-lg outline-none rounded-lg bg-zinc-800 text-white '  placeholder='Expense Amont'/>
             <select
        id="options"
        // value={selectedOption}
        onChange={(e)=>{
          setCategory(e.target.value)
         }}        className="border border-gray-300 outline-none bg-zinc-800 text-white rounded-md p-2"
      >
        <option  className='text-gray-400' value="" disabled selected hidden>Select a Expense Type</option>
        <option value="Shopping">Shopping</option>
        <option value="Grocery "> Grocery</option>
        <option value="materialistic">materialistic</option>
        <option value="other">other</option>
      </select>
             <input type="date"
              onChange={(e)=>{
                setDate(new Date(e.target.value))
               }} 
             
             className='p-2 text-lg outline-none rounded-lg bg-zinc-800 text-white'  /> 
             <textarea name="" 
              onChange={(e)=>{
                setDescription(e.target.value)
               }} 
              className =' text-white w-80 h-32 outline-none p-1 bg-zinc-800 rounded-lg resize-none '   placeholder=' add a description' id=""></textarea>
           <div className='flex justify-end'>
           <button onClick={handleChange} className='bg-[#22d3ee] rounded-xl text-xl font-semibold mt-2 p-2 px-4  text-white'><span className='text-2xl font-bold'></span>Add Expense</button>
           </div>
               </div>
  
              </div>
             
              <div className='col-span-4  flex flex-col items-center'>
            {
            loading? 
            <div className=" animate-pulse">
         <div className="shrink-0">
           <span className="size-12 block bg-gray-200 rounded-full dark:bg-neutral-700"></span>
         </div>
       
         <div className="ms-4 mt-2 w-full">
           <p className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-96"></p>
       
           <ul className="mt-5 space-y-3">
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
           </ul>
         </div>
         <div className="ms-4 mt-2 w-full">
           <p className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-96"></p>
       
           <ul className="mt-10 space-y-3">
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
             <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
           </ul>
         </div>
       </div>
            :
              
                
              income.map(item => {
  return (
   
      <IncomeCaed 
      _id={item._id}
      title={item.title}
      category={item.category}
      date={String(item.date).slice(0,10)}
      amount={item.amount}
      description={item.description}
      setClicked={setClicked}
         type={item.type}
      clicked={clicked}

    />
    
  );
})}
                     
              </div>
              
            </div>

    </div>
  )
}

export default Expense;
