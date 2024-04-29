import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
  Box,
  Stack,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  CircularProgress
} from '@mui/material';


import InfiniteScroll from "react-infinite-scroll-component";

// utils
import { fToNow } from '../../../utils/formatTime';
import { getAllNotifs } from './notification';
// _mock_
import { _notifications } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';
import { useTheme } from '@mui/system';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import dashboardRoutes from '../../../api/dashboardRoutes';
import { toast } from "react-toastify";


// ----------------------------------------------------------------------

export default function NotificationsPopover() {

  const { fetchMyNotification, readNotification} = dashboardRoutes

  const theme = useTheme()

  const [openPopover, setOpenPopover] = useState(null);

  const [notifications, setNotifications] = useState(_notifications);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;



  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notificationData?.data?.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  const { data: notificationData, status: requestStatus } = useQuery(
    ["get-notification-data"],
    () => fetchMyNotification()
  )

  const {
    fetchNextPage,
    status,
    hasNextPage,
    VaData,
    isLoading,
    tempData,
    refetch,
  } = getAllNotifs();


  const data = tempData?.data
  const unread = data?.filter((data) => data?.seen == 0)
 


  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={unread?.length ?? 0} color="error">
          <Iconify icon="eva:bell-fill" sx={{ color: theme.palette.primary.main }} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {unread?.length ?? 0} unread messages
            </Typography>
          </Box>

          {/* {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )} */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />


        <InfiniteScroll
          dataLength={tempData ? tempData.data.length : 0}
          next={() => fetchNextPage()}
          hasMore={!!hasNextPage}
          initialScrollY={0}
          height={350}
          loader={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding={2}
            >
              <CircularProgress />
            </Box>
          }
          endMessage={
            <>
              <Divider sx={{ borderStyle: "dashed" }} />
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding={2}
              >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  You have seen it all
                </Typography>
              </Box>
            </>
          }
          scrollableTarget="scrollableDiv"
        >
          {tempData?.data?.map((vadata, index) => (
            <NotificationItem notification={vadata} key={index} />
          ))}
        </InfiniteScroll>




        {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                {notificationData?.data?.length != 0 ? (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>New</Typography>
                ) : (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>You have no notifications</Typography>
                )}
              </ListSubheader>
            }
          >
            {notificationData?.data?.slice(0,5)?.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
             {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={handleClosePopover}>
           Close
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.node,
    type: PropTypes.string,
    title: PropTypes.string,
    isUnRead: PropTypes.bool,
    description: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    message: PropTypes.string,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title,message } = renderContent(notification);
  const {readNotification} = dashboardRoutes
  const queryClient = useQueryClient();

  const orderMessage = notification?.order != null ? notification?.order?.order_id : notification?.type_id 
  const orderStatus = notification?.order?.status =="inprogress" ? " In Progress" :  notification?.order?.status =="released" ? " Released" :  notification?.order?.status =="completed" ? " Completed" : " In Queue"
  const messageData = orderMessage?.concat(orderStatus)
  const {mutate: readNotificationData, isLoading: readNotificationStatus} =
  useMutation((payload) => readNotification(payload),{
    onSucces : (data) => {
      // queryClient.refetchQueries(["get-notification-data"]);
     
    },
    onError: (error) =>{
      toast.error(error.response.message,{
        position: "bottom-right"
      })
    }
  })



  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>

      <ListItemText
        onClick={() => readNotificationData([notification?.id])}
        disableTypography
        primary={messageData}
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">{fToNow(notification.created_at)}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

const renderContent = (notification) => {
  const title = (
    <Typography variant="subtitle2">
      {notification.message}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.message)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.message} src="/assets/icons/notification/ic_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_status') {
    return {
      avatar: <img alt={notification.message} src="/assets/icons/notification/ic_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.message} src="/assets/icons/notification/ic_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'notify') {
    return {
      avatar: <img alt={notification.message} src="/assets/icons/notification/ic_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.message} src={notification.avatar} /> : null,
    title,
  };
}
