import axiosClient from "./axiosClient";
const url = "/items"
const itemsApi = {
    getListItems: async (token, params = {}) => {
        return await axiosClient.get(url, {headers: {Authorization: token}, params: params});
    },

    getItemById: async (token, id) => {
        return await axiosClient.get(`${url}/${id}`);
    },

    createNewItem: async (token, body) => {
        return await axiosClient.post(url, body, {headers: {Authorization: token}})
    },

}

export default itemsApi