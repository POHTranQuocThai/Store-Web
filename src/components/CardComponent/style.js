import { Card } from "antd";
import styled from "styled-components";


export const StyleNameProduct = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgb(56,56,61);
  position: relative;         /* Đặt relative để quản lý vị trí của tooltip */

  white-space: nowrap;         /* Không cho phép xuống dòng */
  overflow: hidden;            /* Ẩn phần chữ bị tràn */
  text-overflow: ellipsis;     /* Thêm dấu ba chấm khi chữ bị tràn */
  max-width: 180px;            /* Đặt kích thước tối đa cho phần tử */

`;


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
    height: 190px;
    width: 100%;
    }
    background: ${props => props.disabled ? '#ccc' : '#fff'}
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`