export interface State{
    [inputName: string] : {
        value: any,
        error: boolean,
        errorText: string,
        validate?: (value: string) => boolean,
    }
}
export interface Target{
    inputName: string,
    value: any,
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