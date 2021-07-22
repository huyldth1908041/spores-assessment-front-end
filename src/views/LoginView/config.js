export const loginFormFields = [
    {
        name: "email",
        rules: [
            {required: true, message: "Please enter email"},
            {type: "email", message: "Please enter a valid email"}
        ],
        prefix: "bx bx-envelope",
        placeholder: "Email",
        inputType: "text"
    },
    {
        name: "password",
        rules: [
            {required: true, message: 'Please enter your Password!'},
            {type: "string", min: 6, message: "Password too short"}
        ],

        prefix: "bx bx-lock",
        placeholder: "Password",
        inputType: 'password'
    },

]