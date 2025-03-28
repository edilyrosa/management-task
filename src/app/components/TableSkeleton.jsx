import React from "react";
import ContentLoader from "react-content-loader";

const TableSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width="80%"
    height="80%"
    viewBox="0 0 1000 550"
    backgroundColor="#f3e7e7"
    foregroundColor="#c7cdea"
    {...props}
  >
    {/* Títulos de columnas */}
    <rect x="50" y="30" rx="5" ry="5" width="900" height="25" />
    
    {/* Filas de la tabla */}
    {[...Array(6)].map((_, index) => {
      const yOffset = 80 + index * 70;
      return (
        <React.Fragment key={index}>
          <circle cx="880" cy={yOffset + 10} r="10" />
          <circle cx="920" cy={yOffset + 10} r="10" />
          <rect x="100" y={yOffset} rx="5" ry="5" width="150" height="20" />
          <rect x="300" y={yOffset} rx="5" ry="5" width="300" height="20" />
          <rect x="650" y={yOffset} rx="5" ry="5" width="200" height="20" />
          <rect x="50" y={yOffset + 35} rx="3" ry="3" width="900" height="2" />
        </React.Fragment>
      );
    })}
  </ContentLoader>
);

export default TableSkeleton;
