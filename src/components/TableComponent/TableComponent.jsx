import { Button, Table } from 'antd';
import Loading from '../LoadingComponent/LoadingComponent'
import { useMemo, useState } from 'react';
import { Excel } from 'antd-table-saveas-excel';

function TableComponent(props) {
    const { selectionType = 'checkbox', data: dataSource = [], isLoading = false, columns = [], handleDeleteManyProducts } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const newColumnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };
    const handleDeleteAll = () => {
        handleDeleteManyProducts(rowSelectedKeys)
    }
    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(newColumnExport)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };
    return (
        <Loading isLoading={isLoading}>
            {rowSelectedKeys.length > 0 &&
                <div style={{ background: '#1677ff', color: '#fff', padding: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={handleDeleteAll}
                >
                    Xóa tất cả
                </div>}
            <Button onClick={exportExcel}> Export excel</Button>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </Loading>
    )
}

export default TableComponent