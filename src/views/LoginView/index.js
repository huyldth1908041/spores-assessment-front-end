import AuthenticationForm from "../../components/AuthenticationForm";
import {toast} from "react-hot-toast";
import {loginFormFields} from "./config";
import {useRouter} from "next/router";
import {useState} from "react";
import useAuthApi from "../../hooks/useAuthApi";

const LoginView = () => {
    const [showVerifyEmail, setShowVerifyEmail] = useState(false)
    const [loginData, setLoginData] = useState({email: "", password: ""})
    const [isExec, setIsExec] = useState(false)
    const router = useRouter()
    const {login, verifyEmail} = useAuthApi()

    const toggleShowVerifyEmail = () => {
        setShowVerifyEmail(!showVerifyEmail)
    }
    const reSendCodeHandle = async () => {
        await login(loginData.email, loginData.password)
    }
    const handleFinish = async (values) => {
        try {
            setIsExec(true)
            setLoginData({email: values.email, password: values.password})
            await login(values.email, values.password)
            await router.push("/dashboard")
        } catch (err) {
            if (err.errors && err.errors[0].includes("verification code")) {
                setShowVerifyEmail(true)
                return
            }
            if (err.errors) {
                toast.error(err.errors[0])
            } else {
                toast.error(err.message)
            }
        } finally {
            setIsExec(false)
        }

    }

    const handleFinishFail = (errors) => {
        toast.error("Please check your form input then try again")
    }

    const handleVerifyEmail = async (values) => {
        const code = values.code
        try {
            setIsExec(true)
            const verifyResponse = await verifyEmail(loginData.email, code)
            if (!verifyResponse.status) {
                return
            }
            await login(loginData.email, loginData.password)
            await router.push("/")
        } catch (err) {
            if (err.errors) {
                toast.error(err.errors[0])
            } else {
                toast.error(err.message)
            }
        } finally {
            setIsExec(false)
        }
    }
    return (

        <AuthenticationForm
            formFields={loginFormFields}
            submitText="log in"
            formTitle="Welcome"
            formName="login"
            redirectText="Don't have account? Register now!"
            redirectUrl="/register"
            onFinish={handleFinish}
            onFinishError={handleFinishFail}
            showVerifyEmail={showVerifyEmail}
            handleVerifyEmail={handleVerifyEmail}
            email={loginData.email}
            isExec={isExec}
            toggleShowVerifyEmail={toggleShowVerifyEmail}
            reSendCode={reSendCodeHandle}
        />

    )
}

export default LoginView
