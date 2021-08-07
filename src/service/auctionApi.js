import axiosClient from "./axiosClient";

const auctionApi = {
    bidItem: async (token, id, amount) => {
        const url =`/auction/${id}/bid`
        return await axiosClient.post(url, {amount}, {headers: {Authorization: token}})
    }
}

export default auctionApi