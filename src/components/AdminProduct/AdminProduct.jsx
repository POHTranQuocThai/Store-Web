import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from '../AdminUser/style'
import { Button, Form, Image, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { WrapperUploadFile } from '../../pages/ProfileUser/style'
import { getBase64 } from '../../utils/utils'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as ProductServer from '../../services/ProductService'
import { error, success } from '../MessageComponent/MessageComponent'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/LoadingComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'


function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const searchInput = useRef(null);
    const user = useSelector(state => state?.users)
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: ''
    })
    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: ''
    })
    const [form] = Form.useForm()
    const mutation = useMutationHooks(
        (data) => {
            const { name,
                price,
                description,
                rating,
                image,
                type,
                countInStock } = data
            const res = ProductServer.createProduct({
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock
            })
            return res
        }
    )
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data
            const res = ProductServer.updateProduct(
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
            const res = ProductServer.deleteProduct(
                id,
                token
            )
            return res
        }
    )
    const mutationDeleteMany = useMutationHooks(
        (data) => {
            const { token, ...ids } = data
            const res = ProductServer.deleteMany(
                ids,
                token
            )
            return res
        }
    )

    const getAllProducts = async () => {
        const res = await ProductServer.getAllProduct()
        return res
    }
    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany
    const { isLoading: isLoadingProducts, data: products } = queryProduct
    const fetchGetDetailsProduct = async () => {
        const res = await ProductServer.getDetailsProduct(rowSelected)
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock
            })
        }
        setIsLoadingUpdate(false)
    }
    //Use Effect
    useEffect(() => {
        form.setFieldsValue(stateProductDetails)
    }, [form, stateProductDetails])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    useEffect(() => {
        if (isSuccess && data?.status === 200) {
            success()
            handleCancel()
        } else if (isError) {
            error()
        }
    }, [isSuccess, isError])
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
    useEffect(() => {
        if (isErrorDeletedMany && dataDeletedMany?.status === 200) {
            success()
            handleCancelDelete()
        } else if (isErrorDeletedMany) {
            error()
        }
    }, [isErrorDeletedMany, isErrorDeletedMany])

    const renderAction = () => {
        return <div>
            <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
            <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
        </div>
    }
    //Handle 
    const handleDeleteManyProducts = (ids) => {
        mutationDeleteMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInstock: ''
        })
        form.resetFields()
    }
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }
    const handleDeleteProduct = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInstock: ''
        })
        form.resetFields()
    }
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }
    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }


    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }
    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
    }
    const onFinish = () => {
        mutation.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch()
            }
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
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
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
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50
                }
                return record.price <= 50
            },
            width: '30%',

        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.rating) >= 3
                }
                return Number(record.rating) <= 3
            },
            width: '30%'
        },
        {
            title: 'Type',
            dataIndex: 'type',

        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ]
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {
            ...product,
            key: product._id
        }
    })
    const onUpdateProduct = () => {
        mutationUpdate.mutate({
            id: rowSelected, token: user?.access_token, ...stateProductDetails
        }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    return (
        <div>
            <WrapperHeader>Thông tin sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button onClick={() => setIsModalOpen(true)} style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDeleteManyProducts={handleDeleteManyProducts} columns={columns} isLoading={isLoadingProducts} data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: even => {
                                setRowSelected(record._id)
                            }
                        }
                    }}
                />
            </div>
            <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onText='' onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
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
                        <InputComponent value={stateProduct.name} name='name' onChange={handleOnChange} />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Type!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.type} name='type' onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Price!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.price} name='price' onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item
                        label="Count inStock"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Count inStock!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.countInStock} name='countInStock' onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Rating!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.rating} name='rating' onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Description!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.description} name='description' onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Image!',
                            },
                        ]}
                    >
                        <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select file</Button>
                            {stateProduct?.image && (<Image src={stateProduct.image} alt='avatar' style={{ marginLeft: '10px', width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />)}
                        </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 20,
                            span: 14,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </ModalComponent>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() =>
                setIsOpenDrawer(false)
            } width='90%' >
                <Loading isLoading={isLoadingUpdate || isLoadingProducts}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 2,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        onFinish={onUpdateProduct}
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
                            <InputComponent value={stateProductDetails['name']} name='name' onChange={handleOnChangeDetails} />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Type!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProductDetails['type']} name='type' onChange={handleOnChangeDetails} />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Price!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProductDetails['price']} name='price' onChange={handleOnChangeDetails} />
                        </Form.Item>
                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Count inStock!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProductDetails['countInStock']} name='countInStock' onChange={handleOnChangeDetails} />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Rating!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProductDetails['rating']} name='rating' onChange={handleOnChangeDetails} />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Description!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProductDetails['description']} name='description' onChange={handleOnChangeDetails} />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Image!',
                                },
                            ]}
                        >
                            <WrapperUploadFile onChange={handleOnChangeAvatarDetails} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Select file</Button>
                                {stateProductDetails?.image && (<Image src={stateProductDetails.image} alt='avatar' style={{ marginLeft: '10px', width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />)}
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
            <ModalComponent forceRender title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
                <div>Bạn có muốn xóa sản phẩm này không ?</div>
            </ModalComponent>
        </div>
    )
}

export default AdminProduct