import { SET_USER } from "../actions/type";

const initialState = {
        id: '',
        name: 'farid'
}

export default user = (state = initialState, action = {}) => {
        switch (action.type) {
                case SET_USER:
                        const { payload } = action;
                        return {
                                id: payload.id,
                                name: payload.name
                        }
                default:
                        return state;
                        break;
        }
}