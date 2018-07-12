import { SET_USER } from './type';

export const setUser = (user) => ({
        type: SET_USER,
        payload: user
});