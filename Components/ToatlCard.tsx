import React from 'react';

interface Type {
  type: string;
  num:number;
}

function TotalCard({type,num } : Type) {
  return (
    <div className='text-white w-60 h-28 flex  text-3xl flex-col items-center rounded-lg p-4 bg-zinc-900'>
     <h1 className={`text-3xl ${type=="Balance"?"text-green-500":"text-white"}`}>Total {type} </h1>
     <h1 className='text-gray-300 mt-1'>${num}</h1>
    </div>
  );
}

export default TotalCard;
