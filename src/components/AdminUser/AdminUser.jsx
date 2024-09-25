import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Image, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import InputComponent from '../InputComponent/InputComponent'
import Loading from '../LoadingComponent/LoadingComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { getBase64 } from '../../utils/utils'
import { error, success } from '../MessageComponent/MessageComponent'
import { useQuery } from '@tanstack/react-query'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'

function AdminUser() {
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const searchInput = useRef(null);
    const user = useSelector(state => state?.users)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        address: ''
    })
    const [form] = Form.useForm()

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data
            const res = UserService.updateUser(
                id,
                token,
                { ...rests }
            )
            return res
        }
    )
    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, token } = data
            const res = UserService.deleteUser(
                id,
                token
            )
            return res
        }
    )

    const getAllUsers = async () => {
        const res = await UserService.getAllUser()
        return res
    }
    const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const { isLoading: isLoadingUsers, data: users } = queryUser
    const fetchGetDetailsUser = async () => {
        const res = await UserService.getDetailUser(rowSelected)
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
                address: res?.data?.address,
                avatar: res?.data?.avatar
            })
        }
        setIsLoadingUpdate(false)
    }
    //Use Effect
    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsUser(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 200) {
            success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            error()
        }
    }, [isSuccessUpdated, isErrorUpdated])
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 200) {
            success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            error()
        }
    }, [isSuccessDeleted, isErrorDeleted])

    const renderAction = () => {
        return <div>
            <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
            <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsUser} />
        </div>
    }
    //Handle 
    const handleDetailsUser = () => {
        setIsOpenDrawer(true)
    }
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }
    const handleDeleteUser = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            address: '',
        })
        form.resetFields()
    }
    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview
        })
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: '#ffc069',
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'Admin',
                    value: true,
                },
                {
                    text: 'User',
                    value: false,
                },
            ],
            onFilter: (value, record) => {
                if (value === true) {
                    return record.isAdmin === 'True'
                }
                return record.isAdmin === 'False'
            },
            width: '30%'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => Number(a.phone) - Number(b.phone),
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ]
    const dataTable = users?.data?.length && users?.data?.map((user) => {
        return {
            ...user,
            key: user._id,
            isAdmin: user.isAdmin ? 'True' : 'False'
        }
    })
    const onUpdateUser = () => {
        mutationUpdate.mutate({
            id: rowSelected, token: user?.access_token, ...stateUserDetails
        }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }
    return <div>
        <WrapperHeader>Thông tin người dùng</WrapperHeader>
        <div style={{ marginTop: '10px' }}>
            <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
                <PlusOutlined style={{ fontSize: '60px' }} />
            </Button>
        </div>
        <div style={{ marginTop: '20px' }}>
            <TableComponent columns={columns} isLoading={isLoadingUsers} data={dataTable}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: even => {
                            setRowSelected(record._id)
                        }
                    }
                }}
            />
        </div>
        <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() =>
            setIsOpenDrawer(false)
        } width='90%' >
            <Loading isLoading={isLoadingUpdate || isLoadingUsers}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 2,
                    }}
                    wrapperCol={{
                        span: 22,
                    }}
                    onFinish={onUpdateUser}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUserDetails['name']} name='name' onChange={handleOnChangeDetails} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUserDetails['email']} name='email' onChange={handleOnChangeDetails} />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Phone!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUserDetails['phone']} name='phone' onChange={handleOnChangeDetails} />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUserDetails['address']} name='address' onChange={handleOnChangeDetails} />
                    </Form.Item>
                    <Form.Item
                        label="Avatar"
                        name="avatar"
                    >
                        <WrapperUploadFile onChange={handleOnChangeAvatarDetails} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select file</Button>
                            {stateUserDetails?.avatar && (<Image src={stateUserDetails.avatar} alt='avatar' style={{ marginLeft: '10px', width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />)}
                        </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 20,
                            span: 14,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
            </Loading>
        </DrawerComponent>
        <ModalComponent forceRender title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
            <div>Bạn có muốn xóa người dùng này không ?</div>
        </ModalComponent>
    </div>
}

export default AdminUser