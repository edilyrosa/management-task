'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import CountrySelect from '../components/Select';

const forbiddenChars = /[<>\"'();={}\[\]%]/g;

export default function ClientForm({ open, onClose, onSave, clientData }) {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    city: '',
    state: '',
    country: '',
    industry_codes: '',
    active: true,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (clientData) {
      setFormData(clientData);
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
    setErrors({});
  }, [clientData]);

  const validateInput = (name, value) => {
    if (!value || !value.toString().trim()) {
      setErrors(prev => ({ ...prev, [name]: '⚠️ This field is required' }));
      return value;
    }
    if (forbiddenChars.test(value)) {
      setErrors(prev => ({ ...prev, [name]: '⚠️ Special characters not allowed' }));
      return value.replace(forbiddenChars, '');
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
      return value;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: validateInput(name, value) }));
  };

  const handleCountryChange = (event) => {
    setFormData(prev => ({ ...prev, country: event.target.value }));
  };

  const handleStatusChange = (e) => {
    setFormData(prev => ({ ...prev, active: e.target.value === 'true' }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const newErrors = {};
    Object.entries(formData).forEach(([field, value]) => {
      if (field !== 'id' && field !== 'active' && (!value || !value.toString().trim())) {
        newErrors[field] = '⚠️ This field is required';
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
      console.error("Error saving:", error);
      setErrors(prev => ({ ...prev, submit: 'Error saving. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{formData.id ? 'Edit Client' : 'Add New Client'}</DialogTitle>
      <DialogContent>
        <TextField 
          fullWidth 
          label="Name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          margin="dense"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField 
          fullWidth 
          label="City" 
          name="city" 
          value={formData.city} 
          onChange={handleChange} 
          margin="dense"
          error={!!errors.city}
          helperText={errors.city}
        />
        <TextField 
          fullWidth 
          label="State" 
          name="state" 
          value={formData.state} 
          onChange={handleChange} 
          margin="dense"
          error={!!errors.state}
          helperText={errors.state}
        />
        
        <CountrySelect value={formData.country} onChange={handleCountryChange} />

        <TextField 
          fullWidth 
          label="Industry Code" 
          name="industry_codes" 
          value={formData.industry_codes} 
          onChange={handleChange} 
          margin="dense"
          error={!!errors.industry_codes}
          helperText={errors.industry_codes}
        />

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
