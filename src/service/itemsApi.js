import axiosClient from "./axiosClient";

const itemsApi = {
    getListItems: async (token, params = {}) => {
        const url ="items/list"
        return await axiosClient.get(url, {headers: {Authorization: token}, params: params});
    },

    getItemById: async (token, id) => {
        const url = "/items/".concat(id.toString())
        return await axiosClient.get(url, {headers: {Authorization: token}});
    },

    createNewItem: async (token, body) => {
        const url = "/items/create"
        return await axiosClient.post(url, body, {headers: {Authorization: token}})
    },

}

export default itemsApi