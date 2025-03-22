



// 'use client';

// import useSWR from 'swr';
// import { useState } from 'react';
// import { Button } from '@mui/material';
// import TaskEntryTable from './TaskEntryTable';
// import TaskEntryForm from './TaskEntryForm';
// import DeleteConfirmModal from '../components/DeleteConfirmModal';

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   if (!res.ok) {
//     const error = new Error('Error en la solicitud');
//     error.info = await res.json();
//     error.status = res.status;
//     throw error;
//   }
//   return res.json();
// };

// export default function Page() {
//   const { data, error, isLoading, mutate } = useSWR('/api/taskentries', fetcher);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingTaskEntry, setEditingTaskEntry] = useState(null);
//   const [deleteTaskEntryId, setDeleteTaskEntryId] = useState(null);
//   const [deleteTaskEntryName, setDeleteTaskEntryName] = useState('');

//   const taskEntries = Array.isArray(data) ? data : [];

//   if (error) return <p className="text-red-500">Error loading task entries: {error.message}</p>;

//   const openForm = (taskEntry = null) => {
//     setEditingTaskEntry(taskEntry);
//     setIsFormOpen(true);
//   };

//   const handleSave = async (taskEntryData) => {
//     try {
//       // Conversión de tipos de datos
//       const parsedData = {
//         ...taskEntryData,
//         contractor_id: Number(taskEntryData.contractor_id),
//         project_id: Number(taskEntryData.project_id),
//         category_id: Number(taskEntryData.category_id),
//         duration: parseFloat(taskEntryData.duration),
//         date: new Date(taskEntryData.date).toISOString(),
//         billable: Boolean(taskEntryData.billable)
//       };

//       console.log('Datos enviados:', parsedData); // Log temporal para depuración

//       const method = parsedData.id ? 'PUT' : 'POST';
//       const endpoint = parsedData.id ? `/api/taskentries/${parsedData.id}` : '/api/taskentries';

//       const response = await fetch(endpoint, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(parsedData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Error saving task entry');
//       }

//       await mutate();
//       setIsFormOpen(false);
//       setEditingTaskEntry(null);

//     } catch (error) {
//       console.error('Error saving task entry:', error);
//       alert(error.message || 'Error al guardar la entrada');
//     }
//   };

//   const confirmDelete = (id, description) => {
//     setDeleteTaskEntryId(id);
//     setDeleteTaskEntryName(description);
//   };

//   const handleDelete = async () => {
//     if (!deleteTaskEntryId) return;

//     try {
//       const res = await fetch(`/api/taskentries/${deleteTaskEntryId}`, { method: 'DELETE' });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || 'Error deleting task entry');
//       }

//       await mutate();
//       setDeleteTaskEntryId(null);
//       setDeleteTaskEntryName('');
//     } catch (error) {
//       console.error('Error deleting task entry:', error);
//       alert(error.message || 'Error al eliminar la entrada');
//     }
//   };

//   return (
//     <div>
//       <Button size='large' variant="contained" color="primary" onClick={() => openForm()} style={{ margin: '5px', marginLeft:'40%', width:'20%' }}>
//         Add Task Entry
//       </Button>
//       <TaskEntryTable taskEntries={taskEntries} isLoading={!data && !error} onEdit={openForm} onDelete={confirmDelete} />
//       <TaskEntryForm open={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSave} taskEntryData={editingTaskEntry} />
//       <DeleteConfirmModal open={Boolean(deleteTaskEntryId)} onClose={() => setDeleteTaskEntryId(null)} onConfirm={handleDelete} itemName={deleteTaskEntryName} />
//     </div>
//   );
// }







// 'use client';

// import useSWR from 'swr';
// import { useState } from 'react';
// import { Button } from '@mui/material';
// import TaskEntryTable from './TaskEntryTable';
// import TaskEntryForm from './TaskEntryForm';
// import DeleteConfirmModal from '../components/DeleteConfirmModal';

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   if (!res.ok) {
//     const error = new Error('Error en la solicitud');
//     error.info = await res.json();
//     error.status = res.status;
//     throw error;
//   }
//   return res.json();
// };

// export default function Page() {
//   const { data, error, isLoading, mutate } = useSWR('/api/taskentries', fetcher);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingTaskEntry, setEditingTaskEntry] = useState(null);
//   const [deleteTaskEntryId, setDeleteTaskEntryId] = useState(null);
//   const [deleteTaskEntryName, setDeleteTaskEntryName] = useState('');

//   const taskEntries = Array.isArray(data) ? data : [];

//   if (error) return <p className="text-red-500">Error loading task entries: {error.message}</p>;

//   const openForm = (taskEntry = null) => {
//     setEditingTaskEntry(taskEntry);
//     setIsFormOpen(true);
//   };

//   const handleSave = async (taskEntryData) => {
//     try {
//       // Convertir y limpiar los datos antes de enviarlos al backend
//       const parsedData = {
//         ...taskEntryData,
//         contractor_id: Number(taskEntryData.contractor_id),
//         project_id: Number(taskEntryData.project_id),
//         category_id: Number(taskEntryData.category_id),
//         duration: parseFloat(taskEntryData.duration),
//         date: new Date(taskEntryData.date).toISOString(),
//         billable: Boolean(taskEntryData.billable),
//       };

//       console.log('Datos enviados al backend:', parsedData); // Log para depuración

//       const method = parsedData.id ? 'PUT' : 'POST';
//       const endpoint = parsedData.id ? `/api/taskentries/${parsedData.id}` : '/api/taskentries';

//       const response = await fetch(endpoint, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(parsedData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Error saving task entry');
//       }

//       await mutate();
//       setIsFormOpen(false);
//       setEditingTaskEntry(null);

//     } catch (error) {
//       console.error('Error saving task entry:', error);
//       alert(error.message || 'Error al guardar la entrada');
//     }
//   };

//   const confirmDelete = (id, description) => {
//     setDeleteTaskEntryId(id);
//     setDeleteTaskEntryName(description);
//   };

//   const handleDelete = async () => {
//     if (!deleteTaskEntryId) return;

//     try {
//       const res = await fetch(`/api/taskentries/${deleteTaskEntryId}`, { method: 'DELETE' });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || 'Error deleting task entry');
//       }

//       await mutate();
//       setDeleteTaskEntryId(null);
//       setDeleteTaskEntryName('');
//     } catch (error) {
//       console.error('Error deleting task entry:', error);
//       alert(error.message || 'Error al eliminar la entrada');
//     }
//   };

//   return (
//     <div>
//       <Button size='large' variant="contained" color="primary" onClick={() => openForm()} style={{ margin: '5px', marginLeft:'40%', width:'20%' }}>
//         Add Task Entry
//       </Button>
//       <TaskEntryTable taskEntries={taskEntries} isLoading={!data && !error} onEdit={openForm} onDelete={confirmDelete} />
//       <TaskEntryForm open={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSave} taskEntryData={editingTaskEntry} />
//       <DeleteConfirmModal open={Boolean(deleteTaskEntryId)} onClose={() => setDeleteTaskEntryId(null)} onConfirm={handleDelete} itemName={deleteTaskEntryName} />
//     </div>
//   );
// }



'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { Button } from '@mui/material';
import TaskEntryTable from './TaskEntryTable';
import TaskEntryForm from './TaskEntryForm';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

// Fetcher para SWR
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('Error en la solicitud');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function Page() {
  const { data, error, isValidating, mutate } = useSWR('/api/taskentries', fetcher);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTaskEntry, setEditingTaskEntry] = useState(null);
  const [deleteTaskEntryId, setDeleteTaskEntryId] = useState(null);
  const [deleteTaskEntryName, setDeleteTaskEntryName] = useState('');

  const taskEntries = Array.isArray(data) ? data : [];

  if (error) return <p className="text-red-500">Error loading task entries: {error.message}</p>;

  const openForm = (taskEntry = null) => {
    setEditingTaskEntry(taskEntry);
    setIsFormOpen(true);
  };

  const handleSave = async (taskEntryData) => {
    try {
      // Convertir datos con validaciones previas
      const parsedData = {
        ...taskEntryData,
        contractor_id: taskEntryData.contractor_id ? Number(taskEntryData.contractor_id) : null,
        project_id: taskEntryData.project_id ? Number(taskEntryData.project_id) : null,
        category_id: taskEntryData.category_id ? Number(taskEntryData.category_id) : null,
        duration: taskEntryData.duration ? parseFloat(taskEntryData.duration) : 0,
        date: taskEntryData.date ? new Date(taskEntryData.date).toISOString() : null,
        billable: Boolean(taskEntryData.billable),
      };

      console.log('📤 Datos enviados al backend:', parsedData);

      const method = parsedData.id ? 'PUT' : 'POST';
      const endpoint = parsedData.id ? `/api/taskentries/${parsedData.id}` : '/api/taskentries';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error saving task entry');
      }

      await mutate(); // 🔄 Recargar datos
      setIsFormOpen(false);
      setEditingTaskEntry(null);

    } catch (error) {
      console.error('❌ Error saving task entry:', error);
      alert(error.message || 'Error al guardar la entrada');
    }
  };

  const confirmDelete = (id, description) => {
    setDeleteTaskEntryId(id);
    setDeleteTaskEntryName(description);
  };

  const handleDelete = async () => {
    if (!deleteTaskEntryId) return;

    try {
      const res = await fetch(`/api/taskentries/${deleteTaskEntryId}`, { method: 'DELETE' });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error deleting task entry');
      }

      await mutate(); // 🔄 Recargar datos
      setDeleteTaskEntryId(null);
      setDeleteTaskEntryName('');
    } catch (error) {
      console.error('❌ Error deleting task entry:', error);
      alert(error.message || 'Error al eliminar la entrada');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <Button 
        size='large' 
        variant="contained" 
        color="primary" 
        onClick={() => openForm()} 
        style={{width:'50%' }}
      >
        Add Task Entry
      </Button>

      <TaskEntryTable 
        taskEntries={taskEntries} 
        isLoading={!data && !error} 
        onEdit={openForm} 
        onDelete={confirmDelete} 
      />

      <TaskEntryForm 
        open={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSave} 
        taskEntryData={editingTaskEntry} 
      />

      <DeleteConfirmModal 
        open={Boolean(deleteTaskEntryId)} 
        onClose={() => setDeleteTaskEntryId(null)} 
        onConfirm={handleDelete} 
        itemName={deleteTaskEntryName} 
      />
    </div>
  );
}
