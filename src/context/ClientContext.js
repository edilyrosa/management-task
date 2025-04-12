'use client';

import React, { createContext, useContext } from 'react';
import useSWR from 'swr';

const ClientContext = createContext();

const fetcher = (url) => fetch(url).then((res) => res.json());

export const ClientProvider = ({ children }) => {
  const { data: clients, error, mutate } = useSWR('/api/clients', fetcher);

  return (
    <ClientContext.Provider value={{ clients, mutate }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => useContext(ClientContext);
