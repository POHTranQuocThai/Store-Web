import React, { useEffect, useState } from 'react'
import { WrapperHeader } from '../AdminUser/style'
import { Button, Form, Image, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
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


function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
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
            console.log('data', data); // Kiểm tra toàn bộ dữ liệu trước khi phân rã

            const { id, token, ...rests } = data;
            console.log('id', id); // Kiểm tra xem id có undefined không

            const res = ProductServer.updateProduct(
                id,
                token,
                { ...rests }
                // Sử dụng spread operator đúng cách
            )
            console.log('rest', rests);

            return res;
        }
    );

    const getAllProducts = async () => {
        const res = await ProductServer.getAllProduct()
        return res
    }
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
    useEffect(() => {
        form.setFieldsValue(stateProductDetails)
    }, [form, stateProductDetails])

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected])

    const handleDetailsProduct = () => {
        if (rowSelected) {
            setIsLoadingUpdate(true)
            fetchGetDetailsProduct()
        }
        setIsOpenDrawer(true)
    }
    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { isLoading: isLoadingProducts, data: products } = queryProduct
    const renderAction = () => {
        return <div>
            <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} />
            <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
        </div>
    }
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


    const onFinish = () => {
        mutation.mutate(stateProduct)
    }
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }
    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
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
    ];
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
                <TableComponent columns={columns} isLoading={isLoadingProducts} data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: even => {
                                setRowSelected(record._id)
                            }
                        }
                    }}
                />
            </div>
            <Modal title="Tạo sản phẩm" open={isModalOpen} onText='' onCancel={handleCancel}>
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
            </Modal>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() =>
                setIsOpenDrawer(false)
            } width='90%' >
                <Loading isLoading={isLoadingUpdate}>
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
        </div>
    )
}

export default AdminProduct