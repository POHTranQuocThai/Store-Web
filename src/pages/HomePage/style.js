import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap : 24px;
    justify-content: flex-start;
    height: 44px;
`
export const WrapperHoverButton = styled(ButtonComponent)`
    &:hover{
        color: #fff;
        background-Color: rgb(13,102,182);
        span {
            color: #fff;
        }
    }
    width: 100%;
    text-align:center;
    cursor:${(props) => props.disabled ? 'not-allowed' : 'pointers'}; 
    color:${(props) => props.disabled ? '#fff' : 'transparent'}; 
`