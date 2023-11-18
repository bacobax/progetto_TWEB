//useForm hook
import { useReducer,useCallback } from "react";
import {State, Target, reducer} from "./formReducer";

/**
 * @description useForm hook to generalize state handling for forms
 * @return {Object} formState, handleInputChange, reset, isValid
 * @example const {formState, handleInputChange, reset, isValid} = useForm({email: {value: "", error: false, errorText: "Email is required", validate: (value) => value !== ""}});
 * @param initialState
 */
export const useForm = (initialState:State = {}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const keys = Object.keys(state);
    const isValid = keys.every((key) => !state[key].error && state[key].value !== "");

    /**
     * @description Reset form to initial state
     * @return {void}
     */
    const reset = useCallback (() => {
        dispatch({ type: "RESET_FORM"});
    }, []);

    /**
     * @description Handle input change and modify state
     * @param {Target} target
     * @return {void}
     * @example <someInput> onChange={e => {handleInputChange({inputName: "email", value: e.target.value})} </someInput>
     */
    const handleInputChange = useCallback((target : Target) => {
        dispatch({
            type: "SET_FORM_VALUE",
            payload: {
                target
            }
        })
    }, []);

    return {formState: state, handleInputChange, reset, isValid};
}