import React, { Fragment, useState } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavBar } from './style'
import * as ProductService from '../../services/ProductService'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function TypeProductPage() {
    const { state } = useLocation()
    const [products, setProducts] = useState([])

    const fetchProductType = async (type) => {
        const res = await ProductService.getProductType(type)
        if (res?.status === 200) {
            setProducts(res?.data)
        }
    }
    useEffect(() => {
        if (state) {
            fetchProductType(state)
        }
    }, [state])
    const onChange = () => {

    }
    return (
        <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 64px)' }}>
            <div style={{ width: '1270px', padding: '0 120px', background: '#efefef' }}>
                <Row style={{ padding: '40px 0', background: '#efefef', flexWrap: 'nowrap' }}>
                    <WrapperNavBar span={4}><NavBarComponent /></WrapperNavBar>
                    <Col span={20}>
                        <Col style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }} >
                            {products?.map(product => {
                                return <CardComponent
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    discount={product.discount}
                                    selled={product.selled}
                                    type={product.type}
                                    id={product._id}
                                />
                            })}
                        </Col>
                        <Pagination style={{ textAlign: 'center', marginTop: '20px' }}
                            defaultCurrent={2} total={100} onChange={onChange} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TypeProductPage