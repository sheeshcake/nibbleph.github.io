import PropTypes from "prop-types";
import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from '../../../components/snackbar';
import { useNavigate } from "react-router";
// @mui
import {
  Paper,
  Typography,
  Box,
  Checkbox,
  Stack,
  Avatar,
  AvatarGroup,
  Tooltip
} from "@mui/material";

// components
import Image from "../../../components/image";
import Iconify from "../../../components/iconify";
import KanbanDetails from "./details/KanbanDetails";

import {
  updateTasks,
  deleteTask,
  saveBoardAsync,
} from "../../../redux/slices/kanban";
// ----------------------------------------------------------------------

KanbanTaskCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  onDeleteTask: PropTypes.func,
};

export default function KanbanTaskCard({ card, onDeleteTask, index }) {

  const navigate = useNavigate();

  const { name, attachments, user, assignee, orderId } = card;

  // console.log("Namee", card);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const tasks = useSelector((state) => state.kanban.board.cards);

  const [completed, setCompleted] = useState(card.completed);

  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleChangeComplete = (event) => {

    const filtered = Object.values(tasks).find((item) => item.id === card.id);

    if (filtered.assignee.length !== 0) {
      setCompleted(event.target.checked);

      const newData = {
        ...tasks,
        [card.id]: {
          ...filtered,
          completed: true,
        },
      };

      dispatch(saveBoardAsync({ card_id: card.id, status: "completed" }));
    } else {
      enqueueSnackbar('Unable to move please assign VA first', {
        variant: 'error',
      })
    }
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            sx={{
              width: 1,
              borderRadius: 1,
              boxShadow: (theme) => theme.customShadows.z1,
              "&:hover": {
                boxShadow: (theme) => theme.customShadows.z20,
              },
              padding: 2,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {!completed && card.status !== "completed" ? (
                <Checkbox
                  disableRipple
                  checked={completed}
                  icon={<Iconify icon="eva:radio-button-off-outline" />}
                  checkedIcon={
                    <Iconify icon="eva:checkmark-circle-2-outline" />
                  }
                  onChange={handleChangeComplete}
                  disabled
                />
              ) : (
                <Iconify icon="ph:check-fat-duotone" />
              )}
              <Box onClick={handleOpenDetails} sx={{ cursor: "pointer" }}>
                <Stack>

                  <Typography
                    noWrap
                    variant="subtitle2"
                    sx={{
                      color: (theme) =>
                        !completed && card.status !== "completed"
                          ? theme.palette.minimal.main
                          : "inherit",
                      transition: (theme) =>
                        theme.transitions.create("opacity", {
                          duration: theme.transitions.duration.shortest,
                        }),
                      ...(completed && {
                        opacity: 0.48,
                      }),
                    }}
                    onClick={() => navigate(`/admin/orders/list?search=${orderId}`)}
                  >
                    {name}
                  </Typography>


                  <Stack direction="row" spacing={1}>
                    <Iconify
                      icon="solar:user-bold-duotone"
                      sx={{
                        color: (theme) =>
                          !completed && card.status !== "completed"
                            ? theme.palette.minimal.main
                            : "inherit",
                        transition: (theme) =>
                          theme.transitions.create("opacity", {
                            duration: theme.transitions.duration.shortest,
                          }),
                        ...(completed && {
                          opacity: 0.48,
                        }),
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: (theme) =>
                          !completed && card.status !== "completed"
                            ? theme.palette.minimal.main
                            : "inherit",
                        transition: (theme) =>
                          theme.transitions.create("opacity", {
                            duration: theme.transitions.duration.shortest,
                          }),
                        ...(completed && {
                          opacity: 0.48,
                        }),
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Stack>

                  {
                    assignee.length != 0 && (
                      <AvatarGroup>
                        {
                          assignee.map((va, key) => (
                            <Tooltip key={key} title={va.name}>
                              <Avatar alt={va.name} sx={{ height: 20, width: 20 }} src={va.avatar} />
                            </Tooltip>
                          ))
                        }
                      </AvatarGroup>
                    )
                  }

                </Stack>
              </Box>
            </Stack>
          </Paper>


          // <Paper
          //   {...provided.draggableProps}
          //   {...provided.dragHandleProps}
          //   ref={provided.innerRef}
          //   sx={{
          //     width: 1,
          //     borderRadius: 1,
          //     overflow: "hidden",
          //     position: "relative",
          //     boxShadow: (theme) => theme.customShadows.z1,
          //     "&:hover": {
          //       boxShadow: (theme) => theme.customShadows.z20,
          //     },
          //   }}
          // >
          //   <Box onClick={handleOpenDetails} sx={{ cursor: "pointer" }}>
          //     {!!attachments.length && (
          //       <Image
          //         disabledEffect
          //         alt={attachments[0]}
          //         src={attachments[0]}
          //         ratio="4/3"
          //         sx={{
          //           transition: (theme) =>
          //             theme.transitions.create("opacity", {
          //               duration: theme.transitions.duration.shortest,
          //             }),
          //           ...(completed && {
          //             opacity: 0.48,
          //           }),
          //         }}
          //       />
          //     )}
          //     <Typography
          //       noWrap
          //       variant="subtitle2"
          //       sx={{
          //         pr: 1,
          //         pl: 6,
          //         height: 72,
          //         lineHeight: "72px",
          //         color: (theme) =>
          //           !completed && card.status !== "completed"
          //             ? theme.palette.minimal.main
          //             : "inherit",
          //         transition: (theme) =>
          //           theme.transitions.create("opacity", {
          //             duration: theme.transitions.duration.shortest,
          //           }),
          //         ...(completed && {
          //           opacity: 0.48,
          //         }),
          //       }}
          //     >
          //       {name}
          //     </Typography>
          //   </Box>

          //   {!completed && card.status !== "completed" ? (
          //     <Checkbox
          //       disableRipple
          //       checked={completed}
          //       icon={<Iconify icon="eva:radio-button-off-outline" />}
          //       checkedIcon={<Iconify icon="eva:checkmark-circle-2-outline" />}
          //       onChange={handleChangeComplete}
          //       sx={{ position: "absolute", bottom: 16, left: 8 }}
          //     />
          //   ) : (
          //     <Iconify
          //       icon="ph:check-fat-duotone"
          //       sx={{ position: "absolute", bottom: 27, left: 20 }}
          //     />
          //   )}
          // </Paper>
        )}
      </Draggable>

      <KanbanDetails
        task={card}
        openDetails={openDetails}
        onCloseDetails={handleCloseDetails}
        onDeleteTask={() => onDeleteTask(card.id)}
      />
    </>
  );
}
