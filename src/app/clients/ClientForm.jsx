
// 'use client';

// import { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

// export default function ClientForm({ open, onClose, onSave, clientData }) {
//   const [formData, setFormData] = useState({
//     id: null,
//     name: '',
//     city: '',
//     state: '',
//     country: '',
//     industry_codes: '',
//     active: true, // Status por defecto: Activo
//   });

//   useEffect(() => {
//     if (clientData) {
//       setFormData(clientData); // Si es edición, cargar los datos del cliente
//     } else {
//       setFormData({
//         id: null,
//         name: '',
//         city: '',
//         state: '',
//         country: '',
//         industry_codes: '',
//         active: true,
//       });
//     }
//   }, [clientData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleStatusChange = (e) => {
//     setFormData({ ...formData, active: e.target.value === 'true' }); // Convertir string a boolean
//   };

//   const handleSubmit = () => {
//     onSave(formData); // Enviar los datos
//     onClose(); // Cerrar el modal
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>{formData.id ? 'Edit Client' : 'Add New Client'}</DialogTitle>
//       <DialogContent>
//         <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="dense" />
//         <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} margin="dense" />
//         <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} margin="dense" />
//         <TextField fullWidth label="Country" name="country" value={formData.country} onChange={handleChange} margin="dense" />
//         <TextField fullWidth label="Industry Code" name="industry_codes" value={formData.industry_codes} onChange={handleChange} margin="dense" />

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

import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import  CountrySelect from '../components/Select'; // ✅ Importamos el nuevo Select

export default function ClientForm({ open, onClose, onSave, clientData }) {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    city: '',
    state: '',
    country: '',
    industry_codes: '',
    active: true, // Status por defecto: Activo
  });

  useEffect(() => {
    if (clientData) {
      setFormData(clientData); // Si es edición, cargar los datos del cliente
    } else {
      setFormData({
        id: null,
        name: '',
        city: '',
        state: '',
        country: '',
        industry_codes: '',
        active: true,
      });
    }
  }, [clientData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleCountryChange = (event) => {
    setFormData({ ...formData, country: event.target.value }); // ✅ Envía solo el string del país
  };

  const handleStatusChange = (e) => {
    setFormData({ ...formData, active: e.target.value === 'true' }); // Convertir string a boolean
  };

  const handleSubmit = () => {
    onSave(formData); // Enviar los datos
    onClose(); // Cerrar el modal
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{formData.id ? 'Edit Client' : 'Add New Client'}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} margin="dense" />
        
        <CountrySelect value={formData.country} onChange={handleCountryChange} />

        <TextField fullWidth label="Industry Code" name="industry_codes" value={formData.industry_codes} onChange={handleChange} margin="dense" />

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
