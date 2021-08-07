import axiosClient from "./axiosClient";

const marketApi = {
    getHotAuction: async (token) => {
        const url ="/market/auctions/hot"
        return axiosClient.get(url, {headers: {Authorization: token}})
    },

    getNewestItems: async (token) => {
        const url ="/market/items/newest"
        return axiosClient.get(url, {headers: {Authorization: token}})
    },

    getHotItems: async (token) => {
        const url ="/market/items/hot"
        return axiosClient.get(url, {headers: {Authorization: token}})
    },

    getUsersCount: async (token) => {
        const url ="/market/users"
        return axiosClient.get(url, {headers: {Authorization: token}})
    },

    getTotalRevenue: async (token) => {
        const url ="/market/revenue"
        return axiosClient.get(url, {headers: {Authorization: token}})
    },

}
export default marketApi