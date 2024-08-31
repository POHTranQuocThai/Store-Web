import { Card } from "antd";
import styled from "styled-components";

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56,56,61);
`
export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128,128,137);
    display: flex;
    align-items: center;
    margin: 6px 0 0;
`
export const WrapperPriceText = styled.div`
    text-align: left;
    font-size: 16px;
    line-height: 150%;
    font-weight: 600;
    color: rgb(255, 39, 42);
    margin: 8px 0;
`
export const WrapperPriceDiscountText = styled.span`
    padding: 0px 4px;
    border-radius: 8px;
    background: #f5f5fa;
    color: #27272a;
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
`
export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
    height: 200px;
    width: 200px;
    }
`