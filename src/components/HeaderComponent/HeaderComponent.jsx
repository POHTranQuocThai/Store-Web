import { Col, Row } from "antd"
import Search from "antd/lib/input/Search"
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from "./style"

function HeaderComponent() {
    return <div>
        <WrapperHeader gutter={16}>
            <Col span={6}>
                <WrapperTextHeader>T-STORE</WrapperTextHeader>
            </Col>
            <Col span={12}> <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"

            /></Col>
            <Col span={6} style={{ display: 'flex', gap: '20px' }}>
                <WrapperHeaderAccout>
                    <UserOutlined style={{ fontSize: '40px' }} />
                    <div>
                        <WrapperTextHeaderSmall>Đăng ký/Đăng nhập</WrapperTextHeaderSmall>
                        <div>
                            <WrapperTextHeaderSmall>Tài Khoản <CaretDownOutlined /></WrapperTextHeaderSmall>
                        </div>
                    </div>
                </WrapperHeaderAccout>
                <div>
                    <ShoppingCartOutlined style={{ fontSize: '40px', color: '#fff' }} />
                    <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
                </div>
            </Col>
        </WrapperHeader>
    </div>
}

export default HeaderComponent