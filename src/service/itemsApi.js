import axiosClient from "./axiosClient";

const itemsApi = {
    getPrivateListItems: async (token, params = {}) => {
        const url ="items/private"
        return await axiosClient.get(url, {headers: {Authorization: token}, params: params});
    },

    getPublicListItems: async (token, params = {}) => {
        const url ="items/public"
        return await axiosClient.get(url, {headers: {Authorization: token}, params: params});
    },

    getItemById: async (token, id) => {
        const url = "/items/".concat(id.toString())
        return await axiosClient.get(url, {headers: {Authorization: token}});
    },

    createNewItem: async (token, body) => {
        const url = "/items/"
        return await axiosClient.post(url, body, {headers: {Authorization: token}})
    },

    updateItem: async (token, id, body) => {
        const url = `/items/${id}`
        return await axiosClient.put(url, body, {headers: {Authorization: token}})
    },
    deleteItem: async (token, id) => {
        const url = `/items/${id}`
        return await axiosClient.delete(url, {headers: {Authorization: token}})
    }

}

export default itemsApi