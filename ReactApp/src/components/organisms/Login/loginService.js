import routes from "./api-routes";
import axios from "axios";

const login = async (username, password) => {
	const response = await axios.post(
		routes.server + routes.route.api.login.post,
		{
			username: username,
			password: password,
		}
	);
	return response;
};

const logout = () => {
	localStorage.removeItem("account");
};

export const loginService = {
	login,
	logout,
};
