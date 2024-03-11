"use client"

import React from 'react'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import useScroll from '@/hooks/useScroll'

import { cn } from "@/lib/utils"

const Header = () => {

    const scrolled = useScroll(5)
    const selectedLayout = useSelectedLayoutSegment()

    return (
        <>
        <div
            className={cn(
                `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
                {
                'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
                'border-b border-gray-200 bg-white': selectedLayout,
                },
            )}
            >
            <div className="flex h-[47px] items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                <Link
                    href="/"
                    className="flex flex-row space-x-3 items-center justify-center md:hidden"
                >
                   <img
                        src = "/DAMINA_LOGO.png"
                        alt = "damina logo"
                        className = "select-none h-6 w-16"
                        draggable = {false}
                    />
                <div className = "flex flex-col">
                    <h1 className = "font-bold text-md select-non">GLINA</h1>
                    <h1 className = "font-regular mt-[-0.3rem] text-sm select-non text-gray-500">Software</h1>
                </div>
                    
                </Link>
                    <h1 className = "font-regular text-sm select-none hidden md:block text-gray-500">Creat de Neague Eduard </h1>
                </div>

                <div className="hidden md:block">
                    
                    <div className="h-8 w-8 rounded-full bg-green-700 flex items-center justify-center text-center select-none">
                        <span className="font-semibold text-sm select-none text-white">N</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header