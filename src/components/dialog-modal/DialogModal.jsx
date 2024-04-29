/* eslint-disable react/prop-types */
import React from 'react';
// material
import { Button, Typography, Dialog, DialogContent, DialogTitle, DialogActions, Box } from '@mui/material';
import Iconify from '../../components/iconify';


export const useDialog = () => {
  const [open, setOpen] = React.useState(false);
  const openDialog = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const props = {
    open,
    handleClose,
  };
  return [open, openDialog, props, setOpen, handleClose];
};

const DialogModal = ({
  open,
  handleClose,
  title,
  subtitle,
  children,
  styles,
  buttons,
  width,
  logoutButton = false,
  setShowLogout
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    fullWidth
    maxWidth={width || 'sm'}
  >
    <div style={styles?.div}>
      <DialogTitle id="alert-dialog-title" style={styles?.title}>
        {title}
        <br />
        <Typography style={styles?.subtitle}>{subtitle}</Typography>
      </DialogTitle>
        <Iconify
        onClick={handleClose}
          icon="material-symbols:close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            height: 25,
            width: 25,
            borderRadius: 10,
            ':hover': {
                  bgcolor: 'red', 
                  color: 'white',
                },

          }}
       
        />
      <DialogContent>
        <Box>{children}</Box>
      </DialogContent>


      {buttons && <DialogActions>{buttons}</DialogActions>}
    </div>
    {logoutButton ? (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button style={{ marginBottom: 20, marginRight: 40, fontSize: 15 }} variant="outlined" onClick={setShowLogout}>
          Logout
        </Button>
      </div>
    ) : null}
  </Dialog>
);

export default DialogModal;
