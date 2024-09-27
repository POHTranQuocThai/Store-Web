import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    width: 64px;
    height: 64px;
`
export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`
export const WrapperStyleNameProduct = styled.h1`
    margin: 0px;
    color: rgb(39, 39, 42);
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    word-break: break-word;
    white-space: break-spaces;
`
export const WrappperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120,120,120)
`
export const WrapperProductPrice = styled.h1`
    color: rgb(255, 66, 78);
    font-size: 34px;
    font-weight: 500;
    margin-top: 10px;
`
export const WrapperProductAddress = styled.div`
span.address {
    color: rgb(39, 39, 42);
    overflow: hidden;
    }
`
export const WrapperQuanlityProduct = styled.div`
   display: flex;
   gap: 4px;
   align-items: center;
   border-radius: 2px;
  
`
export const WrapperInputNumber = styled(InputNumber)`
   & .ant-input-number-handler-wrap{
        display : none;
   }

`
