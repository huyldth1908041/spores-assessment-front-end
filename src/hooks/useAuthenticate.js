import {useRouter} from "next/router";
import {useEffect} from "react";
import {getLocalStorageObject} from "../utils";

const useAuthenticate = () => {
    //check is logged in or not
    const router = useRouter()
    useEffect(() => {
        const token = getLocalStorageObject("token")
        if (!token) {
            router.push('/login')
        }
    }, [])
}

export default useAuthenticate