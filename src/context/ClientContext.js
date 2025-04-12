'use client';

import React, { createContext, useContext } from 'react';
import useSWR from 'swr';

const ClientContext = createContext();

const fetcher = (url) => fetch(url).then((res) => res.json());

// export const ClientProvider = ({ children }) => {
//   const { data: clients, error, mutate } = useSWR('/api/clients', fetcher);

//   return (
//     <ClientContext.Provider value={{ clients, mutate }}>
//       {children}
//     </ClientContext.Provider>
//   );
// };

// context/ClientContext.js

export const ClientProvider = ({ children }) => {
  
  //const { data: clients, error, mutate } = useSWR('/api/clients', fetcher);
  const { data: clients, error, mutate } = useSWR('/api/clients', fetcher, {
    refreshInterval: 5000, // cada 5 segundos
  });
  const saveClient = async (clientData) => {
    const method = clientData.id ? 'PUT' : 'POST';
    const endpoint = clientData.id ? `/api/clients/${clientData.id}` : `/api/clients`;

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
    });

    await mutate();
  };

  const deleteClient = async (id) => {
    await fetch(`/api/clients/${id}`, { method: 'DELETE' });
    await mutate();
  };

  return (
    <ClientContext.Provider value={{ clients, saveClient, deleteClient, mutate }}>
      {children}
    </ClientContext.Provider>
  );
};


export const useClients = () => useContext(ClientContext);
