//useForm hook
import { useReducer } from "react";
import {State, Target, reducer} from "../reducers/formReducer";


export const useForm = (initialState:State = {}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const keys = Object.keys(state);
    const isValid = keys.every((key) => !state[key].error && state[key].value !== "");


    const reset = () => {
        dispatch({ type: "RESET_FORM"});
    };

    const handleInputChange = (target : Target) => {
        dispatch({
            type: "SET_FORM_VALUE",
            payload: {
                target
            }
        })
    };

    return {formState: state, handleInputChange, reset, isValid};
}