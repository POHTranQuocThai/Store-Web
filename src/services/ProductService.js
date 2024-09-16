import axios from "axios"


export const getAllProduct = async () => {
    const res = await axios.get(`http://localhost:3000/v1/products/getAll`)
    return res.data
}