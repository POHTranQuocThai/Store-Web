
import { axiosJWT } from "./UserService"

export const createOrder = async (access_token, data) => {
    const res = await axiosJWT.post(`http://localhost:3000/v1/orders/create`, data, {
        headers: `Bearer ${access_token}`
    })
    return res.data
}