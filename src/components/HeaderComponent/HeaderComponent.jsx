import { Badge, Col } from "antd"
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from "./style"
import ButtonInputSearch from "../ButtonSearch/ButtonInputSearch"
import { useNavigate } from "react-router-dom"

function HeaderComponent() {
    const navigate = useNavigate()
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    return <div style={{ width: '100%' }}>
        <WrapperHeader gutter={16}>
            <Col span={5}>
                <WrapperTextHeader>T-STORE</WrapperTextHeader>
            </Col>
            <Col span={13}> <ButtonInputSearch
                placeholder="input search text"
                allowClear
                textButton="Search"
                size="large"
            /></Col>
            <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <WrapperHeaderAccout>
                    <UserOutlined style={{ fontSize: '40px' }} />
                    <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                        <WrapperTextHeaderSmall>Đăng ký/Đăng nhập</WrapperTextHeaderSmall>
                        <div>
                            <WrapperTextHeaderSmall>Tài Khoản <CaretDownOutlined /></WrapperTextHeaderSmall>
                        </div>
                    </div>
                </WrapperHeaderAccout>
                <div>
                    <Badge count='4' size="small">
                        <ShoppingCartOutlined style={{ fontSize: '40px', color: '#fff' }} />
                    </Badge>
                    <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
                </div>
            </Col>
        </WrapperHeader>
    </div >
}

export default HeaderComponent