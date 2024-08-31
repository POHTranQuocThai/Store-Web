import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageSignIn from '../../assets/images/login.png'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { Image } from 'antd'

function SignInPage() {
    const { isShowPassword, setIsShowPassword } = useState(false)
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ display: 'flex', width: '800px', height: '445px', borderRadius: '6px', background: '#fff' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và mật khẩu tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder='abc@gmail.com' />
                    <div style={{ position: 'relative' }}>
                        <span style={{
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
                        <InputForm type={isShowPassword ? 'text' : 'password'} placeholder={'password'} />
                    </div>
                    <ButtonComponent textButton={'Chọn mua'}
                        size={40} style={{ background: 'rgb(255,57,69)', height: '48px', width: '100%', border: 'none', borderRadius: '5px', margin: '26px 0 10px' }} styleTextBtn={{ color: '#fff' }} />
                    <WrapperTextLight >Quên mật khẩu</WrapperTextLight>
                    <p>Chưa có tài khoản? <WrapperTextLight >Tạo tài khoản</WrapperTextLight></p>
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