import AuthenticationForm from "../../components/AuthenticationForm";
import {toast} from "react-hot-toast";
import {loginFormFields} from "./config";

const LoginView = () => {
    const handleFinish = (values) => {
        console.log(values)
    }
    const handleFinishFail = (errors) => {
        toast.error("Please check your form input then try again")
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
        />

    )
}

export default LoginView
