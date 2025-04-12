// 'use client';

// import useSWR from 'swr';
// import { useState } from 'react';
// import { Button } from '@mui/material';
// import ClientTable from './ClientTable';
// import ClientForm from './ClientForm';
// import DeleteConfirmModal from '../components/DeleteConfirmModal'; // ✅ Usamos el modal genérico


// const fetcher = async (url) => {
//   const res = await fetch(url);
//   if (!res.ok) throw new Error(`API error: ${res.status}`);
//   return res.json();
// };

// export default function ClientsList() {
//   const { data, error, isLoading, mutate } = useSWR('/api/clients', fetcher);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingClient, setEditingClient] = useState(null);
//   const [deleteClientId, setDeleteClientId] = useState(null);
//   const [deleteClientName, setDeleteClientName] = useState('');

//   const clients = Array.isArray(data) ? data : []; 

//   if (error) return <p className="text-red-500">Error loading clients: {error.message}</p>;

//   const openForm = (client = null) => {
//     setEditingClient(client);
//     setIsFormOpen(true);
//   };

//   const handleSave = async (clientData) => {
//     const method = clientData.id ? 'PUT' : 'POST';
//     const endpoint = clientData.id ? `/api/clients/${clientData.id}` : `/api/clients`;

//     await fetch(endpoint, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(clientData),
//     });

//     await mutate(); // 🔥 Forzar actualización inmediata
//   };

//   const confirmDelete = (id, name) => {
//     setDeleteClientId(id);
//     setDeleteClientName(name);
//   };

//   const handleDelete = async () => {
//     if (!deleteClientId) return;

//     const res = await fetch(`/api/clients/${deleteClientId}`, { method: 'DELETE' });

//     if (res.ok) {
//       await mutate(); // 🔥 Forzar actualización inmediata
//     }

//     setDeleteClientId(null); // 🔥 Cerrar el modal después de eliminar
//     setDeleteClientName('');
//   };

//   return (
//     <div className='flex flex-col items-center justify-center p-4'>
//       <Button size='large' variant="contained" color="primary" onClick={() => openForm()} style={{width:'50%' }}>
//         Add Client
//       </Button>
//       <ClientTable clients={clients} isLoading={!data && !error} onEdit={openForm} onDelete={confirmDelete} />
//       <ClientForm open={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSave} clientData={editingClient} />
//       <DeleteConfirmModal open={Boolean(deleteClientId)} onClose={() => setDeleteClientId(null)} onConfirm={handleDelete} itemName={deleteClientName} />
//     </div>
//   );
// }





'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import ClientTable from './ClientTable';
import ClientForm from './ClientForm';
import DeleteConfirmModal from '../components/DeleteConfirmModal'; // ✅ Usamos el modal genérico
import { useClients } from '../../context/ClientContext';

export default function ClientsList() {
  const { clients, mutate } = useClients();
  const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
  const [deleteClientId, setDeleteClientId] = useState(null);
  const [deleteClientName, setDeleteClientName] = useState('');

  //const clients = Array.isArray(data) ? data : []; // 🔥 Asegurar que siempre sea un array

  if (!clients) return <p className="text-red-500">Loading clients...</p>;

  const openForm = (client = null) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleSave = async (clientData) => {
    const method = clientData.id ? 'PUT' : 'POST';
    const endpoint = clientData.id ? `/api/clients/${clientData.id}` : `/api/clients`;

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
    });

    await mutate(); // 🔥 Forzar actualización inmediata
  };

  const confirmDelete = (id, name) => {
    setDeleteClientId(id);
    setDeleteClientName(name);
  };

  const handleDelete = async () => {
    if (!deleteClientId) return;

    const res = await fetch(`/api/clients/${deleteClientId}`, { method: 'DELETE' });

    if (res.ok) {
      await mutate(); // 🔥 Forzar actualización inmediata
    }

    setDeleteClientId(null); // 🔥 Cerrar el modal después de eliminar
    setDeleteClientName('');
  };

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <Button size='large' variant="contained" color="primary" onClick={() => openForm()} style={{width:'50%' }}>
        Add Client
      </Button>
      <ClientTable clients={clients} isLoading={!clients} onEdit={openForm} onDelete={confirmDelete} />
      <ClientForm open={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSave} clientData={editingClient} />
      <DeleteConfirmModal open={Boolean(deleteClientId)} onClose={() => setDeleteClientId(null)} onConfirm={handleDelete} itemName={deleteClientName} />
    </div>
  );
}

