import PropTypes from "prop-types";
import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
// @mui
import {
  Box,
  Avatar,
  Dialog,
  Button,
  ListItem,
  TextField,
  Typography,
  ListItemText,
  ListItemAvatar,
  InputAdornment,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// _mock_
import { _contacts } from "../../../_mock/arrays";

// components
import { IconButtonAnimate } from "../../../components/animate";
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import SearchNotFound from "../../../components/search-not-found";
import { fetchVirtualAssistants } from "../../../redux/slices/user";
import {
  updateTasks,
  deleteTask,
  updateColumnOrder,
  saveBoardAsync,
} from "../../../redux/slices/kanban";

// api
import orderRoutes from "../../../api/admin/orderRoutes";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

KanbanContactsDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  assignee: PropTypes.array,
};

export default function KanbanContactsDialog({
  assignee = [],
  open,
  onClose,
  data,
}) {
  const [searchContacts, setSearchContacts] = useState("");
  const [assignIsLoading, setAssignIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSearchContacts = (event) => {
    setSearchContacts(event.target.value);
  };

  const assignable_users = useSelector(
    (state) => state.user.virtual_assistants
  );

  const tasks = useSelector((state) => state.kanban.board.cards);

  const { board } = useSelector((state) => state.kanban);

  const dataFiltered = applyFilter({
    inputData: assignable_users,
    query: searchContacts,
  });

  const isNotFound = !dataFiltered.length && !!searchContacts;

  useEffect(() => {
    dispatch(fetchVirtualAssistants());
  }, []);

  const addAssignee = async (person) => {
    console.log("person", person);
    // console.log('data', data)
    setAssignIsLoading(true);
    const filtered = Object.values(tasks).find((item) => item.id === data.id);
    console.log(filtered);

    // console.log('filteredIndex', filteredIndex)

    const newData = {
      ...tasks,
      [data.id]: {
        ...filtered,
        assignee: [...filtered.assignee, person],
      },
    };
    try {
      await orderRoutes
        .addAssignee({
          user_id: [...filtered.assignee, person].map((item) => item.id),
          users_order_id: data.id,
        })
        .then((r) => {
          setAssignIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
    
    updateTasks(newData);

    if (filtered.status === "enqueue")
      updateColumnOrder({ targetId: filtered.id });
  };

  const deleteAssignee = async (person) => {
    setAssignIsLoading(true);
    const filtered = Object.values(tasks).find((item) => item.id === data.id);
    const newData = {
      ...tasks,
      [data.id]: {
        ...filtered,
        assignee: filtered.assignee.filter((item) => item.id !== person.id),
      },
    };

    try {
      await orderRoutes
        .removeAssignee({
          user_id: person.id,
          users_order_id: data.id,
        })
        .then((r) => {
          setAssignIsLoading(false);
          updateTasks(newData);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle sx={{ pb: 0 }}>
        Virtual Assistant{" "}
        <Typography component="span">({assignable_users.length})</Typography>
      </DialogTitle>

      <Box sx={{ px: 3, py: 2.5 }}>
        <TextField
          fullWidth
          value={searchContacts}
          onChange={handleSearchContacts}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {isNotFound ? (
          <SearchNotFound query={searchContacts} sx={{ mt: 3, mb: 10 }} />
        ) : (
          <Scrollbar
            sx={{
              px: 2.5,
              height: ITEM_HEIGHT * 6,
            }}
          >
            {dataFiltered.map((contact) => {
              const checked = assignee
                .map((person) => person.id)
                .includes(contact.id);

              return (
                <ListItem
                  key={contact.id}
                  disableGutters
                  secondaryAction={
                    <Stack direction="row" alignItems="center">
                      <LoadingButton
                        size="small"
                        color={checked ? "primary" : "inherit"}
                        onClick={() => {
                          addAssignee(contact);
                        }}
                        startIcon={
                          <Iconify
                            icon={
                              checked ? "eva:checkmark-fill" : "eva:plus-fill"
                            }
                          />
                        }
                        disabled={checked}
                        loading={assignIsLoading}
                      >
                        {checked ? "assigned" : "assign"}
                      </LoadingButton>

                      {checked && (
                        <IconButtonAnimate
                          size="small"
                          color={checked ? "error" : "inherit"}
                          onClick={() => {
                            deleteAssignee(contact);
                          }}
                        >
                          <Iconify icon="icon-park-twotone:delete" />
                        </IconButtonAnimate>
                      )}
                    </Stack>
                  }
                  sx={{ height: ITEM_HEIGHT }}
                >
                  <ListItemAvatar>
                    <Avatar src={contact.avatar} />
                  </ListItemAvatar>

                  <ListItemText
                    primaryTypographyProps={{
                      typography: "subtitle2",
                      sx: { mb: 0.25 },
                    }}
                    secondaryTypographyProps={{ typography: "caption" }}
                    primary={contact.name}
                    secondary={contact.email}
                  />
                </ListItem>
              );
            })}
          </Scrollbar>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, query }) {
  if (query) {
    inputData = inputData.filter(
      (contact) =>
        contact.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        contact.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}
