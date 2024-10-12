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
import { searchProduct } from "../../redux/slice/ProductSlide"


function HeaderComponent({ isHiddenSearch = false, isHiddenCart = false }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const order = useSelector(state => state.order)
    const [search, setSearch] = useState('')
    const [isOpenPopup, setIsOpenPopup] = useState(false)
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
        if (user?.avatar) {
            setAvatar(user?.avatar)
        }
        setLoading(true)
        setName(user?.name)
        setLoading(false)
    }, [user?.name, user?.avatar])
    const content = (
        <div>
            <WrapperHeaderPopover onClick={() => handleClickNavigate('profile')}>Thông tin nguời dùng</WrapperHeaderPopover>
            {user?.isAdmin && <WrapperHeaderPopover onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperHeaderPopover>}
            <WrapperHeaderPopover onClick={() => handleClickNavigate('my-order')}>Đơn hàng của tôi</WrapperHeaderPopover>
            <WrapperHeaderPopover onClick={() => handleClickNavigate()}>Đăng xuất</WrapperHeaderPopover>
        </div >
    )
    const handleClickNavigate = (type) => {
        if (type === 'profile') {
            navigate('/profile-user')
        } else if (type === 'admin') {
            navigate('/system/admin')
        } else if (type === 'my-order') {
            navigate('/my-order')
        } else {
            handleLogOut()
        }
        setIsOpenPopup(false)
    }
    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))

    }
    return <div style={{ width: '100%' }}>
        <WrapperHeader gutter={16} style={{ justifyContent: isHiddenCart && isHiddenSearch ? 'space-between' : 'unset' }}>
            <Col span={5}>
                <WrapperTextHeader onClick={() => navigate('/')}>T-STORE</WrapperTextHeader>
            </Col>
            {!isHiddenSearch && <Col span={13}> <ButtonInputSearch
                placeholder="Input search text"
                allowClear
                textButton="Search"
                size="large"
                onChange={onSearch}
            /></Col>}
            <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Loading isLoading={loading}>
                    <WrapperHeaderAccout>
                        {avatar ? <Image src={avatar} alt="avatar" style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover' }} />
                            : <UserOutlined style={{ fontSize: '35px' }} />}
                        {user?.access_token ? <Popover trigger='click' content={content} open={isOpenPopup}>
                            <div style={{ cursor: 'pointer', fontSize: '16px', fontWeight: '400' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{name.length ? name : user?.email}</div>
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
                {!isHiddenCart && <div onClick={() => navigate('/order')}>
                    <Badge count={order?.orderItems?.length} size="small">
                        <ShoppingCartOutlined style={{ fontSize: '40px', color: '#fff', cursor: 'pointer' }} />
                    </Badge>
                    <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
                </div>}
            </Col>
        </WrapperHeader>
    </div >
}

export default HeaderComponent