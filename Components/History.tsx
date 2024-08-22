import React from 'react'
import HistoryItem from './HistoryItem';
interface History{
  data:(IncomeItem)[];
}
interface IncomeItem {
  title:string,
  type: string;
  amount: number;
  category: string;
  description:string;
  createdAt: string;  
}
function History({data}:History) {
  return (

    <div className='p-1 h-80'>
      <div className='text-[#22d3ee] text-3xl text-semibold'>
        Recent History
      </div>
      <div className=' mt-5 text-white'>
    {data.map((item)=>(
      <div className=''>
        <HistoryItem title={item.title} amount={item.amount} type={item.type}/>
      </div>
    )

    )}
    </div>
    </div>


  )
}

export default History
