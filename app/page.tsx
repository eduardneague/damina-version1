"use client"

import Link from 'next/link'

import { QUICK_LINKS } from "@/lib/quicklinks"

export default function Home() {

  return (
    <>
      <main className = "flex flex-col w-full h-full md:justify-start md:items-start justify-center items-center">
        <h1 className = "text-xl font-bold mt-5 md:mt-2">Platformă Software Glina</h1>
        <p className = "text-md text-gray-500 mb-5">Meniu De Navigatie Rapid</p>

        <div className = "h-auto grid md:grid-cols-3 grid-cols-2 gap-3 justify-items-center">
            {QUICK_LINKS .map((item, i) => {
              if(item.title != 'Acasa') {
                return (
                  <>
                    <Link 
                      href = {item.path}
                      key = {i}
                      className = "bg-white select-none text-center rounded-md shadow-md duration-100 w-[10rem] h-[10rem] hover:bg-green-700 hover:text-white flex justify-center items-center flex-col gap-2"
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  </>
                )
              }
            })}
        </div>
      </main>
    </>
 )
}
