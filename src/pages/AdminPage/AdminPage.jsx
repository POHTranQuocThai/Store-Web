import { AppstoreOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, Switch } from 'antd'
import React, { useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminProduct from '../../components/AdminProduct/AdminProduct'

function AdminPage() {
    const [current, setCurrent] = useState('1')
    const rootSubmenuKeys = ['user', 'product']
    const [openKeys, setOpenKeys] = useState(['user'])
    const [keySelected, setKeySelected] = useState('')
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />
            case 'product':
                return <AdminProduct />
            default:
                return <></>
        }
    }
    const items = [
        {
            key: 'user',
            label: 'Người dùng',
            icon: <UserOutlined />,

        },
        {
            key: 'product',
            label: 'Sản phẩm',
            icon: <AppstoreOutlined />,
        },
    ]

    const handleOnClick = ({ item, key, keyPath, domEvent }) => {
        setKeySelected(key)
        console.log('key', keySelected);

    }

    return (
        <div>
            <HeaderComponent isHiddenCart={true} isHiddenSearch='true' />
            <div style={{ display: 'flex' }}>
                <Menu
                    onClick={handleOnClick}
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    mode="inline"
                    items={items}
                />
                <div style={{ flex: '1', padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </div>
    )
}

export default AdminPage
