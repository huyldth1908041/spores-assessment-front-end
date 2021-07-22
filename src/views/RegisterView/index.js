import {toast} from "react-hot-toast";
import AuthenticationForm from "../../components/AuthenticationForm";
import {registerFormFields} from "./config";

const RegisterView = () => {
    const handleFinish = (values) => {
        console.log(values)
    }
    const handleFinishFail = (errors) => {
        toast.error("Please check your form input then try again")
    }
    return (
        <AuthenticationForm
            formFields={registerFormFields}
            submitText="Register"
            formName="register"
            formTitle = "Register"
            redirectText="Already have an account? Login now!"
            redirectUrl="/login"
            onFinish={handleFinish}
            onFinishError={handleFinishFail}
        />
    )
}
export default RegisterView