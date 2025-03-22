// 'use client';

// import { useState } from 'react';
// import { CircularProgress, TextField, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ClientCard from './ClientCard';

// export default function ClientTable({ clients, onEdit, onDelete, isLoading }) {
//   const [hoveredClient, setHoveredClient] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   if (isLoading || !clients) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <CircularProgress size={80} style={{ color: '#d32f2f' }} />
//       </div>
//     );
//   }

//   if (clients.length === 0) {
//     return <p className="text-gray-600 text-center mt-4">No clients found.</p>;
//   }

//   const filteredClients = clients.filter((client) =>
//     Object.values(client).some(
//       (value) =>
//         typeof value === 'string' &&
//         value.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   return (
//     <div className="p-5 w-full px-5 mx-auto relative">
//       <div className="mb-4">
//         <TextField
//           fullWidth
//           label="Search Clients"
//           variant="outlined"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       <div className="w-full">
//         <table className="table w-full text-left text-gray-600 text-xs sm:text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3">Client's Name</th>
//               <th className="px-6 py-3">Status</th>
//               <th className="px-6 py-3">Industry Code</th>
//               <th className="px-6 py-3 hidden md:table-cell">City</th>
//               <th className="px-6 py-3 hidden md:table-cell">Country</th>
//               <th className="px-6 py-3 hidden lg:table-cell">State</th>
//               <th className="px-6 py-3 hidden lg:table-cell">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredClients.map((client) => (
//               <tr
//                 key={client.id}
//                 className="border-y border-gray-200 hover:bg-gray-50"
//                 onMouseEnter={() => setHoveredClient(client)}
//                 onMouseLeave={() => setHoveredClient(null)}
//               >
//                 <td className="px-6 py-4">{client.name}</td>
//                 <td className="px-6 py-4">
//                   <span className={`px-2 py-1 rounded-md text-xs font-semibold ${client.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                     {client.active ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">{client.industry_codes}</td>
//                 <td className="px-6 py-4 hidden md:table-cell">{client.city}</td>
//                 <td className="px-6 py-4 hidden md:table-cell">{client.country}</td>
//                 <td className="px-6 py-4 hidden lg:table-cell">{client.state}</td>
//                 <td className="px-6 py-4 hidden lg:table-cell flex gap-2">
//                   <IconButton onClick={() => onEdit(client)} 
//                      sx={{ color: '#22c52d', '&:hover': { color: '#14532d' } }}
//                     >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => onDelete(client.id, client.name)} 
//                   sx={{ color: '#ef4444', '&:hover': { color: '#7f1d1d' } }} >
//                     <DeleteIcon />
//                   </IconButton>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//        {/* ClientCard al hacer hover en pantallas pequeñas */}
//        {hoveredClient && <ClientCard client={hoveredClient} />}
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { CircularProgress, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailCard from '../components/DetailCard';
export default function ClientTable({ clients, onEdit, onDelete, isLoading }) {
  const [hoveredClient, setHoveredClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (isLoading || !clients) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress size={80} style={{ color: '#d32f2f' }} />
      </div>
    );
  }

  if (clients.length === 0) {
    return <p className="text-gray-600 text-center mt-4">No clients found.</p>;
  }

  // const filteredClients = clients.filter((client) =>
  //   Object.values(client).some(
  //     (value) =>
  //       typeof value === 'string' &&
  //       value.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );

  const filteredClients = clients.filter((client) => {
    const statusText = client.active ? 'Active' : 'Inactive';
  
    return [client.name, statusText, client.industry_codes, client.city, client.country, client.state]
      .some(value => String(value || '').toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="p-5 w-full px-5 mx-auto relative">
      <div className="mb-4">
        <TextField
          fullWidth
          label="Search Clients"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-full">
        <table className="table w-full text-left text-gray-600 text-xs sm:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Client's Name</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 hidden md:table-cell">Industry Code</th>
              <th className="px-6 py-3 hidden md:table-cell">City</th>
              <th className="px-6 py-3 hidden md:table-cell">Country</th>
              <th className="px-6 py-3 hidden lg:table-cell">State</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="border-y border-gray-200 hover:bg-gray-50"
                onMouseEnter={() => {
                  setHoveredClient(client)
                  setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
                }}
                onMouseLeave={() => setHoveredClient(null)}
              >
                <td className="px-6 py-4">{client.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${client.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {client.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">{client.industry_codes}</td>
                
                <td className="px-6 py-4 hidden md:table-cell">{client.city}</td>
                <td className="px-6 py-4 hidden md:table-cell">{client.country}</td>
                <td className="px-6 py-4 hidden lg:table-cell">{client.state}</td>
                <td className="px-6 py-4 flex gap-2">
                  <IconButton onClick={() => onEdit(client)} sx={{ color: '#22c52d', '&:hover': { color: '#14532d' } }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(client.id, client.name)} sx={{ color: '#ef4444', '&:hover': { color: '#7f1d1d' } }}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 ClientCard solo en pantallas menores a lg */}
      <div className="lg:hidden">
        {hoveredClient && <DetailCard item={hoveredClient} position={position}  />}
      </div>
    </div>
  );
}
