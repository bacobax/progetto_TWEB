export interface State{
    [inputName: string] : {
        value: string,
        error: boolean,
        errorText: string,
        validate?: (value: string) => boolean,
    }
}
export interface Target{
    inputName: string,
    value: string,
}
interface Action{
    type: "SET_FORM_VALUE" | "RESET_FORM" | "SET_FORM_STATE",
    payload?: {
        target: Target
    }
}



export const reducer = (state:State, action:Action) => {
    if(action.type === "SET_FORM_VALUE"){
        const { inputName, value } = action.payload!.target;
        return {
            ...state,
            [inputName]: {
                ...state[inputName],
                value,
                error: !state[inputName].validate!(value),
            }
        }
    }
    if(action.type === "RESET_FORM"){
        return Object.keys(state).reduce((acc, key) => {
            return {
                ...acc,
                [key]: {
                    ...state[key],
                    value: "",
                    error: false,
                }
            }
        }, {});
    }

    return {...state};
}