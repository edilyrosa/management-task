'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { Button } from '@mui/material';
import ProjectTable from './ProjectTable';
import ProjectForm from './ProjectForm';
import DeleteConfirmModal from '../components/DeleteConfirmModal'; // ✅ Modal genérico

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

export default function ProjectsList() {
  const { data, error, isLoading, mutate } = useSWR('/api/projects', fetcher);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [deleteProjectName, setDeleteProjectName] = useState('');

  const projects = Array.isArray(data) ? data : []; // 🔥 Asegurar que siempre sea un array

  if (error) return <p className="text-red-500">Error loading projects: {error.message}</p>;

  const openForm = (project = null) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleSave = async (projectData) => {
    const method = projectData.id ? 'PUT' : 'POST';
    const endpoint = projectData.id ? `/api/projects/${projectData.id}` : `/api/projects`;

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });

    await mutate(); // 🔥 Actualizar tabla inmediatamente
  };

  const confirmDelete = (id, name) => {
    setDeleteProjectId(id);
    setDeleteProjectName(name);
  };

  const handleDelete = async () => {
    if (!deleteProjectId) return;

    const res = await fetch(`/api/projects/${deleteProjectId}`, { method: 'DELETE' });

    if (res.ok) {
      await mutate(); // 🔥 Actualizar tabla inmediatamente
    }

    setDeleteProjectId(null); // 🔥 Cerrar el modal después de eliminar
    setDeleteProjectName('');
  };

  return (
    <div>
      <Button size='large' variant="contained" color="primary" onClick={() => openForm()} style={{ margin: '5px', marginLeft:'40%', width:'20%' }}>
        Add Project
      </Button>
      <ProjectTable projects={projects} isLoading={!data && !error} onEdit={openForm} onDelete={confirmDelete} />
      <ProjectForm open={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSave} projectData={editingProject} />
      <DeleteConfirmModal open={Boolean(deleteProjectId)} onClose={() => setDeleteProjectId(null)} onConfirm={handleDelete} itemName={deleteProjectName} />
    </div>
  );
}
