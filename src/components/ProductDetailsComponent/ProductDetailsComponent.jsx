import { Button, Col, Image, InputNumber, Row } from 'antd'
import React from 'react'
import imageProd from '../../assets/images/prod.webp'
import imageProdSmall from '../../assets/images/prodSmall.webp'
import { WrapperProductAddress, WrapperProductPrice, WrapperQuanlityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrappperStyleTextSell } from './style'
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

function ProductDetailsComponent() {
    return (
        <Row style={{ padding: '16px', background: '#fff' }}>
            <Col span={10}>
                <Image src={imageProd} alt='image product' preview={false}></Image>
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProdSmall} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProdSmall} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProdSmall} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProdSmall} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProdSmall} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProdSmall} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                </Row>
            </Col>
            <Col style={{ padding: '0 20px', borderLeft: '2px solid #efefef' }} span={14}>
                <WrapperStyleNameProduct>Apple iPhone 15 Pro Max</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{ color: 'yellow', fontSize: '12px' }} />
                    <StarFilled style={{ color: 'yellow', fontSize: '12px' }} />
                    <StarFilled style={{ color: 'yellow', fontSize: '12px' }} /> <WrappperStyleTextSell> | Đã bán 1000+</WrappperStyleTextSell>
                </div>
                <div>
                    <WrapperProductPrice>28.490.000đ</WrapperProductPrice>
                </div>
                <WrapperProductAddress>
                    <span>Giao đến </span>
                    <span className='address'>P. Cà Mau, P. 5, Cà Mau</span>
                </WrapperProductAddress>
                <div style={{ fontSize: '20px', color: '#000', fontWeight: 400, margin: '10px 0', borderTop: '2px solid #efefef' }}>Số lượng</div>
                <WrapperQuanlityProduct>
                    <Button><PlusOutlined style={{ color: '#000', fontSize: '20px' }} /></Button>
                    <InputNumber style={{ width: '60px' }} min={1} max={10} defaultValue={2} />
                    <Button><MinusOutlined style={{ color: '#000', fontSize: '20px' }} /></Button>
                </WrapperQuanlityProduct>
                <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center', gap: '10px' }}>
                    <ButtonComponent textButton={'Chọn mua'}
                        size={40} style={{ background: 'rgb(255,57,69)', height: '48px', width: '220px', border: 'none', borderRadius: '5px' }} styleTextBtn={{ color: '#fff' }} />
                    <ButtonComponent textButton={'Mua trả sau'}
                        size={40} style={{ height: '48px', width: '220px', borderRadius: '5px', border: '1px solid rgb(10, 104, 255)' }} styleTextBtn={{ color: 'rgb(10, 104, 255)' }} />

                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailsComponent