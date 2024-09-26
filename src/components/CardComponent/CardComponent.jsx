

import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperPriceDiscountText, WrapperPriceText, WrapperReporText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'
import { WrappperStyleTextSell } from '../ProductDetailsComponent/style'

function CardComponent(props) {
    const { countInStock, description, image, name, price, rating, type, discount, selled } = props
    return <WrapperCardStyle
        hoverable
        headStyle={{ width: '196px', height: '200px' }}
        style={{ width: 196 }}
        bodyStyle={{ padding: '10px' }}
        cover={<img alt="example" src={image} />}
    >
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReportText>
            <span style={{ marginRight: '4px' }}><span>{rating}</span><StarFilled style={{ color: 'yellow', fontSize: '12px' }} /></span>
            <WrappperStyleTextSell> | Đã bán {selled}+</WrappperStyleTextSell>
        </WrapperReportText>
        <WrapperPriceText>{price.toLocaleString()}<WrapperPriceDiscountText>-{discount || 5}%</WrapperPriceDiscountText></WrapperPriceText>
    </WrapperCardStyle>
}

export default CardComponent