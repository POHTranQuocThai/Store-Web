import { Button } from 'antd'
import React from 'react'

function ButtonComponent({ size, styleBtn, textButton, styleTextBtn, disabled, ...rests }) {
    return <Button
        size={size}
        style={{
            ...styleBtn,
            backgroundColor: disabled ? '#ccc' : styleBtn?.backgroundColor
        }}
        {...rests}
    >
        <span style={styleTextBtn}>{textButton}</span>
    </Button >
}

export default ButtonComponent