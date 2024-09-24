import axios from "axios"

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`http://localhost:3000/v1/users/sign-in`, data)
    return res.data
}
export const signupUser = async (data) => {
    const res = await axios.post(`http://localhost:3000/v1/users/sign-up`, data)
    return res.data
}
export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/v1/users/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })

    return res.data
}
export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/v1/users/getAll`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })

    return res.data
}
export const refreshToken = async () => {
    const res = await axios.post(`http://localhost:3000/v1/users/refresh-token`, {
        withCredentials: true
    })
    return res.data
}
export const logoutUser = async () => {
    const res = await axios.post(`http://localhost:3000/v1/users/log-out`)
    return res.data
}
export const updateUser = async (id, access_token, data) => {
    const res = await axiosJWT.put(`http://localhost:3000/v1/users/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(`http://localhost:3000/v1/users/delete-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}
export const deleteMany = async (ids, access_token) => {
    const res = await axiosJWT.post(`http://localhost:3000/v1/users/delete-many`, ids, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}