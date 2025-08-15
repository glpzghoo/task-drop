'use client';

import { Snackbar, Portal } from '@mui/material';
import { useEffect, useState } from 'react';
type Props = {
  value: string;
  success: boolean;
  onClose: () => void;
};

const CustomSnackBar = ({ value, success, onClose }: Props) => {
  const [open, setOpen] = useState(!!value);

  const handleClose = (_: any, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    setOpen(!!value);
  }, [value]);
  return (
    <Portal>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        message={value}
        onClose={handleClose}
        autoHideDuration={4000}
        sx={{
          '& .MuiSnackbarContent-root': {
            zIndex: 9999,
            backgroundColor: success ? '#22c55e' : '#ef4444',
            color: '#fff',
            borderRadius: '8px',
          },
        }}
      />
    </Portal>
  );
};

export default CustomSnackBar;
