import { TableContainer, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Table } from "@mui/material";
import TableHeader, { IHeader } from "./TableHeader";
import TableBodyTmpl from "./TableBody";
import { IProduct } from "../../utils/model/payload";
import React, { useEffect, useState } from "react";

export interface ITable {
  header: IHeader[];
  body: Partial<IProduct[]> | undefined;
  deleteItem: (rows: IProduct) => void;
  onUpdateItem: (rows: IProduct) => void;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalElements: number;
}
function TableCommon(props: ITable) {
  const {
    header,
    body,
    deleteItem,
    onUpdateItem,
    page,
    rowsPerPage,
    handleChangePage,
    totalElements,
    handleChangeRowsPerPage,
  } = props;

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader colHeader={header} />
          <TableBodyTmpl
            dataRows={body}
            colHeader={header}
            onDelete={deleteItem}
            onUpdateItem={onUpdateItem}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default TableCommon;
