import React, { Fragment, useState } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavBar } from './style'
import * as ProductService from '../../services/ProductService'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useSelector } from 'react-redux'

function TypeProductPage() {
    const searchProduct = useSelector(state => state?.products?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [panigate, setPanigate] = useState({
        page: 1,
        limit: 5,
        totalProduct: 1
    })

    const fetchProductType = async (type, page, limit) => {
        const res = await ProductService.getProductType(type, page, limit)
        if (res?.status === 200) {
            setProducts(res?.data)
            setPanigate({ ...panigate, totalProduct: res?.totalPage })
        }
    }
    console.log("pag", panigate);

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit)
        }
    }, [state, panigate.page, panigate.limit])
    const onChange = (current, pageSize) => {
        console.log('size', pageSize);

        setPanigate({ ...panigate, page: current - 1, limit: pageSize })
    }
    return (
        <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 64px)' }}>
            <div style={{ padding: '0 120px', background: '#efefef', height: '100%' }}>
                <Row style={{ padding: '40px 0', background: '#efefef', flexWrap: 'nowrap', height: 'calc(100% - 20px)' }}>
                    <WrapperNavBar span={4}><NavBarComponent /></WrapperNavBar>
                    <Col span={20} style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Col style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }} >
                            {products?.filter((pro) => {
                                if (searchDebounce === '') {
                                    return pro
                                } else if (pro?.name.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                    return pro
                                }
                            })?.map(product => {
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
                    </Col>
                </Row>
                <Pagination style={{ textAlign: 'center', marginTop: '20px' }}
                    defaultCurrent={panigate?.page + 1} total={panigate?.totalProduct} onChange={onChange} />
            </div>
        </div >
    )
}

export default TypeProductPage