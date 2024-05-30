'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function HomeGrid(){
    return <section className="flex flex-col flex-wrap w-full h-full content-center text-white">
        <div className="grid grid-cols-2 pt-6 gap-6">
            <div className="flex gap-16">
                <Image src={"/images/BoardPlace.png"} alt="Tablero" width={500} height={500} className="rounded"/>
            </div>
            <div className="flex flex-col justify-center content-center gap-2">
                <h2 className="font-semibold text-4xl text-center pb-6">¡Juega ajedrez 
                <br />gratis online!</h2>
                <Button>Juega ahora en línea</Button>
                <Button>Juega ahora contra una computadora</Button>
            </div>
        </div>
        <div>
            Sección 2
        </div>
        <div>
            Sección 3
        </div>
    </section>
}