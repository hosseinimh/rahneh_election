import { post } from "../../http";
import { handleError } from "../globalActions";
import utils from "../../utils/Utils";
import { BASE_URL, USER_ROLES } from "../../constants";
import { utils as strings } from "../../constants/strings";

export const FETCH_LOGIN_REQUEST_ACTION = "FETCH_LOGIN_REQUEST_ACTION";
export const FETCH_LOGIN_SUCCESS_ACTION = "FETCH_LOGIN_SUCCESS_ACTION";
export const FETCH_LOGIN_FAILURE_ACTION = "FETCH_LOGIN_FAILURE_ACTION";

export const FETCH_LOGOUT_REQUEST_ACTION = "FETCH_LOGOUT_REQUEST_ACTION";

export const CLEAR_LOGIN_REQUEST_ACTION = "CLEAR_LOGIN_REQUEST_ACTION";

export const fetchLoginAction =
    (username, password, role) => async (dispatch) => {
        dispatch({ type: FETCH_LOGIN_REQUEST_ACTION });

        try {
            const url =
                role === USER_ROLES.ADMINISTRATOR
                    ? `${BASE_URL}/a/users/login`
                    : `${BASE_URL}/u/users/login`;
            const response = await post(url, {
                username,
                password,
            });

            if (!utils.isJsonString(response.data)) {
                dispatch({
                    type: FETCH_LOGIN_FAILURE_ACTION,
                    payload: strings.notValidJson,
                });

                return;
            }

            if (response.data._result === "1") {
                utils.setLSVariable("user", JSON.stringify(response.data.item));
                window.location.reload();

                return;
            } else {
                handleError(response.data, dispatch);
                dispatch({
                    type: FETCH_LOGIN_FAILURE_ACTION,
                    payload: response.data._error,
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: FETCH_LOGIN_FAILURE_ACTION,
                payload: error.message,
            });
        }
    };

export const fetchLogoutAction = () => async (dispatch) => {
    try {
        utils.clearLS();

        await post(`${BASE_URL}/u/users/logout`);
    } catch (error) {
        console.log(error);
    }

    dispatch({
        type: FETCH_LOGOUT_REQUEST_ACTION,
    });
};

export const clearLogoutAction = () => async (dispatch) => {
    try {
        utils.clearLS();
    } catch (error) {
        console.log(error);
    }

    dispatch({
        type: CLEAR_LOGIN_REQUEST_ACTION,
    });
};
