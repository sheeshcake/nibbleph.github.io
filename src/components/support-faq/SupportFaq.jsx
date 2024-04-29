import * as React from "react";
import {
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Fab from "@mui/material/Fab";


export const useDialog = () => {
  // const [open, setOpen] = React.useState(false);

  // const openDialog = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const props = {
  //   open,
  //   handleClose,
  // };
  // return [open, openDialog, props, setOpen, handleClose];
};

const SupportFaq = ({  }) => (
  <React.Fragment>
    <Dialog>
      <DialogTitle>
        {/* {title} */}
        </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* {description} */}
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
    <Stack justifyContent="center" direction={"row"} mt={10}>
      <Fab
        variant="extended"
        size="large"
        color="primary"
        aria-label="add"
        // onClick={openDialog}
      >
        Support & FAQ
      </Fab>
    </Stack>
  </React.Fragment>
);

export default SupportFaq;