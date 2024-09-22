import { Badge, Col, Image, Popover } from "antd"
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { WrapperHeader, WrapperHeaderAccout, WrapperHeaderPopover, WrapperTextHeader, WrapperTextHeaderSmall } from "./style"
import ButtonInputSearch from "../ButtonSearch/ButtonInputSearch"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { resetUser } from "../../redux/slice/userSlide"
import * as UserSevice from '../../services/UserService'
import { useEffect, useState } from "react"
import Loading from '../../components/LoadingComponent/LoadingComponent'


function HeaderComponent({ isHiddenSearch = false, isHiddenCart = false }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const user = useSelector((state) => state?.users)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleLogOut = async () => {
        setLoading(true)
        await UserSevice.logoutUser()
        dispatch(resetUser())
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        setName(user?.name)
        setAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])
    const content = (
        <div>
            <WrapperHeaderPopover onClick={() => navigate('/profile-user')}>Thông tin khách hàng</WrapperHeaderPopover>
            {user?.isAdmin && <WrapperHeaderPopover onClick={() => navigate('/system/admin')}>Quản lí hệ thống</WrapperHeaderPopover>}
            <WrapperHeaderPopover onClick={handleLogOut}>Đăng xuất</WrapperHeaderPopover>
        </div>
    )
    return <div style={{ width: '100%' }}>
        <WrapperHeader gutter={16} style={{ justifyContent: isHiddenCart && isHiddenSearch ? 'space-between' : 'unset' }}>
            <Col span={5}>
                <WrapperTextHeader onClick={() => navigate('/')}>T-STORE</WrapperTextHeader>
            </Col>
            {!isHiddenSearch && <Col span={13}> <ButtonInputSearch
                placeholder="input search text"
                allowClear
                textButton="Search"
                size="large"
            /></Col>}
            <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Loading isLoading={loading}>
                    <WrapperHeaderAccout>
                        {avatar ? <Image src={avatar} alt="avatar" style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover' }} />
                            : <UserOutlined style={{ fontSize: '35px' }} />}
                        {user?.access_token ? <Popover trigger='click' content={content}>
                            {console.log('asds', name)
                            }
                            <div style={{ cursor: 'pointer', fontSize: '16px', fontWeight: '400' }}>{name.length ? name : user?.email}</div>
                        </Popover>
                            :
                            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                <WrapperTextHeaderSmall>Đăng ký/Đăng nhập</WrapperTextHeaderSmall>
                                <div>
                                    <WrapperTextHeaderSmall>Tài Khoản <CaretDownOutlined /></WrapperTextHeaderSmall>
                                </div>
                            </div>
                        }
                    </WrapperHeaderAccout>
                </Loading>
                {!isHiddenCart && <div>
                    <Badge count='4' size="small">
                        <ShoppingCartOutlined style={{ fontSize: '40px', color: '#fff' }} />
                    </Badge>
                    <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
                </div>}
            </Col>
        </WrapperHeader>
    </div >
}

export default HeaderComponent