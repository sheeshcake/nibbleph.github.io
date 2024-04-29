import React, { useState, useEffect, useCallback } from "react";

// material
import { styled, useTheme, alpha } from "@mui/material/styles";

// @mui
import PropTypes, { object } from "prop-types";
import {
  Box,
  CircularProgress,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Button,
  OutlinedInput,
  InputAdornment,
  Stack,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  Skeleton,
  Grid,
  CardActions,
  Paper,
  Switch,
  FormControlLabel,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

import SearchNotFound from "../search-not-found/SearchNotFound";
import Iconify from "../iconify";
import EmptyContent from "../empty-content/EmptyContent";
import { IconButtonAnimate } from "../animate";

import DialogModal, { useDialog } from "../dialog-modal/DialogModal";
import { DraggableComponent, DroppableComponent, reorder } from "../Draggable";

import AppListHead from "./AppListHead";
import AppToolBar from "./AppToolBar";
import Scrollbar from "../scrollbar/Scrollbar";
// ----------------------------------------------------------------------

AppTable.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  tableRow: PropTypes.array,
  dataRows: PropTypes.array,
  tableData: PropTypes.array,
  deletableHeader: PropTypes.bool,
  disableCheckBox: PropTypes.bool,
  tableDraggable: PropTypes.func,
  tableDraggableOnChange: PropTypes.func,
  loading: PropTypes.bool,
  actionFunctions: PropTypes.any,
  customCheckBox: PropTypes.func,
  disableSelectAllCheckBox: PropTypes.bool,
  customDeleteMessage: PropTypes.string,
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

export default function AppTable({
  tableRow,
  tableDraggable,
  tableConfirmDelete,
  tablePagination = false,
  tablePage,
  tableCurrentPage,
  tablePerPage,
  tableCount,
  tableDraggableOnChange,
  tableSearchResults,
  onSelect,
  select = [],
  tableStyle,
  deletableHeader = false,
  disableCheckBox = false,
  customCheckBox,
  actionFunctions,
  customOnSelectAll,
  customHandleClick,
  customToolBar,
  customDeleteMessage,
  disableSelectAllCheckBox = false,
  loading = false,
  moreMenu,
  dataRows,
  title,
  subheader,
  tableData,
  tableTotalData,
  onDeleteMultiple,
  tableSearch,
  ...other
}) {
  const theme = useTheme();

  const [tableRows, setTableRows] = useState([]);

  const [tableCellSize, setTableCellSize] = useState(true);

  const [open, openDialog, dialogProps, setOpen] = useDialog();

  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("desc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("id");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(tableRow ? tableRow[0] : 25);

  const [count, setCount] = useState(0);

  const filtered = applySortFilter(data, getComparator(order, orderBy));

  const isUserNotFound = filtered.length === 0;

  const [deleteStat, setDeleteStat] = useState("");

  const [deleteId, setDeleteId] = useState("");

  const [paginationCounter, setTablePaginationCounter] = useState({});

  useEffect(() => {
    if (dataRows) setTableRows(dataRows);
  }, [dataRows]);

  useEffect(() => {
    let startRow = (tableCurrentPage - 1) * rowsPerPage + 1;
    let endRow = tableCurrentPage * rowsPerPage;

    if (endRow > tableTotalData) {
      endRow = tableTotalData;
    }
    setTablePaginationCounter({
      startRow,
      endRow,
    });
  }, [tableCurrentPage, rowsPerPage, tableTotalData]);

  useEffect(() => {
    if (tableSearchResults) tableSearchResults(filterName);
  }, [filterName]);

  useEffect(() => {
    if (select.length !== 0) setSelected(select);
  }, [select]);

  useEffect(() => {
    if (tableCount) setCount(tableCount);
  }, [tableCount]);

  useEffect(() => {
    setData(filterName !== "" ? filtered : tableData);
  }, [filterName]);

  useEffect(() => {
    setData(tableData);
    // if (tableDraggable) tableDraggable(tableData);
  }, [tableData]);

  useEffect(() => {
    if (filterName) {
      const filteredRows = tableData.filter((row) => {
        // iterate through each column
        for (let i = 0; i < tableRows.length; i++) {
          // check if the column is a string
          if (typeof row[tableRows[i].id] === "string") {
            // check if the column contains the filter string
            if (
              row[tableRows[i].id]
                .toLowerCase()
                .includes(filterName.toLowerCase())
            ) {
              return true;
            }
          }
        }
        return false;
      });
      setData(filteredRows);
    } else {
      setData(tableData);
    }
  }, [filterName]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setData(filtered);
  };

  function applySortFilter(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleSelectAllClick = (event) => {
    if (customOnSelectAll) {
      if (event.target.checked) {
        setSelected(customOnSelectAll(data));
        if (onSelect) onSelect(customOnSelectAll(data));
        return;
      }
    } else {
      if (event.target.checked) {
        const newSelecteds = data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((n) => n.id);
        setSelected(newSelecteds);
        if (onSelect) onSelect(newSelecteds);
        return;
      }
    }

    setSelected([]);
    if (onSelect) onSelect([]);
  };

  const handleClick = (event, name) => {
    let newSelected = [];

    if (customHandleClick) {
      newSelected = customHandleClick(name, selected);
    } else {
      const selectedIndex = selected.indexOf(name);
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
    }

    if (onSelect) onSelect(newSelected);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    if (tablePerPage) tablePerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const onDragEnd = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const items = reorder(
        data,
        result.source.index,
        result.destination.index
      );

      if (tableDraggableOnChange) tableDraggableOnChange(items);
      setData(items);
      tableDraggable(items);
    },
    [data]
  );

  const confirmDelete = (action, id) => {
    if (id) {
      setDeleteId(id);
    }
    setOpen(true);
    setDeleteStat(action);
  };

  const actionDelete = () => {
    if (deleteStat === "multiple") {
      setSelected([]);
      onDeleteMultiple();
    }

    if (deleteStat === "multipleConfirmWithPassword") {
      onDeleteMultiple();
    }
    if (deleteStat === "single") {
      actionFunctions.onDelete(deleteId);
      if (onSelect) onSelect([]);
      setSelected([]);
    }
    setOpen(false);
  };

  return (
    <>
      <Card {...tableStyle}>
        <CardHeader title={title} subheader={subheader} />
        <AppToolBar
          numSelected={selected.length}
          deletableHeader={deletableHeader}
          onDeleteMultiple={() => {
            if (tableConfirmDelete) {
              confirmDelete("multipleConfirmWithPassword");
            } else {
              confirmDelete("multiple");
            }
          }}
        >
          {customToolBar ? (
            customToolBar({ filterName, handleFilterByName })
          ) : (
            <>
              <Stack>
                <SearchStyle
                  value={filterName}
                  onChange={handleFilterByName}
                  placeholder="Search..."
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify
                        icon="eva:search-fill"
                        sx={{ color: "text.disabled" }}
                      />
                    </InputAdornment>
                  }
                />
                <Box sx={{ paddingTop: 1 }}>
                  <Typography variant="subtitle1" fontSize={12} >FILTERS</Typography>
                </Box>
              </Stack>
            </>
          )}
        </AppToolBar>
        <CardContent>
          <Scrollbar>
            <Box marginBottom={2}>
              <Stack direction="row" spacing={1}>
                {tableRows.map((data, index) => (
                  <Chip
                    key={index}
                    sx={{
                      backgroundColor: theme.palette.minimal.main,
                      color: theme.palette.minimal.contrastText,
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1006%26quot%3b)' fill='none'%3e%3cpath d='M-74.41 408.61L-74.41 408.61' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-74.41 408.61L-53.12 496.52' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-74.41 408.61L93.41 342.91' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-74.41 408.61L83.52 545.69' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-74.41 408.61L193.47 402.46' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-53.12 496.52L-53.12 496.52' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-53.12 496.52L83.52 545.69' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-53.12 496.52L-56.93 683.69' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-53.12 496.52L93.41 342.91' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-53.12 496.52L45 699.32' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-53.12 496.52L193.47 402.46' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-56.93 683.69L-56.93 683.69' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-56.93 683.69L45 699.32' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-56.93 683.69L83.52 545.69' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-56.93 683.69L-74.41 408.61' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-56.93 683.69L240.49 659.28' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M93.41 342.91L93.41 342.91' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M93.41 342.91L193.47 402.46' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M93.41 342.91L83.52 545.69' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M83.52 545.69L83.52 545.69' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M83.52 545.69L215.82 536.35' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M83.52 545.69L45 699.32' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M83.52 545.69L193.47 402.46' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M45 699.32L45 699.32' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M45 699.32L240.49 659.28' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M45 699.32L215.82 536.35' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M193.47 402.46L193.47 402.46' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M193.47 402.46L215.82 536.35' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M193.47 402.46L373.31 558.9' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M215.82 536.35L215.82 536.35' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M215.82 536.35L240.49 659.28' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M240.49 659.28L240.49 659.28' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M240.49 659.28L389.55 645.16' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M240.49 659.28L373.31 558.9' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M240.49 659.28L83.52 545.69' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M373.31 558.9L373.31 558.9' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M373.31 558.9L389.55 645.16' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M373.31 558.9L492.98 530.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M373.31 558.9L215.82 536.35' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M389.55 645.16L389.55 645.16' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M389.55 645.16L492.98 530.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M389.55 645.16L559.31 668.48' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M558.14 261.9L558.14 261.9' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M558.14 261.9L491.94 393.29' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M558.14 261.9L492.98 530.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M558.14 261.9L831.68 214.37' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M558.14 261.9L687.99 547.13' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M491.94 393.29L491.94 393.29' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M491.94 393.29L492.98 530.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M491.94 393.29L373.31 558.9' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M491.94 393.29L687.99 547.13' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M491.94 393.29L389.55 645.16' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M491.94 393.29L559.31 668.48' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M492.98 530.68L492.98 530.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M492.98 530.68L559.31 668.48' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M559.31 668.48L559.31 668.48' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M559.31 668.48L703.82 674.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M687.99 547.13L687.99 547.13' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M687.99 547.13L703.82 674.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M687.99 547.13L840.88 554.59' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M687.99 547.13L559.31 668.48' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M703.82 674.68L703.82 674.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M703.82 674.68L850.85 639.2' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M703.82 674.68L840.88 554.59' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M831.68 214.37L831.68 214.37' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M831.68 214.37L944.86 339.21' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M831.68 214.37L856.81 384.7' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M856.81 384.7L856.81 384.7' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M856.81 384.7L944.86 339.21' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M856.81 384.7L840.88 554.59' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M840.88 554.59L840.88 554.59' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M840.88 554.59L850.85 639.2' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M840.88 554.59L988.2 495.98' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M840.88 554.59L944.93 701.22' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M850.85 639.2L850.85 639.2' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M850.85 639.2L944.93 701.22' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M850.85 639.2L687.99 547.13' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M850.85 639.2L988.2 495.98' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M850.85 639.2L1095.56 696.3' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M992.97 -65.27L992.97 -65.27' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M992.97 -65.27L1130.48 -92.21' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M992.97 -65.27L984.87 101.83' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M992.97 -65.27L1239.15 -97.81' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M984.87 101.83L984.87 101.83' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M984.87 101.83L1010.95 229.02' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M984.87 101.83L831.68 214.37' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1010.95 229.02L1010.95 229.02' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1010.95 229.02L944.86 339.21' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1010.95 229.02L1158.68 217.88' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M944.86 339.21L944.86 339.21' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M944.86 339.21L988.2 495.98' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M988.2 495.98L988.2 495.98' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M988.2 495.98L1095.02 503.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M988.2 495.98L856.81 384.7' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M944.93 701.22L944.93 701.22' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M944.93 701.22L1095.56 696.3' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M944.93 701.22L988.2 495.98' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M944.93 701.22L703.82 674.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M944.93 701.22L1095.02 503.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1130.48 -92.21L1130.48 -92.21' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1130.48 -92.21L1239.15 -97.81' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1158.68 217.88L1158.68 217.88' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1158.68 217.88L1131.39 399.92' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1158.68 217.88L1293.13 354.03' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1158.68 217.88L984.87 101.83' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1158.68 217.88L944.86 339.21' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1131.39 399.92L1131.39 399.92' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1131.39 399.92L1095.02 503.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1131.39 399.92L1293.13 354.03' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1095.02 503.68L1095.02 503.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1095.02 503.68L1286.48 520.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1095.56 696.3L1095.56 696.3' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1095.56 696.3L1095.02 503.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1095.56 696.3L1284.72 639.36' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1095.56 696.3L988.2 495.98' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1239.15 -97.81L1239.15 -97.81' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1239.15 -97.81L1446.86 -108.53' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1293.13 354.03L1293.13 354.03' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1293.13 354.03L1440.7 402.48' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1293.13 354.03L1286.48 520.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1293.13 354.03L1443.55 220.88' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1293.13 354.03L1432.95 533.17' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1286.48 520.68L1286.48 520.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1286.48 520.68L1284.72 639.36' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1286.48 520.68L1432.95 533.17' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1286.48 520.68L1400.95 655.67' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1284.72 639.36L1284.72 639.36' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1284.72 639.36L1400.95 655.67' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1446.86 -108.53L1446.86 -108.53' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1446.86 -108.53L1596.72 -104.84' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1446.86 -108.53L1427.03 56.71' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1446.86 -108.53L1579.88 83.51' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1427.03 56.71L1427.03 56.71' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1427.03 56.71L1579.88 83.51' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1427.03 56.71L1443.55 220.88' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1443.55 220.88L1443.55 220.88' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1443.55 220.88L1611.51 222.07' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1443.55 220.88L1440.7 402.48' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1443.55 220.88L1571.99 365.1' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1443.55 220.88L1579.88 83.51' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1440.7 402.48L1440.7 402.48' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1440.7 402.48L1432.95 533.17' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1440.7 402.48L1571.99 365.1' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1440.7 402.48L1550.74 497.32' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1440.7 402.48L1286.48 520.68' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1432.95 533.17L1432.95 533.17' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1432.95 533.17L1550.74 497.32' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1432.95 533.17L1400.95 655.67' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1400.95 655.67L1400.95 655.67' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1400.95 655.67L1604.33 646.73' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1400.95 655.67L1550.74 497.32' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1400.95 655.67L1440.7 402.48' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1596.72 -104.84L1596.72 -104.84' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1596.72 -104.84L1579.88 83.51' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1596.72 -104.84L1427.03 56.71' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1596.72 -104.84L1611.51 222.07' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1579.88 83.51L1579.88 83.51' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1579.88 83.51L1611.51 222.07' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1611.51 222.07L1611.51 222.07' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1611.51 222.07L1571.99 365.1' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1611.51 222.07L1427.03 56.71' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1611.51 222.07L1440.7 402.48' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1611.51 222.07L1550.74 497.32' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1571.99 365.1L1571.99 365.1' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1571.99 365.1L1550.74 497.32' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1571.99 365.1L1432.95 533.17' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1550.74 497.32L1550.74 497.32' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1550.74 497.32L1604.33 646.73' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1604.33 646.73L1604.33 646.73' stroke='rgba(2%2c 190%2c 251%2c 1)' stroke-width='1.5'%3e%3c/path%3e%3ccircle r='5' cx='-74.41' cy='408.61' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='-53.12' cy='496.52' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='-56.93' cy='683.69' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='93.41' cy='342.91' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='83.52' cy='545.69' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='45' cy='699.32' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='193.47' cy='402.46' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='215.82' cy='536.35' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='240.49' cy='659.28' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='373.31' cy='558.9' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='389.55' cy='645.16' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='558.14' cy='261.9' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='491.94' cy='393.29' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='492.98' cy='530.68' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='559.31' cy='668.48' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='687.99' cy='547.13' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='703.82' cy='674.68' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='831.68' cy='214.37' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='856.81' cy='384.7' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='840.88' cy='554.59' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='850.85' cy='639.2' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='992.97' cy='-65.27' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='984.87' cy='101.83' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1010.95' cy='229.02' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='944.86' cy='339.21' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='988.2' cy='495.98' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='944.93' cy='701.22' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1130.48' cy='-92.21' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1158.68' cy='217.88' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1131.39' cy='399.92' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1095.02' cy='503.68' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1095.56' cy='696.3' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1239.15' cy='-97.81' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1293.13' cy='354.03' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1286.48' cy='520.68' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1284.72' cy='639.36' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1446.86' cy='-108.53' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1427.03' cy='56.71' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1443.55' cy='220.88' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1440.7' cy='402.48' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1432.95' cy='533.17' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1400.95' cy='655.67' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1596.72' cy='-104.84' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1579.88' cy='83.51' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1611.51' cy='222.07' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1571.99' cy='365.1' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1550.74' cy='497.32' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3ccircle r='5' cx='1604.33' cy='646.73' fill='rgba(2%2c 190%2c 251%2c 1)'%3e%3c/circle%3e%3cpath d='M71.35 519.65L71.35 519.65' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M71.35 519.65L87.76 675.44' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M71.35 519.65L241.94 496.36' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M71.35 519.65L-106.36 501.12' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M71.35 519.65L-74.21 643.92' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1142.65 344.74L1142.65 344.74' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1142.65 344.74L1279.82 344.94' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1142.65 344.74L1132.22 195.77' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1142.65 344.74L978.39 338.95' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1142.65 344.74L1264.7 220.45' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1142.65 344.74L1094 521.67' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1142.65 344.74L1311.64 495.89' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1288.63 100.2L1288.63 100.2' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1288.63 100.2L1264.7 220.45' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1288.63 100.2L1132.22 195.77' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1264.7 220.45L1264.7 220.45' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1264.7 220.45L1279.82 344.94' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1264.7 220.45L1132.22 195.77' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1264.7 220.45L1458.74 220.62' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1264.7 220.45L1422.16 398.44' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1600.45 73.69L1600.45 73.69' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1600.45 73.69L1585.58 223.49' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1600.45 73.69L1549.66 -85.55' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1600.45 73.69L1458.06 -57.68' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1600.45 73.69L1458.74 220.62' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1561.05 685.05L1561.05 685.05' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1561.05 685.05L1442.87 673.7' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1561.05 685.05L1583.38 559.31' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1561.05 685.05L1426.57 498.77' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-106.36 501.12L-106.36 501.12' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-106.36 501.12L-74.21 643.92' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-74.21 643.92L-74.21 643.92' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M-74.21 643.92L87.76 675.44' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M87.76 675.44L87.76 675.44' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M87.76 675.44L251.68 677.22' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M241.94 496.36L241.94 496.36' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M241.94 496.36L251.68 677.22' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M251.68 677.22L251.68 677.22' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M251.68 677.22L386.15 650.14' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M251.68 677.22L71.35 519.65' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M386.15 650.14L386.15 650.14' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M386.15 650.14L534.41 507.67' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M386.15 650.14L241.94 496.36' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M538.2 402.7L538.2 402.7' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M538.2 402.7L534.41 507.67' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M538.2 402.7L386.15 650.14' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M538.2 402.7L665.61 665.12' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M538.2 402.7L805.42 537.26' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M534.41 507.67L534.41 507.67' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M534.41 507.67L665.61 665.12' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M534.41 507.67L805.42 537.26' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M534.41 507.67L241.94 496.36' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M534.41 507.67L251.68 677.22' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M665.61 665.12L665.61 665.12' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M665.61 665.12L835.11 669.63' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M665.61 665.12L805.42 537.26' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M665.61 665.12L386.15 650.14' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M841.53 382.68L841.53 382.68' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M841.53 382.68L978.39 338.95' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M841.53 382.68L941.32 489.29' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M841.53 382.68L805.42 537.26' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M841.53 382.68L835.11 669.63' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M805.42 537.26L805.42 537.26' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M805.42 537.26L835.11 669.63' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M835.11 669.63L835.11 669.63' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M835.11 669.63L987.89 668.36' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M978.39 338.95L978.39 338.95' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M978.39 338.95L941.32 489.29' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M941.32 489.29L941.32 489.29' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M941.32 489.29L805.42 537.26' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M987.89 668.36L987.89 668.36' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M987.89 668.36L1121.88 675.29' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M987.89 668.36L1094 521.67' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M987.89 668.36L941.32 489.29' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1132.22 195.77L1132.22 195.77' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1132.22 195.77L1279.82 344.94' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1132.22 195.77L978.39 338.95' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1094 521.67L1094 521.67' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1094 521.67L941.32 489.29' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1094 521.67L1121.88 675.29' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1121.88 675.29L1121.88 675.29' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1121.88 675.29L1264.81 708.74' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1279.82 344.94L1279.82 344.94' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1311.64 495.89L1311.64 495.89' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1311.64 495.89L1426.57 498.77' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1311.64 495.89L1422.16 398.44' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1311.64 495.89L1279.82 344.94' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1311.64 495.89L1264.81 708.74' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1311.64 495.89L1094 521.67' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1311.64 495.89L1442.87 673.7' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1264.81 708.74L1264.81 708.74' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1264.81 708.74L1442.87 673.7' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1458.06 -57.68L1458.06 -57.68' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1458.06 -57.68L1549.66 -85.55' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1458.74 220.62L1458.74 220.62' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1458.74 220.62L1585.58 223.49' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1458.74 220.62L1555.71 359.12' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1458.74 220.62L1422.16 398.44' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1422.16 398.44L1422.16 398.44' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1422.16 398.44L1426.57 498.77' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1422.16 398.44L1555.71 359.12' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1422.16 398.44L1279.82 344.94' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1422.16 398.44L1583.38 559.31' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1426.57 498.77L1426.57 498.77' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1442.87 673.7L1442.87 673.7' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1442.87 673.7L1426.57 498.77' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1442.87 673.7L1583.38 559.31' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1549.66 -85.55L1549.66 -85.55' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1549.66 -85.55L1585.58 223.49' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1549.66 -85.55L1458.74 220.62' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1549.66 -85.55L1288.63 100.2' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1549.66 -85.55L1264.7 220.45' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1585.58 223.49L1585.58 223.49' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1585.58 223.49L1555.71 359.12' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1585.58 223.49L1422.16 398.44' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1585.58 223.49L1458.06 -57.68' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1555.71 359.12L1555.71 359.12' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1583.38 559.31L1583.38 559.31' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3cpath d='M1583.38 559.31L1426.57 498.77' stroke='hsl(240%2c 9.7%25%2c 100%25)' stroke-width='1.5'%3e%3c/path%3e%3ccircle r='25' cx='71.35' cy='519.65' fill='url(%26quot%3b%23SvgjsRadialGradient1007%26quot%3b)'%3e%3c/circle%3e%3ccircle r='25' cx='1142.65' cy='344.74' fill='url(%26quot%3b%23SvgjsRadialGradient1007%26quot%3b)'%3e%3c/circle%3e%3ccircle r='25' cx='1288.63' cy='100.2' fill='url(%26quot%3b%23SvgjsRadialGradient1007%26quot%3b)'%3e%3c/circle%3e%3ccircle r='25' cx='1264.7' cy='220.45' fill='url(%26quot%3b%23SvgjsRadialGradient1007%26quot%3b)'%3e%3c/circle%3e%3ccircle r='25' cx='1600.45' cy='73.69' fill='url(%26quot%3b%23SvgjsRadialGradient1007%26quot%3b)'%3e%3c/circle%3e%3ccircle r='25' cx='1561.05' cy='685.05' fill='url(%26quot%3b%23SvgjsRadialGradient1007%26quot%3b)'%3e%3c/circle%3e%3ccircle r='5' cx='-106.36' cy='501.12' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='-74.21' cy='643.92' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='87.76' cy='675.44' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='241.94' cy='496.36' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='251.68' cy='677.22' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='386.15' cy='650.14' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='538.2' cy='402.7' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='534.41' cy='507.67' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='665.61' cy='665.12' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='841.53' cy='382.68' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='805.42' cy='537.26' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='835.11' cy='669.63' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='978.39' cy='338.95' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='941.32' cy='489.29' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='987.89' cy='668.36' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1132.22' cy='195.77' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1094' cy='521.67' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1121.88' cy='675.29' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1279.82' cy='344.94' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1311.64' cy='495.89' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1264.81' cy='708.74' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1458.06' cy='-57.68' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1458.74' cy='220.62' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1422.16' cy='398.44' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1426.57' cy='498.77' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1442.87' cy='673.7' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1549.66' cy='-85.55' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1585.58' cy='223.49' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1555.71' cy='359.12' fill='%23f7f7f8'%3e%3c/circle%3e%3ccircle r='5' cx='1583.38' cy='559.31' fill='%23f7f7f8'%3e%3c/circle%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1006'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cradialGradient id='SvgjsRadialGradient1007'%3e%3cstop stop-color='white' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(238%2c 238%2c 241%2c 1)' offset='0.2'%3e%3c/stop%3e%3cstop stop-color='rgba(238%2c 238%2c 241%2c 0)' offset='1'%3e%3c/stop%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.minimal.main, 0.90),
                        color: theme.palette.minimal.contrastText,
                      },
                    }}
                    avatar={
                      <Avatar
                        sx={{
                          backgroundColor: !data?.isShown
                            ? "#84a59d"
                            : "#e29578",
                        }}
                      >
                        <Iconify
                          icon={
                            data?.isShown
                              ? "eva:eye-off-2-outline"
                              : "eva:eye-outline"
                          }
                          sx={{
                            color: "white",
                          }}
                        />
                      </Avatar>
                    }
                    label={data.label}
                    onClick={() => {
                      const updatedArray = tableRows.map((item) => {
                        if (item.id === data.id) {
                          return { ...item, isShown: !item.isShown };
                        }
                        return item;
                      });

                      setTableRows(updatedArray);
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Scrollbar>

          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: "60vh" }}>
              <Table stickyHeader>
                <AppListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={tableRows}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  disableSelectAllCheckBox={disableSelectAllCheckBox}
                  actionFunctions={actionFunctions}
                />
                <TableBody
                  component={tableDraggable && DroppableComponent(onDragEnd)}
                >
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = customHandleClick
                        ? selected.findIndex(
                          (item) =>
                            item.id === row.id && row.status !== "completed"
                        ) > -1
                        : selected.indexOf(row.id) !== -1;
                      return (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                          component={
                            tableDraggable && DraggableComponent(row.id, index)
                          }
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          {!disableCheckBox && (
                            <TableCell padding="checkbox">
                              {customCheckBox ? (
                                customCheckBox(
                                  row,
                                  (event) => handleClick(event, row),
                                  isItemSelected
                                )
                              ) : (
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) =>
                                    handleClick(event, row.id)
                                  }
                                />
                              )}
                            </TableCell>
                          )}

                          {tableRows.map(
                            (head, i) =>
                              !head.isShown && (
                                <TableCell
                                  key={`${i}-column-${row.id}`}
                                  align="left"
                                  size={tableCellSize ? "small" : "medium"}
                                >
                                  {head?.value ? (
                                    head.value(row, index)
                                  ) : (
                                    <Typography variant="caption" noWrap>
                                      {row[head.id]}
                                    </Typography>
                                  )}
                                </TableCell>
                              )
                          )}

                          {actionFunctions && (
                            <TableCell align="left" size="small">
                              {moreMenu &&
                                React.cloneElement(moreMenu, {
                                  ...actionFunctions,
                                  onDelete: () => {
                                    confirmDelete("single", row.id);
                                  },
                                  objKey: row.id,
                                })}

                              {actionFunctions && (
                                <Stack direction="row" spacing={1}>
                                  {actionFunctions.onDelete && (
                                    <Tooltip
                                      title={customDeleteMessage || "Delete"}
                                    >
                                      <IconButtonAnimate
                                        onClick={() =>
                                          confirmDelete("single", row.id)
                                        }
                                        color="primary"
                                      >
                                        <Iconify
                                          icon="eva:trash-outline"
                                          sx={{ width: 20, height: 20 }}
                                        />
                                      </IconButtonAnimate>
                                    </Tooltip>
                                  )}
                                  {actionFunctions.onView && (
                                    <Tooltip title="View">
                                      <IconButtonAnimate
                                        onClick={() =>
                                          actionFunctions.onView(row.id)
                                        }
                                        color="primary"
                                      >
                                        <Iconify
                                          icon="eva:eye-outline"
                                          sx={{ width: 20, height: 20 }}
                                        />
                                      </IconButtonAnimate>
                                    </Tooltip>
                                  )}
                                  {actionFunctions.onUpdate && (
                                    <Tooltip title="Update">
                                      <IconButtonAnimate
                                        onClick={() =>
                                          actionFunctions.onUpdate(row.id)
                                        }
                                        color="primary"
                                      >
                                        <Iconify
                                          icon="eva:edit-outline"
                                          sx={{ width: 23, height: 23 }}
                                        />
                                      </IconButtonAnimate>
                                    </Tooltip>
                                  )}
                                  {actionFunctions.onDuplicate && (
                                    <Tooltip title="Duplicate">
                                      <IconButtonAnimate
                                        onClick={() =>
                                          actionFunctions.onDuplicate(row.id)
                                        }
                                        color="primary"
                                      >
                                        <Iconify
                                          icon="eva:clipboard-outline"
                                          sx={{ width: 23, height: 23 }}
                                        />
                                      </IconButtonAnimate>
                                    </Tooltip>
                                  )}
                                </Stack>
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={13}
                        sx={{ py: loading ? 0 : 3 }}
                      >
                        {loading ? (
                          // <CircularProgress />
                          [0, 1, 2, 3, 4, 5].map((data) => (
                            <Skeleton height={80} width='100%' key={data} />
                          ))
                        ) : (
                          <SearchNotFound
                            sx={{ height: 200 }}
                            key={data}
                            searchQuery={filterName}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Paper>
        </CardContent>
        {tablePagination ? (
          <Box display="flex" justifyContent="space-between" margin={2}>
            <CardActions>
              <FormControlLabel
                control={
                  <Switch
                    checked={tableCellSize}
                    onChange={(event) => {
                      setTableCellSize(event.target.checked);
                    }}
                  />
                }
                label="Dense"
              />
            </CardActions>
            <Box flexGrow={1} />
            <CardActions>
              <Scrollbar sx={{ width: 600 }}>
                <Stack
                  direction="row"
                  justifyContent="end"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography>Rows per page</Typography>
                  <FormControl size="small">
                    <Select
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                    >
                      <MenuItem value={25}>25</MenuItem>
                      <MenuItem value={75}>75</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="caption">
                    {paginationCounter?.startRow} - {paginationCounter?.endRow}{" "}
                    of {tableTotalData || <CircularProgress size={10} />}
                  </Typography>
                  <Pagination
                    page={tableCurrentPage}
                    onChange={(e, value) => {
                      if (tablePage) tablePage(value);
                    }}
                    siblingCount={0}
                    boundaryCount={1}
                    count={count}
                    variant="outlined"
                    color="primary"
                    shape="rounded"
                  />
                </Stack>
              </Scrollbar>
            </CardActions>
          </Box>
        ) : (
          <TablePagination
            rowsPerPageOptions={tableRow || [25, 50, 75, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Card>
      <DialogModal
        {...dialogProps}
        buttons={
          <>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                actionDelete();
              }}
            >
              Yes
            </Button>
          </>
        }
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="body1" marginTop={4}>
            {customDeleteMessage || "Are you sure you want to delete?"}
          </Typography>
        </Box>
      </DialogModal>
    </>
  );
}
