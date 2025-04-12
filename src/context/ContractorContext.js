'use client';

import React, { createContext, useContext } from 'react';
import useSWR from 'swr';

const ContractorContext = createContext();

const fetcher = (url) => fetch(url).then((res) => res.json());

export const ContractorProvider = ({ children }) => {
  const { data: contractors, error, mutate } = useSWR('/api/contractors', fetcher, {
    refreshInterval: 5000,
  });

  const saveContractor = async (contractorData) => {
    const method = contractorData.id ? 'PUT' : 'POST';
    const endpoint = contractorData.id ? `/api/contractors/${contractorData.id}` : `/api/contractors`;

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contractorData),
    });

    await mutate();
  };

  const deleteContractor = async (id) => {
    await fetch(`/api/contractors/${id}`, { method: 'DELETE' });
    await mutate();
  };

  return (
    <ContractorContext.Provider value={{ contractors, saveContractor, deleteContractor, mutate }}>
      {children}
    </ContractorContext.Provider>
  );
};

export const useContractors = () => useContext(ContractorContext);
