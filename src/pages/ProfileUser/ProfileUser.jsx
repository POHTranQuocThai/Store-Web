import { useEffect, useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from '../ProfileUser/style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserSevice from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { Button, Image } from 'antd'
import { updateUser } from '../../redux/slice/userSlide'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils/utils'
import { error, success } from '../../components/MessageComponent/MessageComponent'


const ProfileUser = () => {
    const user = useSelector((state) => state?.users)
    const [email, setEmail] = useState(user?.email)
    const [name, setName] = useState(user?.name)
    const [phone, setPhone] = useState(user?.phone)
    const [address, setAddress] = useState(user?.address)
    const [avatar, setAvatar] = useState(user?.avatar)
    const dispatch = useDispatch()
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            const res = UserSevice.updateUser(id, rests, access_token)
            return res
        }
    )
    const { data, isLoading, isSuccess, isError } = mutation
    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])
    useEffect(() => {
        if (isSuccess) {
            success()
            handleGetDetailUser(user?.id, user?.access_token)
        } else if (isError) {
            error()
        }
    }, [isSuccess, isError])

    const handleGetDetailUser = async (id, token) => {
        const res = await UserSevice.getDetailUser(id, token)
        if (res?.data) {
            dispatch(updateUser({ ...res?.data, access_token: token }))
        } else {
            console.log('err', res.data);

        }
    }

    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangeName = (value) => {
        setName(value)
    }
    const handleOnChangePhone = (value) => {
        setPhone(value)
    }
    const handleOnChangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }


    const handleUpdate = () => {
        const userData = {
            id: user?.id,
            email,
            name,
            phone,
            address,
            avatar: avatar,
            access_token: user?.access_token
        };
        console.log('Data to update:', userData);  // Debug dữ liệu trước khi gửi
        mutation.mutate(userData);
    }

    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <WrapperContentProfile>
                <WrapperInput htmlFor='name'>
                    <WrapperLabel>Name</WrapperLabel>
                    <InputForm style={{ width: '300px' }} id='name' placeholder='abc' value={name} handleOnChange={handleOnChangeName} />
                    <ButtonComponent textButton={'Cập nhật'} onClick={handleUpdate}
                        size={40} styleBtn={{ height: '30px', padding: '2px 6px 6px', width: 'fit-content', border: '1px solid rgb(26,148,255)', borderRadius: '5px', margin: '10px 0 10px' }} styleTextBtn={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }} />
                </WrapperInput>
                <WrapperInput htmlFor='email'>
                    <WrapperLabel>Email</WrapperLabel>
                    <InputForm style={{ width: '300px' }} id='email' placeholder='abc@gmail.com' value={email} handleOnChange={handleOnChangeEmail} />
                    <ButtonComponent textButton={'Cập nhật'} onClick={handleUpdate}
                        size={40} styleBtn={{ height: '30px', padding: '2px 6px 6px', width: 'fit-content', border: '1px solid rgb(26,148,255)', borderRadius: '5px', margin: '10px 0 10px' }} styleTextBtn={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }} />
                </WrapperInput>
                <WrapperInput htmlFor='phone'>
                    <WrapperLabel>Phone</WrapperLabel>
                    <InputForm style={{ width: '300px' }} id='phone' placeholder='abc@gmail.com' value={phone} handleOnChange={handleOnChangePhone} />
                    <ButtonComponent textButton={'Cập nhật'} onClick={handleUpdate}
                        size={40} styleBtn={{ height: '30px', padding: '2px 6px 6px', width: 'fit-content', border: '1px solid rgb(26,148,255)', borderRadius: '5px', margin: '10px 0 10px' }} styleTextBtn={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }} />
                </WrapperInput>
                <WrapperInput htmlFor='address'>
                    <WrapperLabel>Address</WrapperLabel>
                    <InputForm style={{ width: '300px' }} id='address' placeholder='abc@gmail.com' value={address} handleOnChange={handleOnChangeAddress} />
                    <ButtonComponent textButton={'Cập nhật'} onClick={handleUpdate}
                        size={40} styleBtn={{ height: '30px', padding: '2px 6px 6px', width: 'fit-content', border: '1px solid rgb(26,148,255)', borderRadius: '5px', margin: '10px 0 10px' }} styleTextBtn={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }} />
                </WrapperInput>
                <WrapperInput htmlFor='avatar'>
                    <WrapperLabel>Avatar</WrapperLabel>
                    <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Select file</Button>
                    </WrapperUploadFile>
                    {avatar && (<Image src={avatar} alt='avatar' style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />)}
                    <ButtonComponent textButton={'Cập nhật'} onClick={handleUpdate}
                        size={40} styleBtn={{ height: '30px', padding: '2px 6px 6px', width: 'fit-content', border: '1px solid rgb(26,148,255)', borderRadius: '5px', margin: '10px 0 10px' }} styleTextBtn={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }} />
                </WrapperInput>
            </WrapperContentProfile>
        </div>
    )
}

export default ProfileUser
