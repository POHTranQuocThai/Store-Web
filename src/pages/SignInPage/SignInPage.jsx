import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageSignIn from '../../assets/images/login.png'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserSevice from '../../services/UserService'
import Loading from '../../components/LoadingComponent/LoadingComponent'

function SignInPage() {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }
    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangePassword = (value) => {
        setPassword(value)
    }
    const mutation = useMutationHooks(
        data => UserSevice.loginUser(data)
    )
    const { data, isLoading } = mutation
    const handleSignIn = () => {
        mutation.mutate({
            email,
            password
        })
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ display: 'flex', width: '800px', height: '445px', borderRadius: '6px', background: '#fff' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và mật khẩu tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder='abc@gmail.com' value={email} handleOnChange={handleOnChangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}>
                            {
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm type={isShowPassword ? 'text' : 'password'} placeholder={'password'} value={password} handleOnChange={handleOnChangePassword} />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}

                    <Loading isLoading={isLoading}>
                        <ButtonComponent textButton={'Đăng Nhập'} onClick={handleSignIn} disabled={!email.length || !password.length}
                            size={40} styleBtn={{ backgroundColor: 'rgb(255,57,69)', height: '48px', width: '100%', border: 'none', borderRadius: '5px', margin: '26px 0 10px' }} styleTextBtn={{ color: '#fff' }} />
                    </Loading>
                    <WrapperTextLight >Quên mật khẩu</WrapperTextLight>
                    <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image height='203px' width='203px'
                        src={imageSignIn} preview={false} alt='Sign In' />
                    <h4>Mua sắm tại Tiki</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignInPage