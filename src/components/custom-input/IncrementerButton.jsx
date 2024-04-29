import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, IconButton, Box, Chip, Avatar, Typography } from '@mui/material';
// components
import Iconify from '../iconify';
// ----------------------------------------------------------------------

const IncrementerButton = forwardRef(
  ({ quantity, onIncrease, onDecrease, disabledIncrease, disabledDecrease, sx, ...other }, ref) => (
    <Stack
      ref={ref}
      flexShrink={0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        mb: 0.5,
        py: 0.5,
        px: 0.75,
        width: 96,
        borderRadius: 1,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        ...sx,
      }}
      {...other}
    >
      <IconButton
        size="small"
        color="inherit"
        onClick={onDecrease}
        disabled={disabledDecrease}
        sx={{ color: 'text.secondary' }}
      >
        <Iconify icon="eva:minus-fill" width={16} />
      </IconButton>


      <IconButton
        size="small"
        color="inherit"
        sx={{ color: 'text.secondary' }}
      >
        <Avatar sx={{height: 20, width: 20, backgroundColor: 'transparent'}}>
          <Typography variant='caption'>{quantity}</Typography>
        </Avatar>
      </IconButton>


      <IconButton
        size="small"
        color="inherit"
        onClick={onIncrease}
        disabled={disabledIncrease}
        sx={{ color: 'text.secondary' }}
      >
        <Iconify icon="eva:plus-fill" width={16} />
      </IconButton>
    </Stack>
  )
);

IncrementerButton.propTypes = {
  sx: PropTypes.object,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
  quantity: PropTypes.number,
  disabledDecrease: PropTypes.bool,
  disabledIncrease: PropTypes.bool,
};

export default IncrementerButton;
