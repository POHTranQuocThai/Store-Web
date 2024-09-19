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


function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [stateProduct, setStateProduct] = useState({
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
    const getAllProducts = async () => {
        const res = await ProductServer.getAllProduct()
        return res
    }
    const { isLoading: isLoadingProducts, data: products } = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    const { data, isLoading, isSuccess, isError } = mutation
    console.log('prod', products);
    const renderAction = () => {
        return <div>
            <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} />
            <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} />
        </div>
    }
    useEffect(() => {
        if (isSuccess && data?.status === 200) {
            success()
        } else if (isError) {
            error()
        }
    }, [isSuccess, isError])
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
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
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
    return (
        <div>
            <WrapperHeader>Thông tin sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button onClick={() => setIsModalOpen(true)} style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isLoading={isLoadingProducts} data={dataTable} />
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
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="Name"
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
                        name="Type"
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
                        name="Price"
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
                        name="Count inStock"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Count inStock!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.countInstock} name='countInStock' onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="Rating"
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
                        name="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Description!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.descriptions} name='description' onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="Image"
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
        </div>
    )
}

export default AdminProduct