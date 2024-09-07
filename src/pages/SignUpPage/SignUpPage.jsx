import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import imageSignIn from '../../assets/images/login.png'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserSevice from '../../services/UserService'
import Loading from '../../components/LoadingComponent/LoadingComponent'

function SignUpPage() {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const handleNaigateSignIn = () => {
        navigate('/sign-in')
    }
    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangePassword = (value) => {
        setPassword(value)
    }
    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }
    const mutation = useMutationHooks(
        data => UserSevice.signupUser(data)
    )
    const { data, isLoading } = mutation
    const handleSignUp = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword
        })
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ display: 'flex', width: '800px', height: '445px', borderRadius: '6px', background: '#fff' }}>
                <WrapperContainerLeft>
                    <h1>Đăng Ký</h1>
                    <p>Đăng nhập và tạo tài khoản</p>
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
                        <InputForm value={password} handleOnChange={handleOnChangePassword}
                            style={{ marginBottom: '10px' }} type={isShowPassword ? 'text' : 'password'} placeholder={'password'} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}>
                            {
                                isShowConfirmPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm value={confirmPassword} handleOnChange={handleOnChangeConfirmPassword}
                            type={isShowConfirmPassword ? 'text' : 'password'} placeholder={'confirm password'} />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent textButton={'Đăng Ký'} onClick={handleSignUp} disabled={!email.length || !password.length || !confirmPassword.length}
                            size={40} styleBtn={{ backgroundColor: 'rgb(255,57,69)', height: '48px', width: '100%', border: 'none', borderRadius: '5px', margin: '26px 0 10px' }} styleTextBtn={{ color: '#fff' }} />
                    </Loading>
                    <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNaigateSignIn}>Đăng nhập</WrapperTextLight></p>
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

export default SignUpPage