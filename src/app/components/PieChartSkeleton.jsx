import React from "react";
import ContentLoader from "react-content-loader";

const PieChartSkeleton = (props) => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="50vh"
      viewBox="0 0 400 300"
      backgroundColor="#f3e7e7"
      foregroundColor="#c7cdea"
      {...props}
    >
      {/* Título */}
      <rect x="100" y="20" rx="5" ry="5" width="200" height="20" />
      
      {/* Círculo del Pie Chart */}
      <circle cx="180" cy="150" r="80" />

      {/* Leyenda */}
      <rect x="290" y="80" rx="5" ry="5" width="10" height="10" />
      <rect x="310" y="80" rx="5" ry="5" width="50" height="10" />

      <rect x="290" y="100" rx="5" ry="5" width="10" height="10" />
      <rect x="310" y="100" rx="5" ry="5" width="50" height="10" />

      <rect x="290" y="120" rx="5" ry="5" width="10" height="10" />
      <rect x="310" y="120" rx="5" ry="5" width="50" height="10" />

      <rect x="290" y="140" rx="5" ry="5" width="10" height="10" />
      <rect x="310" y="140" rx="5" ry="5" width="50" height="10" />
    </ContentLoader>
  );
};

export default PieChartSkeleton;
