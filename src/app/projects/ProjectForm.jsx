// // 'use client';
// // import { useState, useEffect } from 'react';
// // import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControlLabel, Switch } from '@mui/material';

// // export default function ProjectForm({ open, onClose, onSave, projectData }) {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     client_id: '',
// //     description: '',
// //     active: true,
// //   });

// //   useEffect(() => {
// //     if (projectData) {
// //       setFormData({
// //         name: projectData.name || '',
// //         client_id: projectData.client_id || '',
// //         description: projectData.description || '',
// //         active: projectData.active ?? true,
// //       });
// //     } else {
// //       setFormData({
// //         name: '',
// //         client_id: '',
// //         description: '',
// //         active: true,
// //       });
// //     }
// //   }, [projectData]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleToggleActive = () => {
// //     setFormData((prev) => ({ ...prev, active: !prev.active }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     await onSave(formData);
// //     onClose(); // Cerrar el modal después de guardar
// //   };

// //   return (
// //     <Dialog open={open} onClose={onClose}>
// //       <DialogTitle>{projectData ? 'Edit Project' : 'New Project'}</DialogTitle>
// //       <DialogContent>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <TextField fullWidth label="Project Name" name="name" value={formData.name} onChange={handleChange} required />
// //           <TextField fullWidth label="Client ID" name="client_id" value={formData.client_id} onChange={handleChange} required type="number" />
// //           <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} />
// //           <FormControlLabel control={<Switch checked={formData.active} onChange={handleToggleActive} />} label="Active" />
// //         </form>
// //       </DialogContent>
// //       <DialogActions>
// //         <Button onClick={onClose} color="primary" variant="outlined">
// //           Cancel
// //         </Button>
// //         <Button onClick={handleSubmit} color="primary" variant="contained">
// //           Save
// //         </Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // }


// 'use client';

// import { useState, useEffect } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControlLabel, Switch, CircularProgress } from '@mui/material';

// export default function ProjectForm({ open, onClose, onSave, projectData }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     client_id: '',
//     description: '',
//     active: true,
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (projectData) {
//       setFormData({
//         name: projectData.name || '',
//         client_id: projectData.client_id || '',
//         description: projectData.description || '',
//         active: projectData.active ?? true,
//       });
//     } else {
//       setFormData({
//         name: '',
//         client_id: '',
//         description: '',
//         active: true,
//       });
//     }
//     setLoading(false); // 🔥 Reseteamos el loading al abrir
//   }, [projectData, open]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleToggleActive = () => {
//     setFormData((prev) => ({ ...prev, active: !prev.active }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // 🔥 Activamos el loading inmediatamente
//     onClose(); // 🔥 Cerramos el modal inmediatamente
//     await onSave(formData); // 🔥 Guardamos en la API
//   };

//   return (
//     <Dialog open={open} onClose={!loading ? onClose : null}>
//       <DialogTitle>{projectData ? 'Edit Project' : 'New Project'}</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit} className="space-y-8">
//           <TextField fullWidth label="Project Name" name="name" value={formData.name} onChange={handleChange} required />
//           <TextField fullWidth label="Client ID" name="client_id" value={formData.client_id} onChange={handleChange} required type="number" />
//           <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} />
//           <FormControlLabel control={<Switch checked={formData.active} onChange={handleToggleActive} />} label="Active" />
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary" variant="outlined" disabled={loading}>
//           Cancel
//         </Button>
//         <Button type="submit" onClick={handleSubmit} color="primary" variant="contained" disabled={loading}>
//           {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Save'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from '@mui/material';

export default function ProjectForm({ open, onClose, onSave, projectData }) {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    client_id: '',
    description: '',
    active: true,
  });

  const [clients, setClients] = useState([]); // Lista de clientes

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
  }, [projectData]);

  // 🚀 Obtener clientes desde la API al abrir el formulario
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients');
        if (!res.ok) throw new Error('Failed to fetch clients');
        const data = await res.json();
        setClients(data); // Guardamos los clientes en el estado
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    if (open) fetchClients(); // Solo se ejecuta cuando el modal está abierto
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (e) => {
    setFormData({ ...formData, active: e.target.value === 'true' });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{formData.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Project Name" name="name" value={formData.name} onChange={handleChange} margin="dense" required />
        <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="dense" multiline rows={3} />

        {/* 🚀 Select para Clientes */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Client</FormLabel>
          <Select name="client_id" value={formData.client_id} onChange={handleChange} required>
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name} - {client.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Status (Activo / Inactivo) */}
        <FormControl margin="dense">
          <FormLabel>Status</FormLabel>
          <RadioGroup row name="active" value={String(formData.active)} onChange={handleStatusChange}>
            <FormControlLabel value="true" control={<Radio />} label="Active" />
            <FormControlLabel value="false" control={<Radio />} label="Inactive" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">{formData.id ? 'Update' : 'Save'}</Button>
      </DialogActions>
    </Dialog>
  );
}
