import React from 'react'
interface Items{
title:string,
amount:number,
type:string,
}
function HistoryItem({title,amount,type}:Items) {
  return (
    <div className={`bg-zinc-900 m-2 mb-3 ${type=='Income'?"text-green-400":"text-red-500"}  p-3 rounded-lg`}>
      <div className='flex justify-between   '>
        <h2 className='text-lg font-bold '>{title}</h2>
        <p className=''> {type=='Income'?"+":"-"}${amount}</p>
      </div>
    </div>
  )
}

export default HistoryItem
