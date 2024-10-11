"use client";
import React, { useEffect, useRef } from 'react';

const Page2Header = () => {
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  return (
    <div ref={headerRef} className='h-full px-6 md:px-28 py-16 w-full flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20'>
      <div
        ref={imageRef}
        className='h-64 w-full md:w-96 md:h-4/5 rounded-md bg-cover bg-center'
        style={{ backgroundImage: `url('https://i.pinimg.com/564x/f5/8e/32/f58e32b78a3db1f517d5cb0eef087794.jpg')` }}
      ></div>
      
      <div ref={textRef} className='w-full md:w-3/5 bg-white px-4 md:px-10 py-4'>
        <h1 className='font-bold text-blue-900 text-lg md:text-xl'>
          Worried about university exams and career?
        </h1>
        <h1 className='text-2xl md:text-4xl font-bold mt-5 mb-11 leading-snug text-slate-800'>
          &quot;We provide <span className='text-red-500'>best resources</span> and support to guide you with our experienced instructors&quot;
        </h1>
        <h1 className='mt-5 font-bold text-lg md:text-xl'>Ace your university exams</h1>
        <h1 className='text-base md:text-lg'>Get better understanding of concepts with 24*7 support</h1>
        <h1 className='mt-5 font-bold text-lg md:text-xl'>Enhance your resume</h1>
        <h1 className='text-gray-500 text-base md:text-lg'>
          Join our skill-based programs and stand out from others!
        </h1>
        <h1 className='mt-5 font-bold text-lg md:text-xl'>Exchange your skills</h1>
        <h1 className='text-base md:text-lg'>Join our skill-based programs and grow</h1>
      </div>
    </div>
  );
};

export default Page2Header;
