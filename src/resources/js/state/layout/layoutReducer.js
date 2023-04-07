import * as actions from "./layoutActions";

const initialState = {
    loading: false,
    dropDowns: null,
};

const layoutReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.SET_LOADING_ACTION:
            return {
                ...state,
                loading: payload,
            };
        case actions.CLOSE_DROP_DOWN_ACTION:
            return {
                ...state,
                dropDowns: payload,
            };
        default:
            return state;
    }
};

export default layoutReducer;
