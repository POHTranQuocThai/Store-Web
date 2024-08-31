

import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperPriceDiscountText, WrapperPriceText, WrapperReporText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons'
import { WrappperStyleTextSell } from '../ProductDetailsComponent/style'

function CardComponent() {
    return <WrapperCardStyle
        hoverable
        headStyle={{ width: '196px', height: '200px' }}
        style={{ width: 196 }}
        bodyStyle={{ padding: '10px' }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <StyleNameProduct>Iphone</StyleNameProduct>
        <WrapperReportText>
            <span style={{ marginRight: '4px' }}><span>4.96</span><StarFilled style={{ color: 'yellow', fontSize: '12px' }} /></span>
            <WrappperStyleTextSell> | Đã bán 1000+</WrappperStyleTextSell>
        </WrapperReportText>
        <WrapperPriceText>19.000.000đ <WrapperPriceDiscountText>-20%</WrapperPriceDiscountText></WrapperPriceText>
    </WrapperCardStyle>
}

export default CardComponent