import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Stack, MenuItem } from "@mui/material";
// routes
import { PATH_DASHBOARD, PATH_AUTH } from "../../../routes/paths";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// components
import { CustomAvatar } from "../../../components/custom-avatar";
import { useSnackbar } from "../../../components/snackbar";
import MenuPopover from "../../../components/menu-popover";
import { IconButtonAnimate } from "../../../components/animate";
import { USER } from "../../../utils/userConstants";

// redux
import { useSelector } from "../../../redux/store";
// api
import routes from "../../../api/ApiRoutes";

//local storage
import { getLocalStorageItem } from "../../../utils/getLocalStorage";

// ----------------------------------------------------------------------
const OPTIONS = [
  // {
  //   label: 'Home',
  //   linkTo: '/',
  // },
  {
    label: "Profile",
    linkTo: PATH_DASHBOARD.user.profile,
  },
  // {
  //   label: 'Settings',
  //   linkTo: PATH_DASHBOARD.user.account,
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user.userData);
  const { logout } = routes;
  const userRole = getLocalStorageItem(USER.USER_ROLE);

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const { mutate: logOut, isLoading: logOutLoading } = useMutation(
    () => logout(),
    {
      onSettled: () => {
        localStorage.clear();
        queryClient.clear();
        navigate("/login", { replace: true });
        handleClosePopover();
      },
    }
  );

  const handleClickItem = (path) => {
    if(userRole.toLowerCase() != 'virtual_assistant'){
      handleClosePopover();
      //temporary
      navigate("/profile");
    }

  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar
          src={user?.photoURL}
          alt={user?.name}
          name={user?.name}
          type="profile"
        />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        {userRole?.toLowerCase() != "admin" && userRole?.toLowerCase() != 'virtual_assistant' && (
          <Stack sx={{ p: 1 }}>
            {OPTIONS.map((option) => (
              <MenuItem
                key={option.label}
                onClick={() => handleClickItem(option.linkTo)}
              >
                {option.label}
              </MenuItem>
            ))}
          </Stack>
        )}

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={logOut} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
