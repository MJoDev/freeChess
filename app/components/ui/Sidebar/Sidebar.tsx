'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import React from "react";


export default function Sidebar(){
    return (<section className="flex flex-col justify-between w-min h-screen pl-1 pr-1  bg-gray-700 text-white md:w-min" >
        <div className="flex flex-col gap-4">
            <div className="py-2 pr-1">
                
                <Link href={"/"} className="font-extrabold text-xl">FreeChess.com</Link>
            </div>
            <div className="flex flex-col font-bold justify-between gap-2">
                <Link href={"/play"} className="hover:bg-gray-500">Jugar</Link>
                <Link href={"/analyze" } className="hover:bg-gray-500">Analizar</Link>
            </div>
        </div>
        <div className="flex flex-col pb-2 justify-between gap-2">
                <Button>Inicia sesión</Button>
                <Button>Registrate</Button>
        </div>
    </section>)
}