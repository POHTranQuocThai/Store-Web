import { Button, Col, Image, Rate, Row } from 'antd'
import React, { useState } from 'react'
import imageProd from '../../assets/images/prod.webp'
import imageProdSmall from '../../assets/images/prodSmall.webp'
import { WrapperInputNumber, WrapperProductAddress, WrapperProductPrice, WrapperQuanlityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrappperStyleTextSell } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductServer from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct } from '../../redux/slice/orderSlide'

function ProductDetailsComponent({ idProduct }) {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector(state => state?.users)
    const onChange = (e) => {
        setNumProduct(e.target.value)
    }

    const fetchGetDetailsProduct = async (context) => {
        const id = context.queryKey[1]; // Accessing the product ID from the context
        if (id) {
            const res = await ProductServer.getDetailsProduct(id);
            return res.data;
        }
    }

    const { isLoading, data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        retry: 3,                                       // Số lần thử lại khi gặp lỗi
        retryDelay: 1000,
        keepPreviousData: true,
        enabled: !!idProduct,
    });
    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1)
        } else if (type === 'decrease') {
            numProduct > 1 && setNumProduct(numProduct - 1)
        }
    }
    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id
                }
            }))
        }
    }
    return (
        <Loading isLoading={isLoading}>
            <Row style={{ padding: '16px', background: '#fff' }}>
                <Col span={10}>
                    <Image src={productDetails?.image} alt='image product' preview={false}></Image>
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={productDetails?.image} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                        <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProdSmall} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                        <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProdSmall} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                        <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProdSmall} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                        <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProdSmall} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                        <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProdSmall} alt='image product' preview={false} ></WrapperStyleImageSmall></WrapperStyleColImage>
                    </Row>
                </Col>
                <Col style={{ padding: '0 20px', borderLeft: '2px solid #efefef' }} span={14}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div>
                        <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} /><WrappperStyleTextSell> | Đã bán 1000+</WrappperStyleTextSell>
                    </div>
                    <div>
                        <WrapperProductPrice>{productDetails?.price}</WrapperProductPrice>
                    </div>
                    <WrapperProductAddress>
                        <span>Giao đến :</span> <br />
                        <span className='address'>{user?.address}</span>
                    </WrapperProductAddress>
                    <div style={{ fontSize: '20px', color: '#000', fontWeight: 400, margin: '10px 0', borderTop: '2px solid #efefef' }}>Số lượng</div>
                    <WrapperQuanlityProduct>
                        <Button onClick={() => handleChangeCount('increase')}><PlusOutlined style={{ color: '#000', fontSize: '20px' }} /></Button>
                        <WrapperInputNumber readOnly
                            style={{ width: '40px' }} min={1} max={10} defaultValue={1} onChange={onChange} value={numProduct} />
                        <Button onClick={() => handleChangeCount('decrease')}><MinusOutlined style={{ color: '#000', fontSize: '20px' }} /></Button>
                    </WrapperQuanlityProduct>
                    <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center', gap: '10px' }}>
                        <ButtonComponent textButton={'Chọn mua'} onClick={handleAddOrderProduct}
                            size={40} style={{ background: 'rgb(255,57,69)', height: '48px', width: '220px', border: 'none', borderRadius: '5px' }} styleTextBtn={{ color: '#fff' }} />
                        <ButtonComponent textButton={'Mua trả sau'}
                            size={40} style={{ height: '48px', width: '220px', borderRadius: '5px', border: '1px solid rgb(10, 104, 255)' }} styleTextBtn={{ color: 'rgb(10, 104, 255)' }} />
                    </div>
                </Col>
            </Row>
        </Loading >
    )
}

export default ProductDetailsComponent