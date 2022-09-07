import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			(async () => {
				try {
					const response = await axios.get("/", {
						headers: {
							authorization: `Bearer ${token}`,
						},
					});
					setUser(response.data);
				} catch (e) {
					console.log(e);
				}
			})();
		}
	}, []);

	const signIn = async ({username, password}) => {
		try {
			const response = await axios.post(
				"http://localhost:5100/api/users/login",
				{ username, password }
			);
			setUser(response.data);
			localStorage.setItem("token", response.data.token);
		} catch (e) {
			// setError("Niepoprawne dane")
			console.log(e);
		}
	};
	const signOut = () => {
		setUser(null);
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider value={{ user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const auth = useContext(AuthContext);
	if (!auth) {
		throw Error("useAuth powinno być użyte wewnątrz AuthContext");
	}

    return auth;
};
