'use client';

import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem
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

  useEffect(() => {
    const fetchData = async () => {
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
      }
    };

    fetchData();
  }, []);

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
  }, [taskEntryData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBillableChange = (e) => {
    setFormData({ ...formData, billable: e.target.value === 'true' });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{formData.id ? 'Edit Task Entry' : 'Add New Task Entry'}</DialogTitle>
      <DialogContent>
        {/* Contractor */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Contractor</FormLabel>
          <Select name="contractor_id" value={formData.contractor_id} onChange={handleChange}>
            {contractors.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.fullname}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Project */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Project</FormLabel>
          <Select name="project_id" value={formData.project_id} onChange={handleChange}>
            {projects.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Category */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Category</FormLabel>
          <Select name="category_id" value={formData.category_id} onChange={handleChange}>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.description}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Description */}
        <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="dense" />

        {/* Date */}
        <TextField fullWidth type="datetime-local" label="Date" name="date" value={formData.date} onChange={handleChange} margin="dense" InputLabelProps={{ shrink: true }} />

        {/* Duration */}
        <TextField fullWidth label="Duration (hours)" name="duration" type="number" value={formData.duration} onChange={handleChange} margin="dense" />

        {/* Billable */}
        <FormControl margin="dense">
          <FormLabel>Billable</FormLabel>
          <RadioGroup row name="billable" value={String(formData.billable)} onChange={handleBillableChange}>
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
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
