import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { useTheme } from "@mui/system";
import { Box, Link, Stack, Typography } from "@mui/material";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import { CustomAvatar } from "../../../components/custom-avatar";
// redux
import { useSelector } from '../../../redux/store'
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function NavAccount() {
  
  const user = useSelector((state) => state.user.userData);
  const theme = useTheme();


  return (
    <Link
      component={RouterLink}
      // to={PATH_DASHBOARD.user.account}
      underline="none"
      color="inherit"
    >
      {/* <StyledRoot>
        <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {user?.role}
          </Typography>
        </Box>
      </StyledRoot> */}
      <Stack alignItems="center" justifyContent="center" spacing={1}>
        <CustomAvatar
          src={user?.photoURL}
          alt={user?.name}
          name={user?.name}
          sx={{
            height: 120,
            width: 120,
          }}
        />
        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Stack alignItems="center" justifyContent="center">
            <Typography variant="subtitle1" sx={{ color: theme.palette.minimal.dark }}>
              {user?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.minimal.contrastText }}>
              {user?.email}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Link>
  );
}
