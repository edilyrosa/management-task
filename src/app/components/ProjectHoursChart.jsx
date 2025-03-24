// 'use client';
// import Link from 'next/link';
// import { Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import { Chart } from "react-google-charts";
// import ProjectIcon from '@mui/icons-material/FolderOpen';

// export default function ProjectHoursChart() {
//   const [chartData, setChartData] = useState([
//     ["Project", "Hours Worked"]
//   ]);

//   useEffect(() => {
//     const fetchTaskEntries = async () => {
//       try {
//         const res = await fetch("/api/taskentries");
//         if (!res.ok) throw new Error("Failed to fetch task entries");
//         const taskEntries = await res.json();

//         const projectHours = {};

//         taskEntries.forEach(task => {
//           if (task.project_id && task.duration) {
//             projectHours[task.project_id] =
//               (projectHours[task.project_id] || 0) + task.duration;
//           }
//         });

//         const projectsRes = await fetch("/api/projects");
//         if (!projectsRes.ok) throw new Error("Failed to fetch projects");
//         const projects = await projectsRes.json();

//         const projectNames = Object.fromEntries(
//           projects.map(p => [p.id, p.name])
//         );

//         const chartArray = [["Project", "Hours Worked"]];
//         Object.entries(projectHours).forEach(([projectId, hours]) => {
//           const projectName = projectNames[projectId] || "Unknown Project";
//           console.log(`📊 Proyecto: ${projectName}, Horas: ${hours}`);
//           chartArray.push([projectName, Number(hours)]);
//         });

//         setChartData(chartArray);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchTaskEntries();
//   }, []);

//   return (
//     <div className="bg-[#f8f9fa] w-full h-[30%] p-2 shadow-lg rounded-lg">
//       <h2 className="text-xl font-bold text-center mb-1">Hours Worked by Project</h2>
//       <Chart
//         chartType="BarChart"
//         width="100%"
//         height="200px"
//         data={chartData}
//         options={{
//           title: "Total Hours Worked per Project",
//           chartArea: { width: "70%" },
//           hAxis: {
//             title: "Hours Worked",
//             minValue: 0,
//           },
//           vAxis: {
//             title: "Projects",
//           },
//           colors: ["#1565c0"],
//         }}
//       />
//       <div className='flex flex-col items-center justify-center p-1'>
//         <Button variant="contained" color="primary" size="small" style={{ width: '50%' }}>
//           <Link href="/projects">Add a Project</Link>
//           <ProjectIcon sx={{ padding:'5px' }} fontSize="large" /> 
//         </Button>
//       </div>
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Link from "next/link";
import { Button } from "@mui/material";
import ProjectIcon from "@mui/icons-material/FolderOpen";
import BarChartSkeleton from "./BarChartSkeleton";

// 📌 Registrar componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProjectHoursChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskEntries = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/taskentries");
        if (!res.ok) throw new Error("Failed to fetch task entries");
        const taskEntries = await res.json();

        const projectHours = {};
        taskEntries.forEach(task => {
          if (task.project_id && task.duration) {
            projectHours[task.project_id] = (projectHours[task.project_id] || 0) + task.duration;
          }
        });

        const projectsRes = await fetch("/api/projects");
        if (!projectsRes.ok) throw new Error("Failed to fetch projects");
        const projects = await projectsRes.json();

        const projectNames = Object.fromEntries(projects.map(p => [p.id, p.name]));

        const labels = [];
        const data = [];

        Object.entries(projectHours).forEach(([projectId, hours]) => {
          labels.push(projectNames[projectId] || "Unknown Project");
          data.push(Number(hours));
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Hours Worked",
              data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1,
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
    <div className="bg-[#f8f9fa] w-full lg:w-[60%] h-[40vh] p-4 shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">
      <h2 className="text-xl font-bold text-center mb-3">Hours Worked by Project</h2>

      {loading 
      ? 
    
      <BarChartSkeleton />


      
      : chartData ? (
        <div className="flex-grow">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { stepSize: 1 },
                },
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

      <div className="flex flex-col items-center justify-center p-3">
        <Button variant="contained" color="primary" size="small" style={{ width: "50%" }}>
          <Link href="/projects">Add a Project</Link>
          <ProjectIcon sx={{ padding: "5px" }} fontSize="large" />
        </Button>
      </div>
    </div>
  );
}




