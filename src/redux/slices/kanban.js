import keyBy from "lodash/keyBy";
import { createSlice } from "@reduxjs/toolkit";
import omit from "lodash/omit";
// utils
import axios from "../../utils/axios";
import OrderRoutes from "../../api/OrderRoutes";
import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  board: {
    cards: {},
    columns: {},
    columnOrder: [],
    asyncCards: {},
  },
};

const slice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    updateTasks(state, action) {
      state.board.cards = action.payload;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET BOARD
    getBoardSuccess(state, action) {
      state.isLoading = false;
      const board = action.payload;
      const cards = keyBy(board.cards, "id");
      const columns = keyBy(board.columns, "id");
      const { columnOrder } = board;

      state.board = {
        cards,
        columns,
        columnOrder,
      };
    },

    // CREATE NEW COLUMN
    createColumnSuccess(state, action) {
      const newColumn = action.payload;
      state.isLoading = false;
      state.board.columns = {
        ...state.board.columns,
        [newColumn.id]: newColumn,
      };
      state.board.columnOrder.push(newColumn.id);
    },

    persistCard(state, action) {
      const columns = action.payload;
      state.board.columns = columns;
    },

    persistColumn(state, action) {
      state.board.columnOrder = action.payload;
    },

    addTask(state, action) {
      const { card, columnId } = action.payload;
      state.board.cards[card.id] = card;
      state.board.columns[columnId].cardIds.push(card.id);
    },

    updateColumnOrder (state, action) {
      const { targetId } = action.payload;
      const target = Object.values(state.board.columns['enqueue'].cardIds).findIndex((item) => item === targetId)
      state.board.columns['enqueue'].cardIds.splice(target, 1)
      state.board.columns['inprogress'].cardIds.unshift(targetId)
    },

    updateColumnToComplete (state, action) {
      const { targetId } = action.payload;
      const target = Object.values(state.board.columns['released'].cardIds).findIndex((item) => item === targetId)
      state.board.columns['released'].cardIds.splice(target, 1)
      state.board.columns['completed'].cardIds.unshift(targetId)
    },

    deleteTask(state, action) {
      const { cardId, columnId } = action.payload;

      state.board.columns[columnId].cardIds = state.board.columns[
        columnId
      ].cardIds.filter((id) => id !== cardId);

      state.board.cards = omit(state.board.cards, [cardId]);
    },

    // UPDATE COLUMN
    updateColumnSuccess(state, action) {
      const column = action.payload;
      state.isLoading = false;
      state.board.columns[column.id] = column;
    },

    // DELETE COLUMN
    deleteColumnSuccess(state, action) {
      const { columnId } = action.payload;
      const deletedColumn = state.board.columns[columnId];

      state.isLoading = false;
      state.board.columns = omit(state.board.columns, [columnId]);
      state.board.cards = omit(state.board.cards, [...deletedColumn.cardIds]);
      state.board.columnOrder = state.board.columnOrder.filter(
        (c) => c !== columnId
      );
    },
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function saveBoardAsync(payload) {
  // Silently saves the board to the backend to be used later
  // Returns nothing, VOID
  return async () => {
    OrderRoutes.storeKanBan(payload);
  };
}

// ----------------------------------------------------------------------

export function getBoard() {
  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());
    // try {
    //   dispatch(slice.actions.getBoardSuccess(JSON.parse(data.board)));
    // } catch (error) {
    //   dispatch(slice.actions.hasError(error));
    // }

    // First get the kanban then check if there's an existing board
    await OrderRoutes.fetchKanbanData().then((r) => r);
    const data = {
      board: {
        cards: [],
        columns: [
          {
            id: "incomplete",
            name: "Incomplete",
            cardIds: [],
          },
          {
            id: "enqueue",
            name: "Enqueue",
            cardIds: [],
          },
          {
            id: "inprogress",
            name: "In Progress",
            cardIds: [],
          },
          {
            id: "released",
            name: "Ready to ",
            cardIds: [],
          },
          {
            id: "completed",
            name: "Completed",
            cardIds: [],
          },
        ],
        columnOrder: ["incomplete", "enqueue", "inprogress", "released", "completed"],
      },
    };
    // console.log(data)
    dispatch(slice.actions.getBoardSuccess(data.board));

    await OrderRoutes.fetchAdminOrders("", 5, 10, false).then((r) => {
      // eslint-disable-next-line array-callback-return
      r.map((item) => {
        dispatch(
          addTask({
            card: {
              assignee: item.assigned_orders.map((item, index) => ({
                  ...item,
                  avatar: `https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_${
                    index + 1
                  }.jpg`,
                })),
              attachments: [],
              comments: [],
              completed: false,
              description: item.website.description,
              id: String(item.id),
              due: "",
              name: item.website.website_link,
              status: item.status,
              user: item.user,
              orderId: item.order_id,
              urlLink: item.url
            },
            columnId: item.status,
          })
        );
      });
    });

    // If the kanban data is empty create a new by grabbing the website orders API
    // if(isEmpty(kanban_data)){
    //   await OrderRoutes.fetchAdminOrders('', 5, 10, false).then(r => {
    //     r.map(item => {
    //       dispatch(addTask({
    //         card: {
    //           assignee: [],
    //           attachments: [],
    //           comments: [],
    //           completed: false,
    //           description: item.website.description,
    //           id: String(item.id),
    //           due: "",
    //           name: item.website.website_link,
    //           status: null
    //         },
    //         columnId: 'enqueue'
    //       }))
    //     })
    //   });
    // }
    // else{
    //   const data = JSON.parse(kanban_data.kanban_data);
    //   console.log(data)
    //   data.map(item => {
    //     dispatch(addTask({
    //       card: {
    //         assignee: [],
    //         attachments: [],
    //         comments: [],
    //         completed: false,
    //         description: item.description,
    //         id: item.id,
    //         due: "",
    //         name: item.name,
    //         status: item.status
    //       },
    //       columnId: !item.status ? 'enqueue' : item.status
    //     }))
    //   })

    // }
  };
}

// ----------------------------------------------------------------------

export function createColumn(newColumn) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/kanban/columns/new", newColumn);
      dispatch(slice.actions.createColumnSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateColumn(columnId, column) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.updateColumnSuccess(column));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteColumn(columnId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post("/api/kanban/columns/delete", { columnId });
      dispatch(slice.actions.deleteColumnSuccess({ columnId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function persistColumn(newColumnOrder) {
  return (dispatch) => {
    dispatch(slice.actions.persistColumn(newColumnOrder));
  };
}

// ----------------------------------------------------------------------

export function persistCard(columns) {
  return (dispatch) => {
    dispatch(slice.actions.persistCard(columns));
  };
}

// ----------------------------------------------------------------------

export function addTask({ card, columnId }) {
  return (dispatch) => {
    dispatch(slice.actions.addTask({ card, columnId }));
  };
}

// ----------------------------------------------------------------------

export function deleteTask({ cardId, columnId }) {
  return (dispatch) => {
    dispatch(slice.actions.deleteTask({ cardId, columnId }));
  };
}

// ----------------------------------------------------------------------

export function updateTasks(newData) {
  dispatch(slice.actions.updateTasks(newData));
}

export function updateColumnOrder(newData) {
  dispatch(slice.actions.updateColumnOrder(newData));
}

export function updateColumnToComplete(newData) {
  dispatch(slice.actions.updateColumnToComplete(newData));
}

export function markAsComplete(newData) {
  dispatch(slice.actions.updateTasks(newData));
}