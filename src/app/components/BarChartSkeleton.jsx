// import React from 'react'
// import ContentLoader from 'react-content-loader'

// const BarChart = props => {
//   return (
//     <ContentLoader width={200} height={200} viewBox="0 0 200 200" {...props}>
//       <rect x="0" y="160" rx="0" ry="0" width="25" height="40" />
//       <rect x="30" y="145" rx="0" ry="0" width="25" height="55" />
//       <rect x="60" y="126" rx="0" ry="0" width="25" height="74" />
//       <rect x="90" y="80" rx="0" ry="0" width="25" height="120" />
//       <rect x="120" y="142" rx="0" ry="0" width="25" height="58" />
//     </ContentLoader>
//   )
// }

// BarChart.metadata = {
//   name: 'Phuong Dao',
//   github: 'dao-phuong',
//   description: 'Bar Chart',
//   filename: 'BarChart',
// }

// export default BarChart

import React from "react";
import ContentLoader from "react-content-loader";

const BarChartSkeleton = (props) => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="50vh"
      viewBox="0 0 700 300"
      backgroundColor="#f3e7e7"
      foregroundColor="#c7cdea"
      {...props}
    >
      {/* Ejes */}
      <rect x="50" y="30" rx="5" ry="5" width="6" height="240" />
      <rect x="50" y="270" rx="5" ry="5" width="600" height="6" />

      {/* Barras del gráfico */}
      <rect x="80" y="190" rx="4" ry="4" width="50" height="80" />
      <rect x="160" y="150" rx="4" ry="4" width="50" height="120" />
      <rect x="240" y="100" rx="4" ry="4" width="50" height="170" />
      <rect x="320" y="130" rx="4" ry="4" width="50" height="140" />
      <rect x="400" y="80" rx="4" ry="4" width="50" height="190" />
      <rect x="480" y="170" rx="4" ry="4" width="50" height="100" />
    </ContentLoader>
  );
};

export default BarChartSkeleton;
