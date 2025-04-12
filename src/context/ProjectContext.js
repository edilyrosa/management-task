// src/context/ProjectContext.js
'use client';

import React, { createContext, useContext } from 'react';
import useSWR from 'swr';

const ProjectContext = createContext();
const fetcher = (url) => fetch(url).then(res => res.json());

export const ProjectProvider = ({ children }) => {
  const { data: projects, error, mutate } = useSWR('/api/projects', fetcher, {
    refreshInterval: 5000, // actualiza cada 5s
  });

  const saveProject = async (projectData) => {
    const method = projectData.id ? 'PUT' : 'POST';
    const endpoint = projectData.id ? `/api/projects/${projectData.id}` : `/api/projects`;

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });

    await mutate();
  };

  const deleteProject = async (id) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    await mutate();
  };

  return (
    <ProjectContext.Provider value={{ projects, saveProject, deleteProject, mutate }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
