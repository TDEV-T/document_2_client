import React, { useState, useEffect, useMemo } from "react";
//Mui
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableHead,
} from "@mui/material";
//Mui icon
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

//function
import { getFileAll } from "../../functions/file";
import ModalDetail from "./ModalDetail";
import ModalEditFile from "./ModalEditFile";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(id, title, content, category, files) {
  return { id, title, content, category, files };
}

const columns = [
  { id: "title", label: "หัวข้อ", minWidth: 100 },
  { id: "content", label: "เนื้อหา", minWidth: 150 },
  { id: "category", label: "ประเภท", minWidth: 100 },
  { id: "details", label: "รายละเอียด", minWidth: 100 },
  { id: "manage", label: "จัดการ", minWidth: 100 },
];

const TableAdmin = () => {
  const [dataFileAll, setdataFileAll] = useState([]);

  const tokenid = localStorage.getItem("access_token");
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getFileAll(tokenid)
      .then((fileall) => {
        setdataFileAll(fileall.data);
      })
      .catch((err) => console.log(err));
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = useMemo(() => {
    return dataFileAll.map((item) => {
      return createData(
        item._id,
        item.title,
        item.content,
        item.category,
        item.files
      );
    });
  }, [dataFileAll]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ width: 100 }} component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell style={{ width: 200 }}>{row.content}</TableCell>
              <TableCell style={{ width: 100 }}>{row.category}</TableCell>
              <TableCell style={{ width: 100 }}>
                <ModalDetail
                  key={row.id}
                  id={row.id}
                  files={row.files}
                  title={row.title}
                  content={row.content}
                  style={{ widht: 100 }}
                />
              </TableCell>
              <TableCell style={{ width: 100 }}>
                <ModalEditFile
                  key={row.id}
                  id={row.id}
                  files={row.files}
                  title={row.title}
                  content={row.content}
                />
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableAdmin;
