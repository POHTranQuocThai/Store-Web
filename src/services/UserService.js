import axios from "axios"

export const loginUser = async (data) => {
    const res = await axios.post(`http://localhost:5000/v1/users/sign-in`, data)
    return res.data
}
export const signupUser = async (data) => {
    const res = await axios.post(`http://localhost:5000/v1/users/sign-up`, data)
    return res.data
}
export const getDetailUser = async (id, access_token) => {
    const res = await axios.get(`http://localhost:5000/v1/users/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })

    return res.data
}