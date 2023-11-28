export const BASE_URL = "http://localhost:8000";
export const WINDOWPHONESIZE = 600;

export const HOME_SECTIONS = {
    HOME: {
        name: "home",
        linkLabel: "Home",
    },
    PLAYERS: {
        name: "players",
        linkLabel: "Players",
    },
    TEAMS: {
        name: "teams",
        linkLabel: "Teams",
    },
    MATCHES: {
        name: "matches",
        linkLabel: "Matches",
    },
}

export const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nis";

//generic type function
export const sliceArray = <T>(array: T[] , size: number): T[][] => {
    const slicedArray: T[][] = [];
    for(let i = 0; i < array.length; i += size) {
        slicedArray.push(array.slice(i, i + size));
    }
    return slicedArray;
}

export const filterFormState = {
    name: {
        value: "",
        error: false,
        errorText: "Name must be at least 3 characters long",
        validate: (_: string) => true,
    },
    age: {
        value: "",
        error: false,
        errorText: "Age must be a number",
        validate: (value: string) => !isNaN(Number(value)),
    },
    scoreMin: {
        value: "",
        error: false,
        errorText: "Score must be a number",
        validate: (value: string) => !isNaN(Number(value)),
    },
    scoreMax: {
        value: "",
        error: false,
        errorText: "Score must be a number",
        validate: (value: string) => !isNaN(Number(value)),
    },

}

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
