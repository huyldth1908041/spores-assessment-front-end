import LoginView from "../src/views/LoginView";
import {useRouter} from "next/router";

const Login = () => {
    const router = useRouter()
    return <LoginView/>
}


export default Login

