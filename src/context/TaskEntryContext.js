'use client';

import React, { createContext, useContext } from 'react';
import useSWR from 'swr';

const TaskEntryContext = createContext();

const fetcher = (url) => fetch(url).then((res) => res.json());

export const TaskEntryProvider = ({ children }) => {
  const { data: taskEntries, error, mutate } = useSWR('/api/taskentries', fetcher, {
    refreshInterval: 5000, // 🔁 Auto-revalidación cada 5s
  });

  const saveTaskEntry = async (entryData) => {
    const method = entryData.id ? 'PUT' : 'POST';
    const endpoint = entryData.id ? `/api/taskentries/${entryData.id}` : `/api/taskentries`;

    const parsedData = {
      ...entryData,
      contractor_id: Number(entryData.contractor_id),
      project_id: Number(entryData.project_id),
      category_id: Number(entryData.category_id),
      duration: parseFloat(entryData.duration),
      date: new Date(entryData.date).toISOString(),
      billable: Boolean(entryData.billable),
    };

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Error saving task entry');
    }

    await mutate(); // 🔁 Refrescar después de guardar
  };

  const deleteTaskEntry = async (id) => {
    const res = await fetch(`/api/taskentries/${id}`, { method: 'DELETE' });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Error deleting task entry');
    }

    await mutate(); // 🔁 Refrescar después de eliminar
  };

  return (
    <TaskEntryContext.Provider value={{ taskEntries, mutate, saveTaskEntry, deleteTaskEntry }}>
      {children}
    </TaskEntryContext.Provider>
  );
};

export const useTaskEntries = () => useContext(TaskEntryContext);
