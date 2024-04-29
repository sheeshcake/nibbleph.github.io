import PropTypes from "prop-types";
// @mui
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

// ----------------------------------------------------------------------

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
};

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}) {
  return (
    <Dialog
      fullWidth
      maxWidth={other.width}
      open={open}
      onClose={onClose}
      {...other}
    >
      <DialogTitle
        sx={{
          display: "flex",
          pb: 2,
          // color: other?.styles?.title?.textColor
          //   ? other?.styles?.title?.textColor
          //   : "black",
          // backgroundColor: other?.styles?.title?.backgroundColor
          //   ? other?.styles?.title?.backgroundColor
          //   : "white",
          // justifyContent: other?.styles?.title?.justifyContent
          //   ? other?.styles?.title?.justifyContent
          //   : "flex-start",
        }}
      >
        <Typography variant='h3'>{title}</Typography>
      </DialogTitle>

      {content && (
        <DialogContent sx={{ typography: "body2" }}> {content} </DialogContent>
      )}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
