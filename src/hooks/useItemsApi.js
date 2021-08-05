import useToken from "./useToken";
import itemsApi from "../service/itemsApi";
import {useCallback} from "react";

const useItemsApi = () => {
    const tokenData = useToken()

    const createNewItem = useCallback(async (body) => {
        return await itemsApi.createNewItem(tokenData.token, body)
    }, [tokenData])

    const getAllItems = useCallback(async (params) => {
        //params to paginate
        return await itemsApi.getPublicListItems(tokenData.token, params)
    }, [tokenData])

    const getCreatedByMeItems = useCallback(async (params) => {
        //params to paginate
        return await itemsApi.getPrivateListItems(tokenData.token, params)
    }, [tokenData])

    const getItemDetails = useCallback(async (id) => {
        return await itemsApi.getItemById(tokenData.token, id)
    }, [tokenData])
    const updateItem = useCallback(async (id, body) => {
        return await itemsApi.updateItem(tokenData.token, id, body)
    }, [tokenData])

    const deleteItem = useCallback(async (id) => {
        return await itemsApi.deleteItem(tokenData.token, id)
    }, [tokenData])

    return {createNewItem, getAllItems, getCreatedByMeItems, getItemDetails, updateItem, deleteItem}
}

export default useItemsApi