import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../assets/styles/globalStyles";
import { theme } from "../assets/styles/theme";
import { Wrapper } from "./Root.styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainTemplate from "../components/templates/MainTemplate/MainTemplate";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Registration from "./Registration";
import MainPage from "./MainPage";
import Rental from "./Rental";
import { UsersProvider } from "../providers/UsersProvider";
import { useForm } from "react-hook-form";
import FormField from "../components/molecules/FormField/FormField";
import { Button } from "../components/atoms/Button/Button";
import axios from "axios";
const AuthenticatedApp = () => {
	return (
		<MainTemplate>
			<Wrapper>
				<Switch>
					<Route path="/rental">
						<Rental />
					</Route>
					<Route path="/main-page">
						<MainPage />
					</Route>
					<Route path="/">
						<Dashboard />
					</Route>
				</Switch>
			</Wrapper>
		</MainTemplate>
	);
};

const UnAuthenticatedApp = ({ handleSignIn, loginError }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	// const onSubmit = ({ username, password }) =>
	// 	handleSignIn({ username, password });

	return (
		<form
			onSubmit={handleSubmit(handleSignIn)}
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}>
			<FormField
				label="login"
				name="username"
				id="username"
				{...register("username", { required: true })}
			/>
			{errors.username && <span>Login jest wymagany</span>}
			<FormField
				label="password"
				name="password"
				id="password"
				type="password"
				{...register("password", { required: true })}
			/>
			{errors.password && <span>Hasło jest wymagane</span>}
			<Button type="submit">Zaloguj się</Button>
			{loginError && <span>{loginError}</span>}
		</form>
	);
};

const Root = () => {
	// const [token, setToken] = useState();
	// if(!token) {
	// 	return <Login setToken={setToken} />
	// }
	const [user, setUser] = React.useState(null);
	const [error, setError] = React.useState(null);

	React.useEffect(() => {
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

	const handleSignIn = async ({ username, password }) => {
		try {
			const response = await axios.post(
				"http://localhost:5100/api/users/login",
				{ username, password }
			);
			setUser(response.data);
			localStorage.setItem("token", response.data.token);
		} catch (e) {
			setError("Niepoprawne dane")
			console.log(e);
		}
	};

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				{/* <MainTemplate> */}
				{user ? (
					<AuthenticatedApp />
				) : (
					<UnAuthenticatedApp loginError={error} handleSignIn={handleSignIn} />
				)}
				{/* <UsersProvider>
						<Wrapper>
							<Switch>
								
								<Route path="/rental">
									<Rental />
								</Route>
								<Route path="/login">
									<Login />
								</Route>
								<Route path="/register">
									<Registration />
								</Route>
								<Route path="/main-page">
									<MainPage />
								</Route>
								<Route path="/">
									<Dashboard />
								</Route>
							</Switch>
						</Wrapper>
					</UsersProvider> */}
				{/* </MainTemplate> */}
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default Root;
