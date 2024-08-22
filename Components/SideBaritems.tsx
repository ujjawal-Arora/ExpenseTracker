"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
interface SideBarItem {
  name: string;
  path: string;
  icons: React.ReactNode;
}

function SideBaritems({item}:{
  item: SideBarItem
}) {
  const router=useRouter();
    
  return (
    <div className='flex gap-2 text-[#22d3ee]' onClick={()=>{
      router.push(`${item.path}`)
    }}>
      <div className='flex items-center'>
        {item.icons}
       </div>

        <div className=''>
          {item.name}
        </div>
       
      
    </div>
  )
}

export default SideBaritems
