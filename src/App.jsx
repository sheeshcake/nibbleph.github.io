// i18n
import "./locales/i18n";

// scroll bar
import "simplebar-react/dist/simplebar.min.css";

// lightbox
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// map
// import './utils/mapboxgl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import "react-quill/dist/quill.snow.css";

// slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

import { HelmetProvider } from "react-helmet-async";
// @mui
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

// routes
import Router from "./routes/MainRoute";
// theme
import ThemeProvider from "./theme";
// locales
import ThemeLocalization from "./locales";
// components
import { StyledChart } from "./components/chart";
import SnackbarProvider from "./components/snackbar";
import ScrollToTop from "./components/scroll-to-top";
import { MotionLazyContainer } from "./components/animate";
import { ThemeSettings, SettingsProvider } from "./components/settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { AuthProvider } from "./auth/JwtContext";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <ToastContainer />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider>
            <ScrollToTop />
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <ThemeLocalization>
                    <SnackbarProvider>
                      <StyledChart />
                      <Router />
                    </SnackbarProvider>
                  </ThemeLocalization>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </SettingsProvider>
        </LocalizationProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
