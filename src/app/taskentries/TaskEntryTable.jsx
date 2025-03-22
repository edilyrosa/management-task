// 'use client';

// import { useState, useEffect } from 'react';
// import { CircularProgress, TextField, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DetailCard from '../components/DetailCard';

// export default function TaskEntryTable({ taskEntries, onEdit, onDelete, isLoading }) {
//   const [contractorsMap, setContractorsMap] = useState({});
//   const [projectsMap, setProjectsMap] = useState({});
//   const [categoriesMap, setCategoriesMap] = useState({});
//   const [clientsMap, setClientsMap] = useState({});
//   const [searchQuery, setSearchQuery] = useState('');
//   const [hoveredTask, setHoveredTask] = useState(null);
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responses = await Promise.all([
//           fetch('/api/contractors'),
//           fetch('/api/projects'),
//           fetch('/api/categories'),
//           fetch('/api/clients')
//         ]);

//         const [contractorsRes, projectsRes, categoriesRes, clientsRes] = responses;

//         if (!contractorsRes.ok || !projectsRes.ok || !categoriesRes.ok || !clientsRes.ok) {
//           throw new Error('Failed to fetch reference data');
//         }

//         const [contractorsData, projectsData, categoriesData, clientsData] = await Promise.all([
//           contractorsRes.json(),
//           projectsRes.json(),
//           categoriesRes.json(),
//           clientsRes.json()
//         ]);

//         // 🔥 Validamos que cada respuesta sea un array antes de asignarlo
//         const contractors = Array.isArray(contractorsData) ? contractorsData : contractorsData.data || [];
//         const projects = Array.isArray(projectsData) ? projectsData : projectsData.data || [];
//         const categories = Array.isArray(categoriesData) ? categoriesData : categoriesData.data || [];
//         const clients = Array.isArray(clientsData) ? clientsData : clientsData.data || [];

//         // 🔥 Mapeamos correctamente los datos
//         setContractorsMap(Object.fromEntries(contractors.map(c => [c.id, c.fullname])));
//         setProjectsMap(Object.fromEntries(projects.map(p => [p.id, { name: p.name, client_id: p.client_id }])));
//         setCategoriesMap(Object.fromEntries(categories.map(cat => [cat.id, cat.description])));
//         setClientsMap(Object.fromEntries(clients.map(cl => [cl.id, cl.name])));
        
//       } catch (error) {
//         console.error('🚨 Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (isLoading || !taskEntries) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <CircularProgress size={80} style={{ color: '#d32f2f' }} />
//       </div>
//     );
//   }

//   if (taskEntries.length === 0) {
//     return <p className="text-gray-600 text-center mt-4">No task entries found.</p>;
//   }

//   const filteredTasks = taskEntries.filter((task) =>
//     Object.values(task).some(
//       (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   return (
//     <div className="p-5 w-full px-5 mx-auto relative">
//       <div className="mb-4">
//         <TextField fullWidth label="Search Tasks" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
//       </div>

//       <div className="w-full">
//         <table className="table w-full text-left text-gray-600 text-xs sm:text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3">Contractor</th>
//               <th className="px-6 py-3">Billable</th>
              
//               <th className="px-6 py-3 hidden md:table-cell">Project</th>
//               <th className="px-6 py-3 hidden md:table-cell">Client</th>
//               <th className="px-6 py-3 hidden md:table-cell">Category</th>
//               <th className="px-6 py-3 hidden sm:table-cell">Description</th>
//               <th className="px-6 py-3 hidden sm:table-cell">Date</th>
//               <th className="px-6 py-3 hidden sm:table-cell">Duration</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTasks.map((task) => (
//               <tr key={task.id} className="border-y border-gray-200 hover:bg-gray-50">
//                 {/* 🔥 Mostrando fullname del Contractor */}
//                 <td className="px-6 py-4">{contractorsMap[task.contractor_id] || 'Unknown'}</td>

//                 <td className="px-6 py-4">
//                   <span className={`px-2 py-1 rounded-md text-xs font-semibold ${task.billable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                     {task.billable ? 'Yes' : 'Not'}
//                   </span>
//                 </td>

//                 {/* 🔥 Mostrando name del Project */}
//                 <td className="px-6 py-4 hidden sm:table-cell">{projectsMap[task.project_id]?.name || 'Unknown'}</td>

//                 {/* 🔥 Mostrando name del Client (Nuevo campo) */}
//                 <td className="px-6 py-4 hidden md:table-cell">
//                   {clientsMap[projectsMap[task.project_id]?.client_id] || 'Unknown'}
//                 </td>

//                 {/* 🔥 Mostrando description de la Category */}
//                 <td className="px-6 py-4 hidden md:table-cell">{categoriesMap[task.category_id] || 'Unknown'}</td>

//                 {/* Descripción y Fecha */}
//                 <td className="px-6 py-4 hidden sm:table-cell">{task.description}</td>
//                 <td className="px-6 py-4 hidden sm:table-cell">
//                 {task.date
//                   ? new Date(task.date).toLocaleString('en-US', {
//                       month: '2-digit',
//                       day: '2-digit',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit',
//                       hour12: true,
//                     })
//                   : 'Unknown'
//                 }
//                 </td>
//                 <td className="px-6 py-4 hidden sm:table-cell">{Math.round(task.duration)} h.</td>
                
                
//                 {/* Botones de Acción */}
//                 <td className="px-6 py-4 flex gap-2">
//                   <IconButton onClick={() => onEdit(task)} sx={{ color: '#22c52d', '&:hover': { color: '#14532d' } }}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => onDelete(task.id, task.description)} sx={{ color: '#ef4444', '&:hover': { color: '#7f1d1d' } }}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔥 DetailCard solo en pantallas menores a lg */}
//       <div className="lg:hidden">
//         {hoveredTask && <DetailCard item={hoveredTask} position={position} />}
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { CircularProgress, TextField, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DetailCard from '../components/DetailCard';

// export default function TaskEntryTable({ taskEntries, onEdit, onDelete, isLoading }) {
//   const [contractorsMap, setContractorsMap] = useState({});
//   const [projectsMap, setProjectsMap] = useState({});
//   const [categoriesMap, setCategoriesMap] = useState({});
//   const [clientsMap, setClientsMap] = useState({});
//   const [searchQuery, setSearchQuery] = useState('');
//   const [hoveredTask, setHoveredTask] = useState(null);
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responses = await Promise.all([
//           fetch('/api/contractors'),
//           fetch('/api/projects'),
//           fetch('/api/categories'),
//           fetch('/api/clients')
//         ]);

//         const [contractorsRes, projectsRes, categoriesRes, clientsRes] = responses;

//         if (!contractorsRes.ok || !projectsRes.ok || !categoriesRes.ok || !clientsRes.ok) {
//           throw new Error('Failed to fetch reference data');
//         }

//         const [contractorsData, projectsData, categoriesData, clientsData] = await Promise.all([
//           contractorsRes.json(),
//           projectsRes.json(),
//           categoriesRes.json(),
//           clientsRes.json()
//         ]);

//         const contractors = Array.isArray(contractorsData) ? contractorsData : contractorsData.data || [];
//         const projects = Array.isArray(projectsData) ? projectsData : projectsData.data || [];
//         const categories = Array.isArray(categoriesData) ? categoriesData : categoriesData.data || [];
//         const clients = Array.isArray(clientsData) ? clientsData : clientsData.data || [];

//         setContractorsMap(Object.fromEntries(contractors.map(c => [c.id, c.fullname])));
//         setProjectsMap(Object.fromEntries(projects.map(p => [p.id, { name: p.name, client_id: p.client_id }])));
//         setCategoriesMap(Object.fromEntries(categories.map(cat => [cat.id, cat.description])));
//         setClientsMap(Object.fromEntries(clients.map(cl => [cl.id, cl.name])));
        
//       } catch (error) {
//         console.error('🚨 Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (isLoading || !taskEntries) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <CircularProgress size={80} style={{ color: '#d32f2f' }} />
//       </div>
//     );
//   }

//   if (taskEntries.length === 0) {
//     return <p className="text-gray-600 text-center mt-4">No task entries found.</p>;
//   }

//   const filteredTasks = taskEntries.filter((task) =>
//     Object.values(task).some(
//       (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   return (
//     <div className="p-5 w-full px-5 mx-auto relative">
//       <div className="mb-4">
//         <TextField fullWidth label="Search Tasks" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
//       </div>

//       <div className="w-full">
//         <table className="table w-full text-left text-gray-600 text-xs sm:text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3">Contractor</th>
//               <th className="px-6 py-3">Billable</th>
//               <th className="px-6 py-3 hidden md:table-cell">Project</th>
//               <th className="px-6 py-3 hidden md:table-cell">Client</th>
//               <th className="px-6 py-3 hidden md:table-cell">Category</th>
//               <th className="px-6 py-3 hidden sm:table-cell">Description</th>
//               <th className="px-6 py-3 hidden sm:table-cell">Date</th>
//               <th className="px-6 py-3 hidden sm:table-cell">Duration</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTasks.map((task) => (
//               <tr 
//                 key={task.id} 
//                 className="border-y border-gray-200 hover:bg-gray-50"
//                 onMouseEnter={(e) => {
//                   setHoveredTask(task);
//                   setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
//                 }}
//                 onMouseLeave={() => setHoveredTask(null)}
//               >
//                 <td className="px-6 py-4">{contractorsMap[task.contractor_id] || 'Unknown'}</td>

//                 {/* 🔥 Billable con colores dinámicos */}  
//                 <td className="px-6 py-4">
//                   <span className={`px-2 py-1 rounded-md text-xs font-semibold ${task.billable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                     {task.billable ? 'Yes' : 'Not'}
//                   </span>
//                 </td>

//                 <td className="px-6 py-4 hidden sm:table-cell">{projectsMap[task.project_id]?.name || 'Unknown'}</td>

//                 <td className="px-6 py-4 hidden md:table-cell">
//                   {clientsMap[projectsMap[task.project_id]?.client_id] || 'Unknown'}
//                 </td>

//                 <td className="px-6 py-4 hidden md:table-cell">{categoriesMap[task.category_id] || 'Unknown'}</td>

//                 <td className="px-6 py-4 hidden sm:table-cell">{task.description}</td>

//                 <td className="px-6 py-4 hidden sm:table-cell">
//                   {task.date
//                     ? new Date(task.date).toLocaleString('en-US', {
//                         month: '2-digit',
//                         day: '2-digit',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                         hour12: true,
//                       })
//                     : 'Unknown'
//                   }
//                 </td>

//                 <td className="px-6 py-4 hidden sm:table-cell">{Math.round(task.duration)} h.</td>

//                 <td className="px-6 py-4 flex gap-2">
//                   <IconButton onClick={() => onEdit(task)} sx={{ color: '#22c52d', '&:hover': { color: '#14532d' } }}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => onDelete(task.id, task.description)} sx={{ color: '#ef4444', '&:hover': { color: '#7f1d1d' } }}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔥 DetailCard solo en pantallas menores a lg */}  
//       <div className="lg:hidden">
//         {hoveredTask && <DetailCard item={hoveredTask} position={position} />}
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { CircularProgress, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailCard from '../components/DetailCard';

export default function TaskEntryTable({ taskEntries, onEdit, onDelete, isLoading }) {
  const [contractorsMap, setContractorsMap] = useState({});
  const [projectsMap, setProjectsMap] = useState({});
  const [categoriesMap, setCategoriesMap] = useState({});
  const [clientsMap, setClientsMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredTask, setHoveredTask] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('/api/contractors'),
          fetch('/api/projects'),
          fetch('/api/categories'),
          fetch('/api/clients')
        ]);

        const [contractorsRes, projectsRes, categoriesRes, clientsRes] = responses;

        if (!contractorsRes.ok || !projectsRes.ok || !categoriesRes.ok || !clientsRes.ok) {
          throw new Error('Failed to fetch reference data');
        }

        const [contractorsData, projectsData, categoriesData, clientsData] = await Promise.all([
          contractorsRes.json(),
          projectsRes.json(),
          categoriesRes.json(),
          clientsRes.json()
        ]);

        const contractors = Array.isArray(contractorsData) ? contractorsData : contractorsData.data || [];
        const projects = Array.isArray(projectsData) ? projectsData : projectsData.data || [];
        const categories = Array.isArray(categoriesData) ? categoriesData : categoriesData.data || [];
        const clients = Array.isArray(clientsData) ? clientsData : clientsData.data || [];

        setContractorsMap(Object.fromEntries(contractors.map(c => [c.id, c.fullname])));
        setProjectsMap(Object.fromEntries(projects.map(p => [p.id, { name: p.name, client_id: p.client_id }])));
        setCategoriesMap(Object.fromEntries(categories.map(cat => [cat.id, cat.description])));
        setClientsMap(Object.fromEntries(clients.map(cl => [cl.id, cl.name])));
        
      } catch (error) {
        console.error('🚨 Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !taskEntries) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress size={80} style={{ color: '#d32f2f' }} />
      </div>
    );
  }

  if (taskEntries.length === 0) {
    return <p className="text-gray-600 text-center mt-4">No task entries found.</p>;
  }

  // const filteredTasks = taskEntries.filter((task) =>
  //   Object.values(task).some(
  //     (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );

  const filteredTasks = taskEntries.filter((task) =>
    Object.values({
      contractor: contractorsMap[task.contractor_id],  
      billable: task.billable ? 'Yes' : 'Not',  
      project: projectsMap[task.project_id]?.name,  
      client: clientsMap[projectsMap[task.project_id]?.client_id],  
      category: categoriesMap[task.category_id],  
      description: task.description,  
      date: task.date,
      duration: task.duration
    }).some(value => String(value || '').toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-5 w-full px-5 mx-auto relative">
      <div className="mb-4">
        <TextField fullWidth label="Search Tasks" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table w-full text-left text-gray-600 text-xs sm:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Contractor</th>
              <th className="px-6 py-3">Billable</th>
              <th className="px-6 py-3 hidden sm:table-cell">Project</th>
              <th className="px-6 py-3 hidden md:table-cell">Client</th>
              <th className="px-6 py-3 hidden md:table-cell">Category</th>
              <th className="px-6 py-3 hidden lg:table-cell">Description</th>
              <th className="px-6 py-3 hidden lg:table-cell">Date</th>
              <th className="px-6 py-3 hidden xl:table-cell">Duration</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr 
                key={task.id} 
                className="border-y border-gray-200 hover:bg-gray-50"
                onMouseEnter={(e) => {
                  setHoveredTask(task);
                  setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
                }}
                onMouseLeave={() => setHoveredTask(null)}
              >
                <td className="px-6 py-4">{contractorsMap[task.contractor_id] || 'Unknown'}</td>

                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${task.billable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {task.billable ? 'Yes' : 'Not'}
                  </span>
                </td>

                <td className="px-6 py-4 hidden sm:table-cell">{projectsMap[task.project_id]?.name || 'Unknown'}</td>

                <td className="px-6 py-4 hidden md:table-cell">
                  {clientsMap[projectsMap[task.project_id]?.client_id] || 'Unknown'}
                </td>

                <td className="px-6 py-4 hidden md:table-cell">{categoriesMap[task.category_id] || 'Unknown'}</td>

                <td className="px-6 py-4 hidden lg:table-cell">{task.description}</td>

                <td className="px-6 py-4 hidden lg:table-cell">
                  {task.date
                    ? new Date(task.date).toLocaleString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                    : 'Unknown'
                  }
                </td>

                <td className="px-6 py-4 hidden xl:table-cell">{Math.round(task.duration)} h.</td>

                <td className="px-6 py-4 flex gap-2">
                  <IconButton onClick={() => onEdit(task)} sx={{ color: '#22c52d', '&:hover': { color: '#14532d' } }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(task.id, task.description)} sx={{ color: '#ef4444', '&:hover': { color: '#7f1d1d' } }}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 DetailCard solo en pantallas menores a lg */}  
      <div className="lg:hidden">
        {hoveredTask && <DetailCard item={hoveredTask} position={position} />}
      </div>
    </div>
  );
}
