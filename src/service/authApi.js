import axiosClient from "./axiosClient";

const authApi = {
    register: async (body) => {
        const url = "/auth/register"
        return await axiosClient.post(url, body)
    },

    login: async (body) => {
        const url = "/auth/login"
        return await axiosClient.post(url, body)
    },

    verifyEmail: async (body) => {
        const url = "/auth/verifyEmail"
        return await axiosClient.post(url, body)
    },

    getUserProfile: async (token) => {
        const url = "auth/profile"
        return await axiosClient.get(url, {headers: {Authorization: token}})
    }
}
export default authApi