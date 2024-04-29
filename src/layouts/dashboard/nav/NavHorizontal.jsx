import PropTypes from "prop-types";
import { memo } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { AppBar, Box, Toolbar } from "@mui/material";

// config
import { HEADER } from "../../../config-global";
// utils
import { bgBlur } from "../../../utils/cssStyles";
import { getLocalStorageItem } from "../../../utils/getLocalStorage";
import { USER } from "../../../utils/userConstants";
// components
import { NavSectionHorizontal } from "../../../components/nav-section";
// nav
import UserNav from "./UserNav";
import AdminNav from "./AdminNav";
import VirtualAssistantNav from "./VirtualAssistantNav";

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();

  const userRole = getLocalStorageItem(USER.USER_ROLE);

  const navigationHandler = () => {
    if(userRole) {
      switch (userRole.toLowerCase()) {
        case "admin":
          return AdminNav;
        case "user":
          return UserNav;
        case "virtual_assistant":
          return VirtualAssistantNav;
        default:
          break;
      }
    }
  };

  return (
    <AppBar
      component="nav"
      color="transparent"
      sx={{
        boxShadow: 0,
        top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <NavSectionHorizontal data={navigationHandler()} />
      </Toolbar>

      <Shadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);

// ----------------------------------------------------------------------

Shadow.propTypes = {
  sx: PropTypes.object,
};

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        width: 1,
        m: "auto",
        borderRadius: "50%",
        position: "absolute",
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}