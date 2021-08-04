import axios from "axios";
import queryString from "query-string"
import {API_ROUTE} from "../constants";


const axiosClient = axios.create({
    baseURL: API_ROUTE,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});


axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    if (error.response) {
        error = {
            statusCode: error?.response?.status,
            message: error?.response?.data?.message,
            errors: error.response.data.errors
        }
    }

    throw error
});
export default axiosClient;