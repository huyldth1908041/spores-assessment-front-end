import {useCallback} from "react";
import useToken from "./useToken";
import marketApi from "../service/marketApi";

const useMarketApi = () => {
    const tokenData = useToken()
    const getHotAuctions = useCallback(async () => {
        return await marketApi.getHotAuction(tokenData.token)
    }, [tokenData])

    const getNewestItems = useCallback(async () => {
        return await marketApi.getNewestItems(tokenData.token)
    }, [tokenData])

    const getHotItems = useCallback(async () => {
        return await marketApi.getHotItems(tokenData.token)
    }, [tokenData])

    const getTotalRevenue = useCallback(async () => {
        return await marketApi.getTotalRevenue(tokenData.token)
    }, [tokenData])

    const getUsersCount = useCallback(async () => {
        return await marketApi.getUsersCount(tokenData.token)
    }, [tokenData])



    return {
        getHotAuctions,
        getHotItems,
        getNewestItems,
        getTotalRevenue,
        getUsersCount
    }
}
export default useMarketApi