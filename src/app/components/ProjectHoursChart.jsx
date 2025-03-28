"use client";
import RotatingText from './RotatingText';
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
    <div className="bg-[#f8f9fa] w-full lg:w-[50%] h-[50vh] p-4 shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">
   
        <RotatingText
                      texts={[
                        "Hours Worked by Project",
                        "Click on 'Add a Project' then set it a task",
                        "and affect this chart!",
                        "Let's make your project a reality",
                      ]}
                      mainClassName="text-base sm:text-lg p-1 mx-auto my-1 w-[80%] h-[5vh] bg-blue-300 rounded-lg justify-center text-white"
                      staggerFrom="last"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={6000}
                    />

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

      <Link href="/projects">
                  <div className='flex flex-col items-center justify-center p-1'>
                    <Button variant="contained" color="primary" size="large" style={{ width: '100%' }}>
                      Add a Project
                    <ProjectIcon sx={{ padding: "5px" }} fontSize="large" />
                    </Button>
                  </div>
      </Link>
    </div>
  );
}




