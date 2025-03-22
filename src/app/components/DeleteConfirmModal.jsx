'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@mui/material';

export default function DeleteConfirmModal({ open, onClose, onConfirm, itemName }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🔥 Resetear estado cuando se abre/cierra el modal
  useEffect(() => {
    if (!open) {
      setLoading(false);
      setError('');
    }
  }, [open]);

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      await onConfirm(); // Llamamos a la función de eliminación
      onClose(); // Cerrar el modal si se elimina con éxito
    } catch (err) {
      setError('Error deleting item. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={!loading ? onClose : null} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {loading ? (
            <>
              <CircularProgress size={30} style={{ color: '#d32f2f', marginRight: '10px' }} />
              Deleting <strong>{itemName}</strong>...
            </>
          ) : (
            `Are you sure you want to delete ${itemName}? This action cannot be undone.`
          )}
        </DialogContentText>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
