

import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperPriceDiscountText, WrapperPriceText, WrapperReporText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'
import { WrappperStyleTextSell } from '../ProductDetailsComponent/style'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils/utils'

function CardComponent(props) {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    return <WrapperCardStyle
        hoverable
        headStyle={{ width: '196px' }}
        style={{ width: 204, borderRadius: '10px' }}
        bodyStyle={{ padding: '10px' }}
        cover={<img alt="example" src={image} style={{ padding: '5px 5px 0' }} />}
        onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
        disabled={countInStock === 0}
    >
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReportText>
            <span style={{ marginRight: '4px' }}><span>{rating}</span><StarFilled style={{ color: 'yellow', fontSize: '12px' }} /></span>
            <WrappperStyleTextSell> | Đã bán {selled}+</WrappperStyleTextSell>
        </WrapperReportText>
        <WrapperPriceText>{convertPrice(price)}<WrapperPriceDiscountText>-{discount || 5}%</WrapperPriceDiscountText></WrapperPriceText>
    </WrapperCardStyle>
}

export default CardComponent