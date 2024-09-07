
import React from 'react'
import { WrapperInput } from './style'

function InputForm(props) {
    const { placeholder = 'Nhập text', ...rests } = props
    const handleOnChangeInput = (e) => {
        props.handleOnChange(e.target.value)
    }
    return (
        <>
            <WrapperInput placeholder={placeholder} {...rests} onChange={handleOnChangeInput}>
            </WrapperInput>
        </>
    )
}

export default InputForm