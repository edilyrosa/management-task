import Image from "next/image";
import ClientRegionChart from "./components/ClientRegionChart";

export default function Home() {
  return (
  <div className="flex flex-col items-center justify-start min-h-screen">
    <h1 className="text-4xl font-bold my-1">Dashboard Charts of Management</h1>
    <ClientRegionChart/>
    </div>
    );
}

