
'use client';
import Link from 'next/link';
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import ClientIcon from '@mui/icons-material/Person';
import MapSkeleton from "./MapSkeleton"; // Importa el componente de carga
const validCountries = [
  "USA", "Canada", "Mexico",          // 🌎 América del Norte
  "Brazil", "Argentina", "Colombia",   // 🌎 América del Sur
  "Germany", "France", "Italy",        // 🌍 Europa
  "China", "Japan", "India",           // 🌏 Asia
  "South Africa", "Nigeria", "Egypt"   // 🌍 África
];

export default function ClientCountryChart() {
  const [chartData, setChartData] = useState([["Country", "Clients", { role: "tooltip", type: "string", p: { html: true } }]]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/clients");
        if (!res.ok) throw new Error("Failed to fetch clients");
        const clients = await res.json();

        const countryCounts = {};
        const countryClients = {};

        clients.forEach(client => {
          if (validCountries.includes(client.country)) {
            countryCounts[client.country] = (countryCounts[client.country] || 0) + 1;
            if (!countryClients[client.country]) {
              countryClients[client.country] = [];
            }
            countryClients[client.country].push(`✅ ${client.name}`);
          }
        });

        const chartArray = [["Country", "Clients", { role: "tooltip", type: "string", p: { html: true } }]];
        Object.entries(countryCounts).forEach(([country, count]) => {
          const clientList = countryClients[country].join("<br>");
          const tooltipContent = `<div style='padding:10px; width: 140%;'><strong>${country}</strong><br>Clients: ${count}<br>${clientList}</div>`;
          chartArray.push([country, count, tooltipContent]);
        });

        setChartData(chartArray);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
     finally {
      setLoading(false);
    }
    };

    fetchClients();
  }, []);

  return (
    <div className="bg-[#f8f9fa] w-full h-[50%] p-2 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-1">Clients by Country</h2>

       {loading 
            ? 
          
            <MapSkeleton />
      
      
            
            : chartData ? (

              <div>
                <Chart
        chartType="GeoChart"
        width="100%"
        height="400px"
        data={chartData}
        options={{
          region: "world",
          displayMode: "countries",
          resolution: "countries",
          colorAxis: { colors: ["#b3e5fc", "#01579b"], legend: { position: "none" } },
          backgroundColor: "#f8f9fa",
          datalessRegionColor: "#e0e0e0",
          defaultColor: "#f5f5f5",
          tooltip: { isHtml: true },
        }}
      />
       <p className="text-center text-gray-500 text-sm mt-2">
         Countries with more clients are displayed in darker blue.
      </p>
              </div>

      
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
     
     
          <Link href="/clients">
            <div className='flex flex-col items-center justify-center p-1'>
              <Button variant="contained" color="primary" size="large" style={{ width: '50%' }}>
                Add a Client
              <ClientIcon sx={{ padding:'5px' }} fontSize="large" /> 
              </Button>
            </div>
          </Link>

      
    </div>
  );
}
