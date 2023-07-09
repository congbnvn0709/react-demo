import { TableHead, TableRow, TableCell } from "@mui/material";

export interface IHeader {
    headerName: string;
    align: 'right' | 'left' | 'center',
    property: string
}
export interface ITableHeader {
    colHeader: IHeader[]
}
function TableHeader(props: ITableHeader) {
    const { colHeader } = props;
    return (
        <TableHead>
            <TableRow>
                {colHeader.map((item, index) => (
                    <TableCell key={index} align={item.align}>{item.headerName}</TableCell>
                ))}

                <TableCell align='center'>Thao tác</TableCell>
            </TableRow>
        </TableHead>
    )
}
export default TableHeader;