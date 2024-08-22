"use client"
import axios from 'axios';
import React, { useState,useEffect } from 'react'
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

function Income() {
  const showToast = () => {
    toast.success("Data saved successfully!", {
      position: "top-center",
      autoClose:2000 // Use string values for positions
    });
  };
  const [totalincome,setTotalIncome]=useState(0);

  const [income, setIncome] = useState<IncomeItem[]>([]);
  const[clicked,setClicked]=useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeres = await axios.get('http://localhost:3000/api/v1/income/get-income');
        console.log(incomeres);
        let totalincome=0;
       incomeres.data.map((inc:any)=>{
            totalincome+=inc.amount;
        })
        setTotalIncome(totalincome);
        setIncome(incomeres.data.slice(0,5));
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
 

  const [description,setDescription]=useState("");
  const type="Income"
  const handleChange =async()=>{
         try{
          const response =await axios.post('http://localhost:3000/api/v1/income/add-income',{
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
         }catch(error){
            console.log(error);

         }
  }

  return (
    <div className='p-4 px-6'>

    <div className='text-3xl text-[#22d3ee] font-semibold'>
      Incomes
          
    </div>
    <div className='bg-zinc-900 mt-5 rounded lg p-3 '>
    < ToastContainer/>
            <div className=' flex justify-center '>
              <h1 className='text-2xl text-white font-semibold'>Total Income :   <span className='text-3xl font-bold text-green-400'>  $ {totalincome}</span></h1>
            </div>
           
    </div>
    <div className='grid grid-cols-6 mt-10 gap-4 '>
              <div className='col-span-2 '>
             
            <div className='flex flex-col gap-9 p-4 border rounded-lg' >
               
             <input type="text" className='p-2 text-lg outline-none rounded-lg bg-zinc-800 text-white'
             onChange={(e)=>{
              setSalaryTitle(e.target.value)
             }}
             placeholder='Salary Title'/>
             <input type="text" 
              onChange={(e)=>{
                setAmount(e.target.value)
               }}
             className='p-2 text-lg outline-none rounded-lg bg-zinc-800 text-white '  placeholder='Salary Amont'/>
             <select
        id="options"
        // value={selectedOption}
        onChange={(e)=>{
          setCategory(e.target.value)
         }}        className="border border-gray-300 outline-none bg-zinc-800 text-white rounded-md p-2"
      >
        <option  className='text-gray-400' value="" disabled selected hidden>Select a Income Type</option>
        <option value="Bitcoin">Bitcoin</option>
        <option value="Ethereum "> Ethereum</option>
        <option value="Solana">Solana</option>
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
           <button onClick={handleChange} className='bg-[#22d3ee] rounded-xl text-xl font-semibold mt-2 p-2 px-4  text-white'><span className='text-2xl font-bold'></span>Add Income</button>
           </div>
               </div>
  
              </div>
              <div className='col-span-4  flex flex-col items-center'>
              {income.map(item => {
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

export default Income;
