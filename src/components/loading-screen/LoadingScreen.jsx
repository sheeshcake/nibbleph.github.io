import { m } from "framer-motion";
import Lottie from "react-lottie";
import { useLocation } from "react-router-dom";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box, LinearProgress, CircularProgress } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// config
import { NAV, HEADER } from "../../config-global";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
//
import Logo from "../logo";
import ProgressBar from "../progress-bar";
import { useSettingsContext } from "../settings";

// Json

import AppPreloader from "../../lottie/AppPreloader.json";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 9998,
  width: "100%",
  height: "100%",
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function LoadingScreen() {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  const { isInitialized } = useAuthContext();

  const { themeLayout } = useSettingsContext();

  const isDashboard =
    isInitialized && pathname.includes("/dashboard") && isDesktop;

  const size =
    (themeLayout === "mini" && NAV.W_DASHBOARD_MINI) ||
    (themeLayout === "vertical" && NAV.W_DASHBOARD) ||
    144;

  return (
    <>
      <ProgressBar />

      <StyledRoot
        sx={{
          ...(isDashboard && {
            width: `calc(100% - ${size}px)`,
            height: `calc(100% - ${HEADER.H_DASHBOARD_DESKTOP}px)`,
            ...(themeLayout === "horizontal" && {
              width: 1,
              height: `calc(100% - ${size}px)`,
            }),
          }),
        }}
      >
        {isDashboard ? (
          <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
        ) : (
          <>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: AppPreloader,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                  isClickToPauseDisabled: true,
                }}
                height={400}
                width={400}
              />
            </Box>
          </>
        )}
      </StyledRoot>
    </>
  );
}
