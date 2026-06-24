"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MoveUpRight } from 'lucide-react'

function TypeCard(skinType) {
  const [isHovered, setIsHovered] = useState(false)  // Add this

  return (
    <div 
      className='relative overflow-hidden h-96 rounded-2xl'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={skinType.image}
        alt={skinType.title}
        width={400}
        height={400}
        className='rounded-2xl hover:scale-[104%] transition-transform duration-300'
      />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_-60px_60px_-20px_rgba(0,0,0,0.5)] hover:shadow-2xl rounded-2xl" />

      <h1 className={`absolute text-primary-foreground ${!isHovered ? "bottom-0" : "bottom-6"} left-0 right-0 p-4 rounded-t-2xl text-4xl font-bold transition-all duration-300`}>
        {skinType.title}
      </h1>
      <motion.span 
        className={`absolute bottom-5 left-5 right-0  rounded-b-2xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <p className='text-primary-foreground text-sm font-light'>{skinType.description}</p>
      </motion.span>
      {/* Redirect link */}
      <motion.span
        initial={{ opacity: 0 , x: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={skinType.link} className={`absolute top-6 right-6 bg-white p-2 rounded-full ${!isHovered ? "hidden" : "block"}`}>
          <MoveUpRight className=' text-secondary-foreground' />
        </Link>
      </motion.span>
    </div>
  )
}
export default TypeCard