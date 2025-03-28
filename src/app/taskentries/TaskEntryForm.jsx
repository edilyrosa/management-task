'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem,
  CircularProgress
} from '@mui/material';

export default function TaskEntryForm({ open, onClose, onSave, taskEntryData }) {
  const [formData, setFormData] = useState({
    id: null,
    contractor_id: '',
    project_id: '',
    category_id: '',
    description: '',
    date: '',
    duration: '',
    billable: true,
  });

  const [contractors, setContractors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [contractorsRes, projectsRes, categoriesRes] = await Promise.all([
          fetch('/api/contractors'),
          fetch('/api/projects'),
          fetch('/api/categories'),
        ]);

        if (!contractorsRes.ok || !projectsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch reference data');
        }

        setContractors(await contractorsRes.json());
        setProjects(await projectsRes.json());
        setCategories(await categoriesRes.json());
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrors(prev => ({ ...prev, fetch: 'Failed to load data. Please try again.' }));
      } finally {
        setIsLoading(false);
      }
    };

    if (open) fetchData();
  }, [open]);

  useEffect(() => {
    if (taskEntryData) {
      setFormData(taskEntryData);
    } else {
      setFormData({
        id: null,
        contractor_id: '',
        project_id: '',
        category_id: '',
        description: '',
        date: '',
        duration: '',
        billable: true,
      });
    }
    setErrors({});
  }, [taskEntryData]);

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

  const handleBillableChange = (e) => {
    setFormData(prev => ({ ...prev, billable: e.target.value === 'true' }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const newErrors = {};
    ['contractor_id', 'project_id', 'category_id', 'description', 'date', 'duration'].forEach(field => {
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
      console.error("Error saving task entry:", error);
      setErrors(prev => ({ ...prev, submit: 'Error saving task entry. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{formData.id ? 'Edit Task Entry' : 'Add New Task Entry'}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense" error={!!errors.contractor_id}>
          <FormLabel>Contractor</FormLabel>
          <Select name="contractor_id" value={formData.contractor_id} onChange={handleChange}>
            {contractors.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.fullname}</MenuItem>
            ))}
          </Select>
          {errors.contractor_id && <span style={{ color: 'red', fontSize: '0.75rem' }}>{errors.contractor_id}</span>}
        </FormControl>

        <FormControl fullWidth margin="dense" error={!!errors.project_id}>
          <FormLabel>Project</FormLabel>
          <Select name="project_id" value={formData.project_id} onChange={handleChange}>
            {projects.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
            ))}
          </Select>
          {errors.project_id && <span style={{ color: 'red', fontSize: '0.75rem' }}>{errors.project_id}</span>}
        </FormControl>

        <FormControl fullWidth margin="dense" error={!!errors.category_id}>
          <FormLabel>Category</FormLabel>
          <Select name="category_id" value={formData.category_id} onChange={handleChange}>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.description}</MenuItem>
            ))}
          </Select>
          {errors.category_id && <span style={{ color: 'red', fontSize: '0.75rem' }}>{errors.category_id}</span>}
        </FormControl>

        <TextField 
          fullWidth 
          label="Description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          margin="dense"
          error={!!errors.description}
          helperText={errors.description}
        />

        <TextField 
          fullWidth 
          type="datetime-local" 
          label="Date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          margin="dense" 
          InputLabelProps={{ shrink: true }}
          error={!!errors.date}
          helperText={errors.date}
        />

        <TextField 
          fullWidth 
          label="Duration (hours)" 
          name="duration" 
          type="number" 
          value={formData.duration} 
          onChange={handleChange} 
          margin="dense"
          error={!!errors.duration}
          helperText={errors.duration}
        />

        <FormControl margin="dense">
          <FormLabel>Billable</FormLabel>
          <RadioGroup row name="billable" value={String(formData.billable)} onChange={handleBillableChange}>
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
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
