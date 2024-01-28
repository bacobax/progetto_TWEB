const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;


const loginData = {
    password: {
        inputId: "signin-password",
        value: "",
        validation: (value) => {
            return passwordRegex.test(value);
        },
        isValid: false
    },
    email: {
        inputId: "signin-email",
        value: "",
        validation: (value) => {
            const regex = /\S+@\S+\.\S+/;
            return regex.test(value);
        },
        isValid: false
    }
}

const notEmptyValidation = (value) => {
    return value.length > 0;

}

const signupData = {
    name: {
        inputId: "signup-name",
        value: "",
        validation: notEmptyValidation,
    },
    surname: {
        inputId: "signup-surname",
        value: "",
        validation: notEmptyValidation,
    },
    email: {
        inputId: "signup-email",
        value: "",
        validation: (value) => {
            const regex = /\S+@\S+\.\S+/;
            return regex.test(value);
        },
        isValid: false
    },
    password: {
        inputId: "signup-password",
        value: "",
        validation : (value) => {
            return passwordRegex.test(value);
        },
        isValid: false

    },
    confirmPassword: {
        inputId: "signup-confirmPassword",
        value: "",
        validation: (value) => {
            return passwordRegex.test(value);
        },
        isValid: false
    },
}


const formData = {
    loginData,
    signupData,
}

const addEventListeners = (input, label) => {
    input.addEventListener('focus', () => label.classList.add('elevated-label'));
    input.addEventListener('blur', () => {
        if (input.value === "") label.classList.remove('elevated-label');
    });
};

const setupValidation = (formData, btn) => {
    Object.entries(formData).forEach(([key,input]) => {
        const inputElement = document.getElementById(input.inputId).querySelector('input');
        inputElement.addEventListener('input', (event) => {
            input.value = event.target.value;
            const isValid = input.validation ? input.validation(input.value) : true;
            document.getElementById(input.inputId).classList.toggle('invalid-group', !isValid);
            formData[key].isValid = isValid;
            btn.disabled = !Object.values(formData).every(input => input.isValid || input.isValid === undefined);
        });
    });
};

const init = (isSignIn) => {
    const actualFormData = isSignIn ? formData.loginData : formData.signupData;
    const btn = document.getElementById('submit-btn');
    const congratsH2 = document.getElementById('congrats');

    document.querySelectorAll('div[data-slot="input-wrapper"]').forEach(group => {
        addEventListeners(group.querySelector('input'), group.querySelector('label'));
    });

    setupValidation(actualFormData, btn);

    btn.addEventListener('click', (event) => {
        event.preventDefault();
        if (Object.values(actualFormData).every(input => input.isValid || input.isValid === undefined)) {
            congratsH2.classList.toggle('invisible', false);
            congratsH2.classList.toggle('visible', true);
            btn.classList.toggle('invisible', true);
            setTimeout(() => {
                congratsH2.classList.toggle('visible', false);
                congratsH2.classList.toggle('invisible', true);
                btn.classList.toggle('invisible', false);
            }, 2000);
        }
    });

    document.getElementById('other-btn').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = isSignIn ? "./sign-up.html" : "./sign-in.html";
    });
};