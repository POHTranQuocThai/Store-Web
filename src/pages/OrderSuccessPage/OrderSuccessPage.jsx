import React from 'react'
import { WrapperInfo, WrapperLabel } from './style'
import { Col, Image, Row } from 'antd'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { contant } from '../../contant.js'
import { convertPrice } from '../../utils/utils.js'

function OrderSuccessPage() {
    const order = useSelector(state => state.order)
    const location = useLocation()
    const { state } = location
    console.log('🚀 ~ OrderSuccessPage ~ location:', location)


    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '20px 0' }}>
            <p style={{ padding: '0 120px', fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>Đơn hàng đặt thành công</p>

            <Row justify="center" style={{ maxWidth: '1250px', margin: '0 auto' }}>
                {/* Cột Giỏ hàng */}
                <Col xs={24} md={23} style={{ background: '#fff', padding: '20px', marginRight: '20px', borderRadius: '8px' }}>
                    <Row>
                        <div>
                            <WrapperLabel>Phương thức giao hàng</WrapperLabel>
                            <WrapperInfo>
                                <Row ><span style={{ color: '#ea8500', fontWeight: 'bold' }}>{contant.delivery[state?.delivery]}  </span>Giao hàng nhanh</Row>
                            </WrapperInfo>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <WrapperLabel>Phương thức thanh toán</WrapperLabel>
                            <WrapperInfo>
                                <Row >{contant.payment[state?.payment]}</Row>
                            </WrapperInfo>
                        </div>
                    </Row>
                    <Row>
                        <Col xs={24} md={24} style={{ background: '#fff', padding: '20px', marginRight: '20px', borderRadius: '8px' }}>
                            <Row style={{ fontWeight: '500', marginBottom: '20px' }} align="middle">
                                <Col span={10}>
                                    Tất cả (<span>{state?.orders?.length}</span> sản phẩm)
                                </Col>
                                <Col span={6} style={{ paddingLeft: '20px' }}>Đơn giá</Col>
                                <Col span={6} style={{ paddingLeft: '30px' }}>Số lượng</Col>
                                <Col span={2}>
                                    Trạng thái
                                </Col>
                            </Row>
                            {/* Sản phẩm mẫu */}
                            {state?.orders.map((order) => {
                                return <Row align="middle" style={{ padding: '15px 0', borderTop: '1px solid #f0f0f0' }}>
                                    <Col span={10}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Image src={order?.image} style={{ width: '80px', height: '80px' }} />
                                            {/* Điều chỉnh mô tả sản phẩm với ellipsis */}
                                            <p style={{ margin: '0px 10px 0 5px', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '16px', textOverflow: 'ellipsis', maxWidth: '260px' }}>
                                                {order?.name}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col span={6} style={{ paddingLeft: '20px' }}>{convertPrice(order?.price)}</Col>
                                    <Col span={6} style={{ paddingLeft: '50px' }}>{order?.amount}</Col>
                                    {/* <Col span={4} style={{ color: 'red' }}></Col> */}
                                    <Col span={2}>
                                        Đang xử lý
                                    </Col>
                                </Row>
                            })}
                            <Row style={{ textAlign: 'right', display: 'block' }}>
                                <Col md={24} style={{ fontWeight: '500', fontSize: '18px' }}>
                                    <span style={{ color: 'red', fontWeight: '600', fontSize: '20px' }}>Total Price:</span> {convertPrice(state?.totalPrice)}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </div >
    )
};

export default OrderSuccessPage