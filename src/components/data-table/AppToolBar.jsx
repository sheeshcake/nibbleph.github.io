import PropTypes from "prop-types";
// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
// component
import Iconify from "../iconify";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 30,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

AppToolBar.propTypes = {
  numSelected: PropTypes.number,
  deletableHeader: PropTypes.bool,
  onDeleteMultiple: PropTypes.func
};

export default function AppToolBar(props) {
  return (
    <RootStyle
      sx={{
        ...(props.numSelected > 0 && !props.deletableHeader && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {props.numSelected > 0 && !props.deletableHeader ? (
        <Typography component="div" variant="subtitle1">
          {props.numSelected} selected
        </Typography>
      ) : props.children }

      {props.numSelected > 0  && !props.deletableHeader  && (
        <Tooltip title="Delete">
          <IconButton onClick={props.onDeleteMultiple}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
