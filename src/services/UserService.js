import axios from "axios"

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.API_KEY}/users/sign-in`, data)
    return res.data
}
export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.API_KEY}/users/sign-up`, data)
    return res.data
}   