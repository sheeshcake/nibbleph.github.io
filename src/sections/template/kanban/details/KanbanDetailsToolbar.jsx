import PropTypes from 'prop-types';
import { useState } from 'react';

// Redux
import { useDispatch } from '../../../../redux/store'
import {
  saveBoardAsync,
  updateColumnToComplete
} from '../../../../redux/slices/kanban'

// @mui
import { Stack, Button, Tooltip, IconButton, Typography } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// components
import Iconify from '../../../../components/iconify';
import ConfirmDialog from '../../../../components/confirm-dialog';

// ----------------------------------------------------------------------

KanbanDetailsToolbar.propTypes = {
  liked: PropTypes.bool,
  onLike: PropTypes.func,
  onAttach: PropTypes.func,
  onDelete: PropTypes.func,
  completed: PropTypes.bool,
  taskName: PropTypes.string,
  taskId: PropTypes.string,
  taskOrderId: PropTypes.string,
  onCompleted: PropTypes.func,
  task: PropTypes.func,
  fileInputRef: PropTypes.object,
  onCloseDetails: PropTypes.func,
};

export default function KanbanDetailsToolbar({
  task,
  fileInputRef,
  taskName,
  taskOrderId,
  taskId,
  liked,
  completed,
  onLike,
  onAttach,
  onDelete,
  onCompleted,
  onCloseDetails,
}) {

  const dispatch = useDispatch();

  const isDesktop = useResponsive('up', 'sm');

  const [openConfirm,] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };


  const handleChangeComplete = (event) => {
    dispatch(saveBoardAsync({ card_id: taskId, status: "completed" }));
    updateColumnToComplete({ targetId: taskId });
  };
  
  return (
    <>
      <Stack p={2.5} direction="row" alignItems="center">
        <Typography variant="subtitle1">{taskOrderId}</Typography>
        {!isDesktop && (
          <Tooltip title="Back">
            <IconButton onClick={onCloseDetails} sx={{ mr: 1 }}>
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>
          </Tooltip>
        )}

        <Stack direction="row" spacing={1} justifyContent="flex-end" flexGrow={1}>


          <Tooltip title="Delete task">
            <IconButton onClick={handleOpenConfirm} size="small">
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Tooltip>


          {
            task.status === 'released' && (
              <Tooltip title="Mark as complete">
                <IconButton onClick={handleChangeComplete} size="small" color='success'>
                  <Iconify icon="ph:check-fat-duotone" />
                </IconButton>
              </Tooltip>
            )
          }

        </Stack>
      </Stack>

      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {taskName} </strong>?
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
}
