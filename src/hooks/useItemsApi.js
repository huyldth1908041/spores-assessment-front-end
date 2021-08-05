import useToken from "./useToken";
import itemsApi from "../service/itemsApi";

const useItemsApi = () => {
    const tokenData = useToken()

    const createNewItem = async (body) => {
        return await itemsApi.createNewItem(tokenData.token, body)
    }

    const getListItems = async (params) => {
        //params to paginate
        return await itemsApi.getListItems(tokenData.token, params)
    }
    return {createNewItem, getListItems}
}

export default useItemsApi