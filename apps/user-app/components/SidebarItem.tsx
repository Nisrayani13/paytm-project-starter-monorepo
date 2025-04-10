"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function SidebarItem({renderIcon, text, href}:{renderIcon:React.ReactNode, text:string, href:string}) {
    const router=useRouter()
    const pathname=usePathname();

    const selected=pathname===href

    console.log("pathname:",pathname);
    console.log("href:",href)

    console.log("selected:",selected)
  return (
    <div className={`flex items-center gap-x-2.5 cursor-pointer ${selected?"text-heading" : "text-slate-500"}`} onClick={()=>{
        router.push(href)
    }}>
      <div>{renderIcon}</div>
      <div className='font-bold'>{text}</div>
    </div>
  )
}