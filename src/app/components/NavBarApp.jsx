import Link from 'next/link';
import * as React from 'react';
import ProjectIcon from '@mui/icons-material/FolderOpen';
import TaskIcon from '@mui/icons-material/AssignmentTurnedIn';
import ClientIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import imgPro from "../../../public/project.gif";
export default function NavBarApp() {
  return (
    <header className="bg-white shadow-lg text-blue-600 w-full fixed z-10 top-0 py-2 h-[12vh] sm:h-[10vh]">
      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-1 items-center">
          <span className="font-extrabold italic tracking-widest p-4 
          text-sm sm:text-base lg:text-2xl xl:text-4xl">
            Task Entries Management
          </span>
        </div>
        <nav>
  <ul className="flex flex-row items-center gap-6 p-4 font-bold text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
    
    <Link href="/" className="hover:underline">
      <div className="rounded-md px-2 py-1 bg-white hover:bg-gray-200 transition duration-300 ease-in-out flex items-center">
        <span className="hidden md:block ml-1">Dashboard</span>
        <DashboardIcon fontSize="medium" sx={{ padding: '3px' }} />
      </div>
    </Link>

    <Link href="/clients" className="hover:underline">
      <div className="rounded-md px-2 py-1 bg-white hover:bg-gray-200 transition duration-300 ease-in-out flex items-center">
        <span className="hidden md:block ml-1">Clients</span>
        <ClientIcon fontSize="medium" sx={{ padding: '3px' }} />
      </div>
    </Link>

    <Link href="/projects" className="hover:underline">
      <div className="rounded-md px-2 py-1 bg-white hover:bg-gray-200 transition duration-300 ease-in-out flex items-center">
        <span className="hidden md:block ml-1">Projects</span>
        <ProjectIcon fontSize="medium" sx={{ padding: '3px' }} />
      </div>
    </Link>

    <Link href="/taskentries" className="hover:underline">
      <div className="rounded-md px-2 py-1 bg-white hover:bg-gray-200 transition duration-300 ease-in-out flex items-center">
        <span className="hidden md:block ml-1">Task Entries</span>
        <TaskIcon fontSize="medium" sx={{ padding: '3px' }} />
      </div>
    </Link>

  </ul>
</nav>

      </div>
    </header>
  );
}
