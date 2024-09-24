import { Table } from 'antd';
import Loading from '../LoadingComponent/LoadingComponent'
import { useState } from 'react';

function TableComponent(props) {
    const { selectionType = 'checkbox', data = [], isLoading = false, columns = [], handleDeleteManyProducts } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
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

    return (
        <Loading isLoading={isLoading}>
            {rowSelectedKeys.length > 0 &&
                <div style={{ background: '#1677ff', color: '#fff', padding: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={handleDeleteAll}
                >
                    Xóa tất cả
                </div>}
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </Loading>
    )
}

export default TableComponent