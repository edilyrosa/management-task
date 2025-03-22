// 'use client';

// import { useEffect, useState } from 'react';

// export default function DetailCard({ item }) {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsVisible(window.innerWidth < 1024); // Mostrar solo en pantallas menores a lg
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
    
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   if (!isVisible || !item) return null;

//   return (
//     <div
//       className="fixed top-[10%] left-[50%] transform -translate-x-1/2 z-50 p-4 text-center 
//       bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 w-64"
//     >
//       <h3 className="text-lg font-semibold">{item.name || 'No Name'}</h3>
//       {item.city && item.country && (
//         <p className="text-xs sm:text-sm text-gray-600">{item.city}, {item.country}</p>
//       )}
//       {item.state && <p className="text-xs sm:text-sm text-gray-600">State: {item.state}</p>}
//       {item.industry_codes && <p className="text-xs sm:text-sm text-gray-600">Industry Code: {item.industry_codes}</p>}
//       {item.client_id && <p className="text-xs sm:text-sm text-gray-600">Client ID: {item.client_id}</p>}
//       {item.description &&
//        <p className="text-xs sm:text-sm text-justify text-gray-500 mt-2">
//         Descripcion:{item.description}
//         </p>
//       }
      
     
//       <p className="text-xs sm:text-sm font-semibold mt-2">
//         Status:{' '}
        
//         <span className={item.active ? 'text-green-600' : 'text-red-600'}>
//           {item.active ? 'Active' : 'Inactive'}
//         </span>
//       </p>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

export default function DetailCard({ item }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth < 1024); // Mostrar solo en pantallas menores a lg
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible || !item) return null;

  return (
    <div
      className="fixed top-[10%] left-[50%] transform -translate-x-1/2 z-50 p-4 text-center 
      bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 w-64"
    >
      <h3 className="text-lg font-semibold">{item.name || 'No Name'}</h3>
      {item.city && item.country && (
        <p className="text-xs sm:text-sm text-gray-600">{item.city}, {item.country}</p>
      )}
      {item.state && <p className="text-xs sm:text-sm text-gray-600">State: {item.state}</p>}
      {item.industry_codes && <p className="text-xs sm:text-sm text-gray-600">Industry Code: {item.industry_codes}</p>}
      
      {item.client_id && <p className="text-xs sm:text-sm text-gray-600">Client ID: {item.client_id}</p>}
      {item.description &&
       <p className="text-xs sm:text-sm text-justify text-gray-500 mt-2">
        Descripcion:{item.description}
        </p>
      }
      <p className="text-xs sm:text-sm font-semibold mt-2">
        Status:{' '}
        <span className={item.active ? 'text-green-600' : 'text-red-600'}>
          {item.active ? 'Active' : 'Inactive'}
        </span>
      </p>
    </div>
  );
}
