import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "../../redux/store";
import moment from "moment";
// @mui
import {
  Box,
  Alert,
  AlertTitle,
  Container,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import { useSettingsContext } from "../../components/settings";
import Iconify from "../../components/iconify";
import { IconButtonAnimate } from "../../components/animate";
//
import Main from "./Main";
import Header from "./header";
import NavMini from "./nav/NavMini";
import NavVertical from "./nav/NavVertical";
import NavHorizontal from "./nav/NavHorizontal";

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { is_maintenance, maintenance } = useSelector(
    (state) => state.maintenance
  );
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive("up", "lg");

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = (
    <NavVertical openNav={open} onCloseNav={handleClose} />
  );

  if (isNavHorizontal) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        {isDesktop ? <NavHorizontal /> : renderNavVertical}

        <Main>
          <Outlet />
        </Main>
      </>
    );
  }

  if (isNavMini) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: "flex" },
            minHeight: { lg: 1 },
          }}
        >
          {isDesktop ? <NavMini /> : renderNavVertical}

          <Main>
            <Outlet />
          </Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={handleOpen} />

      <Box
        sx={{
          display: { lg: "flex" },
          minHeight: { lg: 1 },
        }}
      >
        {renderNavVertical}

        <Main>
          <Container maxWidth={false}>
            {is_maintenance && (
              <Alert severity={maintenance?.type || 'info'} sx={{ marginBottom: 2 }}>
                <AlertTitle>{maintenance?.title}</AlertTitle>

                <Stack spacing={1} mt={2} direction="column">
                  <Box>
                    {maintenance?.description} —{" "}
                    <strong>
                      {moment(maintenance?.start_date).format("ll")} -{" "}
                      {moment(maintenance?.end_date).format("ll")} at{" "}
                      {moment(maintenance.expected_time).format("LT")}
                    </strong>
                  </Box>

                  <Box width="75vw">
                    <Accordion sx={{ marginTop: 2, width: "100%" }}>
                      <AccordionSummary
                        expandIcon={
                          <IconButtonAnimate>
                            <Iconify icon="bxs:up-arrow" />
                          </IconButtonAnimate>
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="inherit" fontWeight="bold">
                          View updates
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Box
                          sx={{ width: "100%", bgcolor: "background.paper" }}
                        >
                          <List
                            component="nav"
                            aria-label="main mailbox folders"
                          >
                            {JSON.parse(maintenance?.feature).map(
                              (item, sub_content_key) => (
                                <ListItem
                                  key={sub_content_key}
                                  alignItems="center"
                                >
                                  <ListItemIcon>
                                    <Iconify
                                      icon="mingcute:check-2-fill"
                                      sx={{
                                        color: (theme) =>
                                          theme.palette.info.main,
                                      }}
                                    />
                                  </ListItemIcon>
                                  <ListItemText secondary={item.desc} />
                                </ListItem>
                              )
                            )}
                          </List>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Stack>
              </Alert>
            )}
          </Container>
          <Outlet />
        </Main>
      </Box>
    </>
  );
}
