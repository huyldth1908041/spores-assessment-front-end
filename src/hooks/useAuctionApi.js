import useToken from "./useToken";
import {useCallback} from "react";
import auctionApi from "../service/auctionApi";

const useAuctionApi = () => {
    const tokenData = useToken()

    const bidAnItem = useCallback(async (id, amount) => {
        return await auctionApi.bidItem(tokenData.token, id, amount)
    }, [tokenData])

    return {
        bidAnItem
    }
}

export default useAuctionApi