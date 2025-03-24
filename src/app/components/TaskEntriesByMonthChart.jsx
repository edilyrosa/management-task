// 'use client';
// import Link from 'next/link';
// import { Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import { Chart } from "react-google-charts";
// import TaskIcon from '@mui/icons-material/AssignmentTurnedIn';

// export default function TaskEntriesByMonthChart() {
//   const [chartData, setChartData] = useState([
//     ["Month", "Task Entries"]
//   ]);

//   useEffect(() => {
//     const fetchTaskEntries = async () => {
//       try {
//         const res = await fetch("/api/taskentries");
//         if (!res.ok) throw new Error("Failed to fetch task entries");
//         const taskEntries = await res.json();

//         const monthCounts = {};
//         taskEntries.forEach(task => {
//           if (task.date) {
//             const date = new Date(task.date);
//             const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
//             monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1;
//           }
//         });

//         const chartArray = [["Month", "Task Entries"]];
//         Object.entries(monthCounts)
//           .sort((a, b) => new Date(a[0]) - new Date(b[0]))
//           .forEach(([month, count]) => {
//             chartArray.push([month, count]);
//           });

//         setChartData(chartArray);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchTaskEntries();
//   }, []);

//   return (
//     <div className="bg-[#f8f9fa] w-[50%] h-[50vh] p-2 shadow-lg rounded-lg">
 
//       <h2 className="text-xl font-bold text-center mb-1">CTask Entries by Month</h2>
//       <Chart
//         chartType="LineChart"
//         width="100%"
//         height="200px"
//         data={chartData}
//         options={{
//           title: "Task Entries per Month",
//           chartArea: { width: "70%" },
//           hAxis: {
//             title: "Month",
//           },
//           vAxis: {
//             title: "Number of Task Entries",
//             minValue: 0,
//           },
//           colors: ["#1e88e5"],
//           curveType: "function",
//           legend: { position: "bottom" },
//         }}
//       />
//        <div className='flex flex-col items-center justify-center p-1'>
//               <Button variant="contained" color="primary" size="small" style={{ width: '50%' }}>
//                 <Link href="/taskentries">Add a Taskentry</Link>
//                <TaskIcon sx={{ padding:'5px' }} fontSize="large" /> 
//               </Button>
//          </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import Link from "next/link";
import { Button } from "@mui/material";
import TaskIcon from "@mui/icons-material/AssignmentTurnedIn";
import PieChartSkeleton from "./PieChartSkeleton";

// 📌 Registrar componentes de Chart.js
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function TaskEntriesByMonthChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskEntries = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/taskentries");
        if (!res.ok) throw new Error("Failed to fetch task entries");
        const taskEntries = await res.json();

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

      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskEntries();
  }, []);

  return (
    <div className="bg-[#f8f9fa] w-full lg:w-[50%] h-[50vh] p-4 shadow-lg rounded-lg flex flex-col justify-between">
      <h2 className="text-xl font-bold text-center mb-3">Task Entries by Month</h2>

      {loading 
      ? (
        <PieChartSkeleton />
      ) : chartData ? (
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
              animation: {
                duration: 1000, // 🔥 Animación solo en la carga inicial
              },
            }}
          />
        </div>
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}

        <Link href="/taskentries">
                  <div className='flex flex-col items-center justify-center p-1'>
                    <Button variant="contained" color="primary" size="large" style={{ width: '50%' }}>
                    Add a Task Entry
                    <TaskIcon sx={{ padding: "5px" }} fontSize="large" />
                    </Button>
                  </div>
        </Link>
    </div>
  );
}
