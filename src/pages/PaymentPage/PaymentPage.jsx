
import { Row, Col, Form, Radio } from 'antd';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { convertPrice } from '../../utils/utils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import { error, success } from '../../components/MessageComponent/MessageComponent';
import { updateUser } from '../../redux/slice/userSlide';
import { WrapperRadio } from './style';
import { useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '../../redux/slice/orderSlide';

const PaymentPage = () => {
    const order = useSelector(state => state?.order)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector(state => state.users)
    const [delivery, setDilivery] = useState('')
    const [payment, setPayment] = useState('')
    const navigate = useNavigate()
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: ''
    })
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])

    useEffect(() => {
        if (isModalOpenDelete) {
            setStateUserDetails({
                name: user?.name,
                phone: user?.phone,
                city: user?.city,
                address: user?.address
            })
        }
    }, [isModalOpenDelete])


    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    const provisional = useMemo(() => {
        const result = order?.selectedItemOrder?.reduce((total, cur) => {
            return total + (cur?.amount * cur?.price)
        }, 0)
        return result
    }, [order])
    const discountPrice = useMemo(() => {
        const result = order?.selectedItemOrder?.reduce((total, cur) => {
            return total + (cur?.discount * cur?.amount)
        }, 0)
        return (Number(result) && Number(result)) || 0
    }, [order])
    const deliveryPrice = useMemo(() => {
        if (provisional > 500000) {
            return 30000
        } else if (provisional === 0) {
            return 0
        } else {
            return 20000
        }
    }, [provisional])

    const totalPrice = useMemo(() => {
        return provisional - discountPrice + deliveryPrice
    }, [provisional, discountPrice, deliveryPrice])


    const handleAddOrder = () => {
        if (!delivery) {
            error('Vui lòng chọn phương thức giao hàng!')
        } else if (!payment) {
            error('Vui lòng chọn phương thức thanh toán!')
        }
        else if (user?.access_token && order?.selectedItemOrder && user?.name && user?.address && user?.phone && user?.city
            && provisional && user?.id && payment
        ) {
            mutationAddOrder.mutate({
                token: user?.access_token, fullName: user?.name, orderItems: order?.selectedItemOrder,
                address: user?.address, phone: user?.phone, city: user?.city, paymentMethod: payment,
                user: user?.id, itemsPrice: provisional, shippingPrice: deliveryPrice, totalPrice: totalPrice
            })
        }
    }

    const handleCancelUpdate = () => {
        setIsModalOpenDelete(false)
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            address: '',
        })
        form.resetFields()
    }
    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data
        const res = UserService.updateUser(
            id,
            token,
            { ...rests }
        )
        return res
    })
    const mutationAddOrder = useMutationHooks((data) => {
        const { token, ...rests } = data
        const res = OrderService.createOrder(
            token,
            { ...rests }
        )
        return res
    })
    const { data } = mutationUpdate
    const { isSuccess: isSuccessAddOrder, isError: isErrorAddOrder, data: dataAdd } = mutationAddOrder

    useEffect(() => {
        if (isSuccessAddOrder && dataAdd?.status === 200) {
            const arrayOrdered = []
            order?.selectedItemOrder?.forEach(element => {
                arrayOrdered.push(element?.product)
            })
            dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
            success('Đặt hàng thành công')
            navigate('/orderSuccess', {
                state: {
                    payment,
                    delivery,
                    orders: order?.selectedItemOrder,
                    totalPrice: totalPrice
                }
            })
        } else if (isErrorAddOrder) {
            error('Đặt hàng không thành công!')
        }
    }, [isSuccessAddOrder, isErrorAddOrder])

    const handleUpdateInfoUser = () => {
        const { name, phone, city, address } = stateUserDetails
        if (name && phone && city && address) {
            mutationUpdate.mutate({
                id: user?.id, token: user?.access_token, ...stateUserDetails
            }, {
                onSuccess: () => {
                    setIsModalOpenDelete(false)
                    dispatch(updateUser({ name, phone, city, address }))
                }
            })
        }
    }
    const handleChangeAddress = () => {
        setIsModalOpenDelete(true)
    }
    const handleDilivery = (e) => {
        setDilivery(e.target.value)
    }
    const handlePayment = (e) => {
        setPayment(e.target.value)
    }
    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '20px 0' }}>
            <p style={{ padding: '0 120px', fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>Thanh toán</p>

            <Row justify="center" style={{ maxWidth: '1250px', margin: '0 auto' }}>
                {/* Cột Giỏ hàng */}
                <Col xs={24} md={17} style={{ background: '#fff', padding: '20px', marginRight: '20px', borderRadius: '8px' }}>
                    <Row>
                        <div>
                            <label>Chọn phương thức giao hàng</label>
                            <WrapperRadio onChange={handleDilivery} value={delivery}>
                                <Radio defaultChecked value={'fast'}><span style={{ color: '#ea8500', fontWeight: 'bold' }}>Fast </span>Giao hàng nhanh</Radio>
                                <Radio value={'gojek'}><span style={{ color: '#ea8500', fontWeight: 'bold' }}>Gojek </span>Giao hàng tiết kiệm</Radio>
                            </WrapperRadio>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <label>Chọn phương thức thanh toán</label>
                            <WrapperRadio onChange={handlePayment} value={payment}>
                                <Radio defaultChecked value={'later_money'}>Thanh toán khi nhận hàng</Radio>
                            </WrapperRadio>
                        </div>
                    </Row>
                </Col>

                {/* Cột Tổng tiền */}
                <Col xs={24} md={6} style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
                    <Row style={{ marginBottom: '20px', paddingBottom: '10px' }}>
                        <div>
                            <span>Địa chỉ: </span>
                            <span style={{ fontWeight: '500' }}>{`${user?.address} ${user?.city}`} </span>
                            <span onClick={handleChangeAddress} style={{ cursor: 'pointer', fontSize: '12px', fontStyle: 'italic', color: 'blue' }}>Thay đổi</span>
                        </div>
                    </Row>
                    <Row justify="space-between" style={{ marginBottom: '10px' }}>
                        <Col>Tạm tính</Col>
                        <Col>{convertPrice(provisional)}</Col>
                    </Row>
                    <Row justify="space-between" style={{ marginBottom: '10px' }}>
                        <Col>Giảm giá</Col>
                        <Col>{`${discountPrice} %`}</Col>
                    </Row>
                    <Row justify="space-between" style={{ marginBottom: '10px' }}>
                        <Col>Phí giao hàng</Col>
                        <Col>{convertPrice(deliveryPrice)}</Col>
                    </Row>
                    <Row justify="space-between" align="middle" style={{ paddingTop: '20px' }}>
                        <Col style={{ fontWeight: '600' }}>Tổng tiền</Col>
                        <Col>
                            <span style={{ fontSize: '25px', fontWeight: '600', color: 'red' }}>{convertPrice(totalPrice)}</span>
                            <p style={{ fontSize: '12px', fontWeight: '500' }}>(Đã bao gồm VAT nếu có)</p>
                        </Col>
                    </Row>
                    <ButtonComponent onClick={() => handleAddOrder()} style={{ marginTop: '20px', background: 'red', width: '100%', height: '40px' }} styleTextBtn={{ color: '#fff' }} textButton={'Đặt hàng'}></ButtonComponent>
                </Col>
            </Row >
            <ModalComponent forceRender title="Cap nhat thong tin user" open={isModalOpenDelete} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
                {/* <Loading > */}
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    // onFinish={onUpdateUser}
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
                        label="City"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your City!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUserDetails['city']} name='city' onChange={handleOnChangeDetails} />
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
                </Form>
                {/* </Loading> */}
            </ModalComponent>
        </div >
    )
};
export default PaymentPage;
