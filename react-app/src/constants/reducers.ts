interface FormState {
    username: string;
    password: string;
}

export enum Actions {
    UPDATE_USERNAME,
    UPDATE_PASSWORD,
    SUBMIT
}
interface ActionType {
    type: Actions;
    payload: string;
}
export const signInreducer = (state: FormState, action: ActionType) => {
    switch(action.type) {
        case Actions.UPDATE_PASSWORD:
            return {
                ...state,
                password: action.payload
            }

        case Actions.UPDATE_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case Actions.SUBMIT:
            return {
                username: "",
                password: ""
            }

        default:
            return state;
    }
}