import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
export interface IDataTable {
    code: string,
    name: string,
    quantity: string
}
class Table extends React.Component {

    render() {
        const data: IDataTable[] = [
            {
                code: '123',
                name: 'Công',
                quantity: '11'
            },
            {
                code: '456',
                name: 'Thắng',
                quantity: '15'
            },
        ]
        return (
            <table>
                <TableHeader />
                <TableBody dataSource={data} />
            </table>
        )
    }
}
export default Table