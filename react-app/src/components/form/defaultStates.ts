const passwordRegexValidation = (value: string):boolean => {
    return value.length >= 6 && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/) !== null
}
export const initialSignInState = {
    username: {
        value: "",
        error: false,
        errorText: "username must be at least 6 characters long",
        validate: (value: string) => {
            return value.length >= 6;
        },
    },
    password: {
        value: "",
        error: false,
        errorText: "password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        validate: passwordRegexValidation
    }
}
export const initialSignUpState = {
    username: {
        value: "",
        error: false,
        errorText: "username must be at least 6 characters long",
        validate: (value: string) => {
            return value.length >= 6;
        },
    },
    password: {
        value: "",
        error: false,
        errorText: "password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        validate: passwordRegexValidation
    },
    confirmPassword: {
        value: "",
        error: false,
        errorText: "password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        validate: passwordRegexValidation
    },
    email: {
        value: "",
        error: false,
        errorText: "email must be valid",
        validate: (value: string) => {
            return value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null;
        }
    }
}
