import React from 'react';

interface Column {
    name: string;
    accessor: string;
}

interface Entity {
    id: string;
}

interface Props<T> {
    columns: Column[];
    data: T[];
}

function Table<T extends Entity>({ columns, data }: Props<T>) {
    return (
        <table>
            <thead>
            <tr>
                {columns.map(column => (
                    <th key={'th-' + column.name}>{column.name}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map(row => (
                <tr key={'tr-' + row.id}>
                    {columns.map(column => (
                        <td key={'tr-' + row.id + '-td-' + column.name}>{row[column.accessor]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;
