import React from 'react'
import SideBaritems from './SideBaritems'
import { IoHomeOutline } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";


function SideBar() {
    interface SideBarItem {
        name: string;
        path: string;
        icons: React.ReactNode;
    }
    const items:SideBarItem[]=[
        {
          name:"DashBoard",
          path:'/',
          icons:<IoHomeOutline/>
        },
        {
          name:"Income",
          path:'/incomes',
          icons:<FaMoneyCheckDollar/>
        }, {
          name:"Expenses",
          path:'/Expenses',
          icons:<FaMoneyBillTrendUp/>
        }, {
          name:"ViewTransaction",
          path:'/viewTransaction',
          icons:<TbTransactionDollar/>
        }

  ]
  interface SideBarItem{
    name:string,
    path:string,
    icons:React.ReactNode
  }
  return (
    <div className="h-screen border-2 border-gray-400 p-4 text-white rounded-lg fixed w-[15%] flex flex-col justify-between ">
  <div className='flex gap-2 items-center'>
    <div>
     <img src="/Image.jpg" className='w-16 h-16 rounded-full border-2 '/>
    </div>
    <div className='flex flex-col  '>
      <h1 className='text-3xl text-[#22d3ee] font-bold'>Emma</h1>
      <h2 className='text-gray-400'>Your money</h2>
    </div>
  </div>
  <div className=''>
  <div className="flex flex-col items-center">
    {items.map((item) => (
      <div key={item.name} className="w-full p-1 hover:bg-gray-800 rounded   my-2">
        <SideBaritems item={item} />
      </div>
    ))}
  </div>
  </div>
  <div>
    <button className='bg-[#22d3ee] rounded font-semibold text-2xl px-5 py-1 '> Logout</button>
  </div>
</div>

  )
}

export default SideBar
