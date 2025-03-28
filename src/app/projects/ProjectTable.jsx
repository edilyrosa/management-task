

'use client';

import { useState, useEffect } from 'react';
import { CircularProgress, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailCard from '../components/DetailCard'; // 🔥 Importamos DetailCard
import TableSkeleton from '../components/TableSkeleton';

export default function ProjectTable({ projects, onEdit, onDelete, isLoading }) {
  const [clientsMap, setClientsMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients');
        if (!res.ok) throw new Error('Failed to fetch clients');
        const data = await res.json();
        const clientMap = {};
        data.forEach((client) => {
          clientMap[client.id] = client.name;
        });
        setClientsMap(clientMap);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  if (isLoading || !projects) {
    return (
      // <div className="flex justify-center items-center h-64">
      //   <CircularProgress size={80} style={{ color: '#d32f2f' }} />
      // </div>
      <TableSkeleton/>
    );
  }

  if (projects.length === 0) {
    return <p className="text-gray-600 text-center mt-4">No projects found.</p>;
  }

  const filteredProjects = projects.filter((project) => {
    const clientName = clientsMap[project.client_id] || 'Unknown';
    const statusText = project.active ? 'Active' : 'Inactive';
  
    return [project.name, statusText, clientName, project.description]
      .some(value => String(value || '').toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="p-5 w-full px-5 mx-auto relative">
      <div className="mb-4">
        <TextField fullWidth label="Search Projects" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="w-full flex flex-col items-center flex-shrink-0 min-w-0">
        <table className="table w-full text-left text-gray-600 text-xs sm:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Project Name</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 hidden md:table-cell">Client</th>
              <th className="px-6 py-3 hidden md:table-cell">Description</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr
                key={project.id}
                className="border-y border-gray-200 hover:bg-gray-50"
                onMouseEnter={(e) => {
                  setHoveredProject(project);
                  setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
                }}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <td className="px-6 py-4">{project.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${project.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {project.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                
                <td className="px-6 py-4 hidden sm:table-cell">{clientsMap[project.client_id] || 'Unknown'} - {project.client_id}</td>
                <td className="px-6 py-4 hidden md:table-cell">{project.description}</td>
                
                <td className="px-6 py-4 flex gap-2">
                  <IconButton onClick={() => onEdit(project)} sx={{ color: '#22c52d', '&:hover': { color: '#14532d' } }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(project.id, project.name)} sx={{ color: '#ef4444', '&:hover': { color: '#7f1d1d' } }}>
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
        {hoveredProject && <DetailCard item={hoveredProject} position={position} />}
      </div>
    </div>
  );
}
