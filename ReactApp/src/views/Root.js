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

const UnAuthenticatedApp = ({ handleSignIn }) => {
	const { register, handleSubmit } = useForm();
	const onSubmit = ({ login, password }) => handleSignIn({ login, password });

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}>
			<FormField
				label="login"
				name="login"
				id="login"
				{...register("login", { required: true })}
			/>
			{/* {errors.login && <span>Login is required</span>} */}
			<FormField
				label="password"
				name="password"
				id="password"
				type="password"
				{...register("password", { required: true })}
			/>
			{/* {errors.password && <span>Password is required</span>}
	{loginError && <span>{loginError}</span>} */}
			<Button type="submit">Zaloguj się</Button>
		</form>
	);
};

const Root = () => {
	// const [token, setToken] = useState();
	// if(!token) {
	// 	return <Login setToken={setToken} />
	// }
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			(async () => {
				try {
					axios.get("/", {
						headers: {
							authorization: `Bearer ${token}`,
						},
					});
				} catch (e) {
					console(e);
				}
			})();
		}
	}, []);

	const handleSignIn = async ({ login, password }) => {
		try {
			const response = await axios.post(
				"http://localhost:5100/api/users/login",
				{ login, password }
			);
			setUser(response.data);
			localStorage.setItem("token", response.data.token);
		} catch (e) {
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
					<UnAuthenticatedApp handleSignIn={handleSignIn} />
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
