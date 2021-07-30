import {toast} from "react-hot-toast";
import AuthenticationForm from "../../components/AuthenticationForm";
import {registerFormFields} from "./config";
import {useState} from "react";
import {useRouter} from "next/router";
import useAuthApi from "../../hooks/useAuthApi";


const RegisterView = () => {
    const [showVerifyEmail, setShowVerifyEmail] = useState(false)
    const [registerData, setRegisterData] = useState()
    const [email, setEmail] = useState("")
    const [isExec, setIsExec] = useState(false)
    const {verifyEmail, login, register} = useAuthApi();
    const router = useRouter()

    const reSendCodeHandle = async () => {
        await login(registerData.email, registerData.password)
    }
    const toggleShowVerifyEmail = () => {
        setShowVerifyEmail(!showVerifyEmail)
    }
    const handleFinish = async (values) => {

        if (values.password !== values.passwordConfirm) {
            toast.error("password confirm did not match")
            return
        }
        const data = {
            email: values.email,
            phone: values.phone,
            password: values.password,
            address: values.userAddress
        }
        try {
            setIsExec(true)
            const respData = await register(data)
            setRegisterData(respData)
            setEmail(respData.email)
            setShowVerifyEmail(true)
        } catch (err) {
            if(err.errors) {
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
            const verifyResponse = await verifyEmail(registerData.email, code)
            if (!verifyResponse.status) {
                return
            }
            //login user
            await login(registerData.email, registerData.password)
            //redirect to dashboard
            await router.push("/")
        } catch (err) {
            if(err.errors) {
                toast.error(err.errors[0])
            } else {
                toast.error(err.message)
            }
        }
        finally {
            setIsExec(false)
        }
    }

    return (
        <AuthenticationForm
            formFields={registerFormFields}
            submitText="Register"
            formName="register"
            formTitle="Register"
            redirectText="Already have an account? Login now!"
            redirectUrl="/login"
            onFinish={handleFinish}
            onFinishError={handleFinishFail}
            showVerifyEmail={showVerifyEmail}
            handleVerifyEmail={handleVerifyEmail}
            email={email}
            isExec={isExec}
            toggleShowVerifyEmail={toggleShowVerifyEmail}
            reSendCode={reSendCodeHandle}
        />
    )
}
export default RegisterView