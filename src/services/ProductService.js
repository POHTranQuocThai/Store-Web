import axios from "axios"


export const getAllProduct = async () => {
    const res = await axios.get(`http://localhost:3000/v1/products/getAll`)
    return res.data
}
export const createProduct = async (data) => {
    const res = await axios.post(`http://localhost:3000/v1/products/create`, data)
    return res.data
}