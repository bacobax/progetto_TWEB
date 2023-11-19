const passwordRegexValidation = (value: string):boolean => {
    return value.length >= 6 && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/) !== null
}

const dummyPassworValidation = (value: string):boolean => {
    return value.length >= 6
}
export const initialSignInState = {
    email: {
        value: "",
        error: false,
        errorText: "username must be at least 6 characters long",
        validate: (value: string) => {
            return value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null;

        },
    },
    password: {
        type: "password",
        value: "",
        error: false,
        errorText: "password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        validate: dummyPassworValidation
    }
}
export const initialSignUpState = {
    name: {
        value: "",
        error: false,
        errorText: "username must be at least 6 characters long",
        validate: (value: string) => {
            return value.length >= 0;
        }
    },
    surname: {
        value: "",
        error: false,
        errorText: "username must be at least 6 characters long",
        validate: (value: string) => {
            return value.length >= 0;
        },

    },
    password: {
        value: "",
        type: "password",
        error: false,
        errorText: "password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        validate: passwordRegexValidation
    },
    confirmPassword: {
        value: "",
        type: "password",
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
    },

}
