import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as React from "react";
// @mui
import {
  Box,
  Stack,
  Drawer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled, alpha } from "@mui/system";

// hooks
import useResponsive from "../../../hooks/useResponsive";
// config
import { NAV } from "../../../config-global";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import { NavSectionVertical } from "../../../components/nav-section";
import SupportFaq, {
  useDialog,
} from "../../../components/support-faq/SupportFaq";
import { getLocalStorageItem } from "../../../utils/getLocalStorage";
import { USER } from "../../../utils/userConstants";

//
import UserNav from "./UserNav";
import AdminNav from "./AdminNav";
import NavDocs from "./NavDocs";
import NavAccount from "./NavAccount";
import NavToggleButton from "./NavToggleButton";
import VirtualAssistantNav from "./VirtualAssistantNav";
import Image from "../../../components/image";
import logo from "../../../assets/images/logo_rb.png";

// ----------------------------------------------------------------------

NavVertical.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function NavVertical({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const userRole = getLocalStorageItem(USER.USER_ROLE);

  const navigationHandler = () => {
    if (userRole) {
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

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <NavSectionVertical data={navigationHandler()} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      <NavToggleButton />

      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: "transparent",
              // borderRightStyle: "dashed",
              borderStyle: "none",
              backgroundColor: (theme) => theme.palette.minimal.main,
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1001%26quot%3b)' fill='none'%3e%3cpath d='M0 0L361.35 0L0 34.76z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M0 34.76L361.35 0L598.9200000000001 0L0 215.81z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M0 215.81L598.9200000000001 0L818.8100000000001 0L0 297.05z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M0 297.05L818.8100000000001 0L978.6300000000001 0L0 420.94z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M1440 560L1047.78 560L1440 553.97z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M1440 553.97L1047.78 560L878.27 560L1440 282.98z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M1440 282.98L878.27 560L541.19 560L1440 152.47000000000003z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M1440 152.47000000000003L541.19 560L200.80000000000007 560L1440 140.59000000000003z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1001'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: 5,
              height: '95vh',
              mt: 3.5,
              ml: 2
            },
          }}
        >
          <Stack
            spacing={3}
            sx={{
              pt: 3,
              pb: 2,
              px: 2.5,
              flexShrink: 0,
            }}
          >
            <Image
              sx={{
                zIndex: 9,
                position: 'absolute',
                mt: { xs: 1.5, md: 5 },
                ml: { xs: 2, md: 5 },
                height: 50,
              }}
              src={logo}
            />
            <Box sx={{ paddingTop: 5 }}>
              <NavAccount />
            </Box>
          </Stack>
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
              backgroundColor: (theme) => theme.palette.minimal.main,
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1001%26quot%3b)' fill='none'%3e%3cpath d='M0 0L361.35 0L0 34.76z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M0 34.76L361.35 0L598.9200000000001 0L0 215.81z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M0 215.81L598.9200000000001 0L818.8100000000001 0L0 297.05z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M0 297.05L818.8100000000001 0L978.6300000000001 0L0 420.94z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M1440 560L1047.78 560L1440 553.97z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M1440 553.97L1047.78 560L878.27 560L1440 282.98z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M1440 282.98L878.27 560L541.19 560L1440 152.47000000000003z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M1440 152.47000000000003L541.19 560L200.80000000000007 560L1440 140.59000000000003z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1001'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            },
          }}
        >
          <Stack
            spacing={3}
            sx={{
              pt: 3,
              pb: 2,
              px: 2.5,
              flexShrink: 0,
            }}
          >
            <Image
              sx={{
                zIndex: 9,
                position: 'absolute',
                mt: { xs: 1.5, md: 5 },
                ml: { xs: 2, md: 5 },
                height: 50,
              }}
              src={logo}
            />
            <Box sx={{ paddingTop: 5 }}>
              <NavAccount />
            </Box>
          </Stack>
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
