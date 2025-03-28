

// 'use client';

// import { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from '@mui/material';

// export default function ProjectForm({ open, onClose, onSave, projectData }) {
//   const [formData, setFormData] = useState({
//     id: null,
//     name: '',
//     client_id: '',
//     description: '',
//     active: true,
//   });

//   const [clients, setClients] = useState([]); // Lista de clientes

//   useEffect(() => {
//     if (projectData) {
//       setFormData(projectData);
//     } else {
//       setFormData({
//         id: null,
//         name: '',
//         client_id: '',
//         description: '',
//         active: true,
//       });
//     }
//   }, [projectData]);

//   // 🚀 Obtener clientes desde la API al abrir el formulario
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await fetch('/api/clients');
//         if (!res.ok) throw new Error('Failed to fetch clients');
//         const data = await res.json();
//         setClients(data); // Guardamos los clientes en el estado
//       } catch (error) {
//         console.error('Error fetching clients:', error);
//       }
//     };

//     if (open) fetchClients(); // Solo se ejecuta cuando el modal está abierto
//   }, [open]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleStatusChange = (e) => {
//     setFormData({ ...formData, active: e.target.value === 'true' });
//   };

//   const handleSubmit = () => {
//     onSave(formData);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>{formData.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
//       <DialogContent>
//         <TextField fullWidth label="Project Name" name="name" value={formData.name} onChange={handleChange} margin="dense" required />
//         <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="dense" multiline rows={3} />

//         {/* 🚀 Select para Clientes */}
//         <FormControl fullWidth margin="dense">
//           <FormLabel>Client</FormLabel>
//           <Select name="client_id" value={formData.client_id} onChange={handleChange} required>
//             {clients.map((client) => (
//               <MenuItem key={client.id} value={client.id}>
//                 {client.name} - {client.id}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Status (Activo / Inactivo) */}
//         <FormControl margin="dense">
//           <FormLabel>Status</FormLabel>
//           <RadioGroup row name="active" value={String(formData.active)} onChange={handleStatusChange}>
//             <FormControlLabel value="true" control={<Radio />} label="Active" />
//             <FormControlLabel value="false" control={<Radio />} label="Inactive" />
//           </RadioGroup>
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary">Cancel</Button>
//         <Button onClick={handleSubmit} color="primary">{formData.id ? 'Update' : 'Save'}</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }



'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, CircularProgress } from '@mui/material';

export default function ProjectForm({ open, onClose, onSave, projectData }) {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    client_id: '',
    description: '',
    active: true,
  });
  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (projectData) {
      setFormData(projectData);
    } else {
      setFormData({
        id: null,
        name: '',
        client_id: '',
        description: '',
        active: true,
      });
    }
    setErrors({});
  }, [projectData]);

  useEffect(() => {
    const fetchClients = async () => {
      if (!open) return;
      try {
        const res = await fetch('/api/clients');
        if (!res.ok) throw new Error('Failed to fetch clients');
        const data = await res.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setErrors(prev => ({ ...prev, clients: 'Failed to load clients. Please try again.' }));
      }
    };

    fetchClients();
  }, [open]);

  const validateInput = (name, value) => {
    if (!value || !value.toString().trim()) {
      setErrors(prev => ({ ...prev, [name]: 'This field is required' }));
      return false;
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const handleStatusChange = (e) => {
    setFormData(prev => ({ ...prev, active: e.target.value === 'true' }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const newErrors = {};
    ['name', 'client_id'].forEach(field => {
      if (!validateInput(field, formData[field])) {
        newErrors[field] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving project:", error);
      setErrors(prev => ({ ...prev, submit: 'Error saving project. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{formData.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
      <DialogContent>
        <TextField 
          fullWidth 
          label="Project Name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          margin="dense" 
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField 
          fullWidth 
          label="Description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          margin="dense" 
          multiline 
          rows={3}
        />

        <FormControl fullWidth margin="dense" error={!!errors.client_id}>
          <FormLabel>Client</FormLabel>
          <Select 
            name="client_id" 
            value={formData.client_id} 
            onChange={handleChange} 
            required
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name} - {client.id}
              </MenuItem>
            ))}
          </Select>
          {errors.client_id && <span style={{ color: 'red', fontSize: '0.75rem' }}>{errors.client_id}</span>}
        </FormControl>

        <FormControl margin="dense">
          <FormLabel>Status</FormLabel>
          <RadioGroup row name="active" value={String(formData.active)} onChange={handleStatusChange}>
            <FormControlLabel value="true" control={<Radio />} label="Active" />
            <FormControlLabel value="false" control={<Radio />} label="Inactive" />
          </RadioGroup>
        </FormControl>

        {errors.submit && (
          <p style={{ color: 'red', marginTop: '10px' }}>{errors.submit}</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isSubmitting}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : (formData.id ? 'Update' : 'Save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
