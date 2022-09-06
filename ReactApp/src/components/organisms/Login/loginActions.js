import React, { useReducer } from "react";

import { loginService } from "./loginService";

const loginActionsTypes = {
	LOGIN_REQUEST: "LOGIN_REQUEST",
	LOGIN_SUCCESS: "LOGIN_SUCCESS",
	LOGIN_FAILURE: "LOGIN_FAILURE",
	LOGOUT: "LOGOUT",
};

const messageTypes = {
	MESSAGE_SUCCESS: "Zalogowano",
	MESSAGE_ERROR: "Zły login lub hasło",
};
const loginSuccess = (user) => {
	return {
		type: loginActionsTypes.LOGIN_SUCCESS,
		user,
	};
};

const loginFailure = (error) => {
	return {
		type: loginActionsTypes.LOGIN_FAILURE,
		error,
	};
};

const loginRequest = (user) => {
	return {
		type: loginActionsTypes.LOGIN_REQUEST,
		user,
	};
};

const login = (username, password) => {
	return async (dispatch) => {
		dispatch(loginRequest());
		await loginService.login(username, password).then(
			(user) => {
				localStorage.setItem("account", JSON.stringify(user));
				dispatch(loginSuccess(user));
                dispatch(messageTypes.MESSAGE_SUCCESS)
				// dispatch(messageBagActions.success("Zalogowano"));
			},
			(error) => {
				dispatch(loginFailure(error));
				dispatch(messageTypes.MESSAGE_ERROR);
			}
		);
	};
};

const logout = () => {
	loginService.logout();
	return { type: loginActionsTypes.LOGOUT };
};

export const loginActions = {
	login,
	logout,
};
