import {useEffect, useState} from "react";
import {getLocalStorageObject} from "../utils";

const useToken = () => {
    const [tokenData, setTokenData] = useState({token: "", email: ""})
    useEffect(()=> {
        const tokenInLocalStorage = getLocalStorageObject("token")
        setTokenData(tokenInLocalStorage)
    }, [])
    return tokenData
}
export default useToken