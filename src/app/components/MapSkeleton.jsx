import React from "react";
import ContentLoader from "react-content-loader";

const CategorySkeleton = (props) => (
  <div className="flex flex-col items-center justify-center w-full">
    <ContentLoader
      speed={2}
      width="100%"
      height="50vh"
      viewBox="0 0 700 300"
      backgroundColor="#f3e7e7"
      foregroundColor="#c7cdea"
      {...props}
    >
      {/* Marco de la categoría */}
      <rect x="12" y="35" rx="5" ry="5" width="6" height="246" />
      <rect x="14" y="34" rx="5" ry="5" width="408" height="6" />
      <rect x="416" y="34" rx="5" ry="5" width="6" height="246" />
      <rect x="12" y="276" rx="5" ry="5" width="408" height="6" />

      {/* Título de la categoría */}
      <rect x="150" y="50" rx="6" ry="6" width="127" height="20" />

      {/* Imagen representativa */}
      <rect x="37" y="80" rx="7" ry="7" width="361" height="130" />

      {/* Descripción */}
      <rect x="58" y="225" rx="5" ry="5" width="316" height="10" />
      <rect x="86" y="240" rx="5" ry="5" width="267" height="10" />
      <rect x="58" y="255" rx="5" ry="5" width="316" height="10" />
    </ContentLoader>
  </div>
);

export default CategorySkeleton;
