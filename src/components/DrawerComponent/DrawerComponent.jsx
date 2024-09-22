import { Drawer } from 'antd'
import React from 'react'

function DrawerComponent({ title = 'Drawer', placement = 'right', children, isOpen = false, ...rests }) {
    return (
        <>
            <Drawer title={title} placement={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>
    )
}

export default DrawerComponent