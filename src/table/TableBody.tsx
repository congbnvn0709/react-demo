import React from "react";
import { IDataTable } from "./Table";

interface ITableDataProps {
    dataSource: IDataTable[]
}

class TableBody extends React.Component<ITableDataProps> {

    render() {
        const rows = this.props.dataSource.map((row, index) => {
            return (
                <tr key={index}>
                    <td>{row.code}</td>
                    <td>{row.name}</td>
                    <td>{row.quantity}</td>
                </tr>
            )
        })
        return (
            <tbody>
                {rows}
            </tbody>
        )
    }
}
export default TableBody