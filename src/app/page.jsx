import Image from "next/image";
import ClientRegionChart from "./components/ClientRegionChart";
import ProjectHoursChart from "./components/ProjectHoursChart";
import TaskEntriesByMonthChart from "./components/TaskEntriesByMonthChart";

export default function Home() {
  return (
  <div className="flex flex-col items-center justify-start min-h-screen">
    {/* <h1 className="text-4xl font-bold my-1">Dashboard Charts of Management</h1> */}
    <ClientRegionChart/>
    <div className="flex flex-col items-center justify-center lg:flex-row gap-2 w-full p-2">
       <ProjectHoursChart/>
    < TaskEntriesByMonthChart/>
    </div>
   
    </div>
    );
}

