import authApi from "../service/authApi";
import {removeItemFromLocalStorage} from "../utils";
import {useRouter} from "next/router";

const useAuthApi = () => {
    const router = useRouter()

    const register = async (data) => {
        const res = await authApi.register(data)
        return  res.data
    }

    const login = async (email, password) => {
        const loginData = {
            email,
            password
        }
        const loginResp = await authApi.login(loginData)
        const token = loginResp.data
        //save token to local storage
        localStorage.setItem("token", JSON.stringify({token, email}))
    }


    const logout = async () => {
        //delete localstorage
        removeItemFromLocalStorage("token")
        router.push("/login")
    }

    const verifyEmail = async (email, verify_token) => {
        return await authApi.verifyEmail({email, verify_token})
    }

    return {register, login, logout, verifyEmail}
}
export default useAuthApi