
import { Spin } from 'antd'
import React from 'react'

function Loading({ children, isLoading, deley = 200 }) {
    return (
        <Spin spinning={isLoading} delay={deley}>
            {children}
        </Spin>
    )
}

export default Loading