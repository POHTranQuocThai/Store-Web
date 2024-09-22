import axios from "axios"
import { axiosJWT } from "./UserService"


export const getAllProduct = async () => {
    const res = await axios.get(`http://localhost:3000/v1/products/getAll`)
    return res.data
}
export const createProduct = async (data) => {
    const res = await axios.post(`http://localhost:3000/v1/products/create`, data)
    return res.data
}
export const getDetailsProduct = async (id) => {
    const res = await axios.get(`http://localhost:3000/v1/products/get-detail/${id}`)
    return res.data
}
export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`http://localhost:3000/v1/products/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}