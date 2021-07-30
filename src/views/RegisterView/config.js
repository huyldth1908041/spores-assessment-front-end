export const registerFormFields = [
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
        name: "phone",
        rules: [
            {required: true, message: "Please enter your phone number"},
            {pattern: "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$", message: "Please enter a valid phone number!"}
        ],
        prefix: "bx bx-phone",
        placeholder: "Phone number",
        inputType: "text"
    },

    {
        name: "userAddress",
        prefix: "bx bx-wallet",
        placeholder: "Wallet Address",
        inputType: "text",
        rules: [
            {required: true, message: "Please enter your address!"},
        ]
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

    {
        name: "passwordConfirm",
        rules: [
            {required: true, message: 'Please re-enter your password!'},
            {type: "string", min: 6, message: "Password too short"}
        ],

        prefix: "bx bx-lock",
        placeholder: "Confirm Password",
        inputType: 'password'
    },

]