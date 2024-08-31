
import React, { useState } from 'react'
import { WrapperInput } from './style'

function InputForm(props) {
    const [value, setValue] = useState('')
    const { placeholder = 'Nhập text', ...rests } = props
    return (
        <>
            <WrapperInput placeholder={placeholder}  {...rests}>
            </WrapperInput>
        </>
    )
}

export default InputForm