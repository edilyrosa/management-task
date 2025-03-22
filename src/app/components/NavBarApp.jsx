import Link from 'next/link';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//!usar siemore className
export default function NavBarApp () {


  return (

    <header className="bg-white shadow-lg text-blue-600 w-full fixed z-10 top-0 py-4 h-[15vh]">
      
    <div className="flex flex-row justify-between items-center">
     
     <div className="flex gap-1 items-center">
      
        <span className="font-extrabold italic tracking-widest p-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Task Entries Management
        </span>
        
     </div>

     
     
  
      
     <nav>
      <ul className="flex flex-row gap-4 p-4 font-bold text-[8px] sm:text-xs md:text-sm lg:text-base">
        <Link href="/" className="hover:underline">Home - Charts</Link>
        <Link href="/clients" className="hover:underline">Clients</Link>
        <Link href="/projects" className="hover:underline">Projects</Link>
        <Link href="/taskentries" className="hover:underline">Task Entries</Link>
      </ul>
    </nav>
      
    </div>

  </header>
  );
};