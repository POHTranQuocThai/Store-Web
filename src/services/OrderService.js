
import { axiosJWT } from "./UserService"

export const createOrder = async (access_token, data) => {
    const res = await axiosJWT.post(`http://localhost:3000/v1/orders/create`, data, {
        headers: `Bearer ${access_token}`
    })
    return res.data
}
export const getDetailsOrderById = async (id, access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/v1/orders/get-detail-order/${id}`, {
        headers: `Bearer ${access_token}`
    })
    return res.data
}