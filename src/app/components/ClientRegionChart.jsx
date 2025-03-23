'use client';

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const validCountries = [
  "USA", "Canada", "Mexico",          // 🌎 América del Norte
  "Brazil", "Argentina", "Colombia",   // 🌎 América del Sur
  "Germany", "France", "Italy",        // 🌍 Europa
  "China", "Japan", "India",           // 🌏 Asia
  "South Africa", "Nigeria", "Egypt"   // 🌍 África
];

export default function ClientCountryChart() {
  const [chartData, setChartData] = useState([["Country", "Clients"]]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/clients");
        if (!res.ok) throw new Error("Failed to fetch clients");
        const clients = await res.json();

        const countryCounts = {};
        clients.forEach(client => {
          if (validCountries.includes(client.country)) {
            countryCounts[client.country] = (countryCounts[client.country] || 0) + 1;
          }
        });

        const chartArray = [["Country", "Clients"]];
        Object.entries(countryCounts).forEach(([country, count]) => {
          chartArray.push([country, count]);
        });

        setChartData(chartArray);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="bg-[#f8f9fa] w-full h-[30%] p-2 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Clients by Country</h2>

<Chart
  chartType="GeoChart"
  width="100%"
  height="350px"
  data={chartData}
  options={{
    region: "world",
    displayMode: "countries",
    resolution: "countries",
    colorAxis: { colors: ["#b3e5fc", "#01579b"], legend: { position: "none" } }, // 🔥 Ocultar escala de colores original
    backgroundColor: "#f8f9fa",
    datalessRegionColor: "#e0e0e0",
    defaultColor: "#f5f5f5",
  }}
/>
      <p className="text-center text-gray-500 text-sm mt-2">
        Countries with more clients are displayed in darker blue.
      </p>
    </div>
  );
}
