import { Row } from "antd";
import styled from "styled-components";


export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(11, 116, 229);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
`

export const WrapperTextHeader = styled.span`
    font-size: 30px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
`
export const WrapperTextHeaderSmall = styled.span`
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    white-space: nowrap;
`
export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
`
export const WrapperHeaderPopover = styled.p`
    cursor: pointer;
    transition: background-color 0.3s ease; /* Thêm hiệu ứng chuyển động khi hover */
    &:hover {
        background-color: #f0f0f0; /* Thay đổi màu nền khi hover */
        color: #1890ff; /* Thay đổi màu chữ khi hover, tùy thuộc vào thiết kế */
    }
`
