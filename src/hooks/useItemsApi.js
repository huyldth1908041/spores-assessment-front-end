import useToken from "./useToken";
import itemsApi from "../service/itemsApi";

const useItemsApi = () => {
    const tokenData = useToken()

    const createNewItem = async (body) => {
        return await itemsApi.createNewItem(tokenData.token, body)
    }

    return {createNewItem}
}

export default useItemsApi