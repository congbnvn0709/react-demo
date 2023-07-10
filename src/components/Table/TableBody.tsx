import { Button, Fab, TableCell, TableRow } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { IHeader } from "./TableHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IProduct } from "../../utils/model/payload";
import { Dispatch, SetStateAction } from "react";

export interface IBody {
  dataRows: Partial<IProduct[]> | undefined;
  colHeader: IHeader[];
  onDelete: (rows: IProduct) => void;
  onUpdateItem: (rows: IProduct) => void;
  page: number;
  rowsPerPage: number;
}
function TableBodyTmpl(props: IBody) {
  const { dataRows, colHeader, onDelete, onUpdateItem, page, rowsPerPage } =
    props;

  return (
    <TableBody>
      {dataRows &&
        dataRows
          // pagination client
          // (rowsPerPage > 0
          //     ? dataRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          //     : dataRows
          // )
          .map(
            (row, index) =>
              row && (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {colHeader.map((item, index) => (
                    <TableCell
                      key={index}
                      component="th"
                      scope="row"
                      align={item.align}
                    >
                      {row[item.property as keyof IProduct]}
                    </TableCell>
                  ))}
                  <TableCell component="th" scope="row" align="center">
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="delete"
                      sx={{ mr: 2 }}
                    >
                      <DeleteIcon onClick={() => onDelete(row)} />
                    </Fab>
                    <Fab size="small" color="primary" aria-label="edit">
                      <EditIcon onClick={() => onUpdateItem(row)} />
                    </Fab>
                  </TableCell>
                </TableRow>
              )
          )}
    </TableBody>
  );
}
export default TableBodyTmpl;
