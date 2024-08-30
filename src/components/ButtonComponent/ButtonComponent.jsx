import { Button } from 'antd'
import React from 'react'

function ButtonComponent({ size, style, textButton, styleTextBtn, ...rests }) {
    return <Button
        size={size}
        style={style}
        {...rests}
    >
        <span style={styleTextBtn}>{textButton}</span>
    </Button>
}

export default ButtonComponent