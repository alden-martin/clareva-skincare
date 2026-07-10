"use client"
import React, { useEffect, useState } from 'react'
import { morning, night } from '@/utils/routine'
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import CtaButton from './CtaButton';
function RoutineBuilder() {
    const [morningState , setMorningState] = useState(true);
    const calcTotalPrice = () => {
        if(morningState) {
            return morning.reduce((total, item) => total + item.price, 0);
        } else {
            return night.reduce((total, item) => total + item.price, 0);
        }
    }
   
  return (
    <div className='relative flex flex-col  items-center mb-10'>
        {/* Toggle Button */}
    <div className='flex gap-x-4 bg-white rounded-2xl p-1 absolute left-10 lg:right-0 lg:-top-14 top-5' onClick={() => setMorningState(!morningState)}>
      <button  className={`cursor-pointer p-4 rounded-2xl font-body flex flex-row gap-x-1 transition duration-300 ${morningState  ? "bg-black text-white" : "bg-white text-black"}`}>
        <Sun/>
        Morning
      </button>
      <button  className={`cursor-pointer p-4 rounded-2xl font-body flex flex-row gap-x-1 transition duration-300 ${!morningState ? "bg-black text-white" : "bg-white text-black"}`}>
        <Moon/>
        Night
      </button>
    </div>
    {/* Routine Cards */}
    <div className='grid grid-cols-1 my-10 items-center lg:grid-cols-4 gap-x-4 gap-y-5 w-full justify-center mt-30'>
        {
            morningState  ? (
                morning.map((item) => (
                    <div key={item.productId} className='p-5 bg-white rounded-2xl  h-112'>
                        <Image src={item.image} alt={item.title} width={250} height={250} className='rounded-2xl mr-2 ml-2'/>
                        <h1 className='font-heading text-2xl mt-5 mx-[10%] font-semibold text-secondary-foreground'>
                        {item.title}
                        </h1>
                        <p className='font-body text-sm font-light text-text mx-[10%] '>
                        {item.description}
                        </p>
                    </div>
                ))
            ) : (
                night.map((item) => (
                    <div key={item.productId} className='p-4 bg-white rounded-2xl  h-112'>
                       <Image src={item.image} alt={item.title} width={250} height={250} className='rounded-2xl mr-2 ml-2'/>
                        <h1 className='font-heading text-2xl mt-5 mx-[10%] font-semibold text-secondary-foreground'>
                        {item.title}
                        </h1>
                        <p className='font-body text-sm font-light text-text mx-[10%] '>
                        {item.description}
                        </p>
                    </div>
                ))
            )
        }
 

    </div>
    <CtaButton>Add Full Routine Rs {calcTotalPrice().toString()}</CtaButton>
    </div>
  )
}

export default RoutineBuilder