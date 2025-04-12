

// "use client";
// import RotatingText from './RotatingText';
// import { useEffect, useState } from "react";
// import { PolarArea } from "react-chartjs-2";
// import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
// import Link from "next/link";
// import { Button } from "@mui/material";
// import TaskIcon from "@mui/icons-material/AssignmentTurnedIn";
// import PieChartSkeleton from "./PieChartSkeleton";

// // 📌 Registrar componentes de Chart.js
// ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// export default function TaskEntriesByMonthChart() {
//   const [chartData, setChartData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTaskEntries = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch("/api/taskentries");
//         if (!res.ok) throw new Error("Failed to fetch task entries");
//         const taskEntries = await res.json();

//         const monthCounts = {};
//         taskEntries.forEach(task => {
//           if (task.date) {
//             const date = new Date(task.date);
//             const monthName = date.toLocaleString("default", { month: "short" });
//             monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
//           }
//         });

//         const labels = Object.keys(monthCounts);
//         const data = Object.values(monthCounts);

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Task Entries",
//               data,
//               backgroundColor: [
//                 "rgb(255, 99, 132)",
//                 "rgb(75, 192, 192)",
//                 "rgb(255, 205, 86)",
//                 "rgb(201, 203, 207)",
//                 "rgb(54, 162, 235)",
//                 "rgb(153, 102, 255)",
//                 "rgb(255, 159, 64)",
//               ],
//             },
//           ],
//         });

//       } catch (error) {
//         console.error("❌ Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTaskEntries();
//   }, []);

//   return (
//     <div className="bg-[#f8f9fa] w-full lg:w-[50%] h-[50vh] p-4 shadow-lg rounded-lg flex flex-col justify-between">

//         <RotatingText
//                 texts={[
//                   "Task Entries by Month",
//                   "Click on 'Add a task' and affect this chart",
//                   "Explore our task trends",
//                   "Join our task management journey",
//                 ]}
//                 mainClassName="text-base sm:text-lg p-1 mx-auto my-1 w-[80%] h-[5vh] bg-pink-300 rounded-lg justify-center text-white"
//                 staggerFrom="last"
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 exit={{ y: "-120%" }}
//                 staggerDuration={0.025}
//                 splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
//                 transition={{ type: "spring", damping: 30, stiffness: 400 }}
//                 rotationInterval={6000}
//               />

//       {loading 
//       ? (
//         <PieChartSkeleton />
//       ) : chartData ? (
//         <div className="flex-grow">
//           <PolarArea
//             data={chartData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: { position: "bottom" },
//                 tooltip: { enabled: true },
//               },
//               animation: {
//                 duration: 1000, // 🔥 Animación solo en la carga inicial
//               },
//             }}
//           />
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No data available</p>
//       )}

//         <Link href="/taskentries">
//                   <div className='flex flex-col items-center justify-center p-1'>
//                     <Button variant="contained" color="primary" size="large" style={{ width: '100%' }}>
//                     Add a Task Entry
//                     <TaskIcon sx={{ padding: "5px" }} fontSize="large" />
//                     </Button>
//                   </div>
//         </Link>
//     </div>
//   );
// }


"use client";

import RotatingText from './RotatingText';
import { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import Link from "next/link";
import { Button } from "@mui/material";
import TaskIcon from "@mui/icons-material/AssignmentTurnedIn";
import PieChartSkeleton from "./PieChartSkeleton";
import { useTaskEntries } from '../../context/TaskEntryContext'; // ✅ Importa el contexto

// 📌 Registro de componentes para Chart.js
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function TaskEntriesByMonthChart() {
  const { taskEntries } = useTaskEntries(); // ✅ Consumimos desde el contexto
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskEntries) return; // Aún no está cargado

    const monthCounts = {};
    taskEntries.forEach(task => {
      if (task.date) {
        const date = new Date(task.date);
        const monthName = date.toLocaleString("default", { month: "short" });
        monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
      }
    });

    const labels = Object.keys(monthCounts);
    const data = Object.values(monthCounts);

    setChartData({
      labels,
      datasets: [
        {
          label: "Task Entries",
          data,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(201, 203, 207)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
          ],
        },
      ],
    });

    setLoading(false);
  }, [taskEntries]);

  return (
    <div className="bg-[#f8f9fa] w-full lg:w-[50%] h-[50vh] p-4 shadow-lg rounded-lg flex flex-col justify-between">
      <RotatingText
        texts={[
          "Task Entries by Month",
          "Click on 'Add a task' and affect this chart",
          "Explore our task trends",
          "Join our task management journey",
        ]}
        mainClassName="text-base sm:text-lg p-1 mx-auto my-1 w-[80%] h-[5vh] bg-pink-300 rounded-lg justify-center text-white"
        staggerFrom="last"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={6000}
      />

      {loading || !chartData ? (
        <PieChartSkeleton />
      ) : (
        <div className="flex-grow">
          <PolarArea
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "bottom" },
                tooltip: { enabled: true },
              },
              animation: { duration: 1000 },
            }}
          />
        </div>
      )}

      <Link href="/taskentries">
        <div className='flex flex-col items-center justify-center p-1'>
          <Button variant="contained" color="primary" size="large" style={{ width: '100%' }}>
            CRUD Task Entry & project hours
            <TaskIcon sx={{ padding: "5px" }} fontSize="large" />
          </Button>
        </div>
      </Link>
    </div>
  );
}
