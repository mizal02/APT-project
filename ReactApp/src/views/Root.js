import React, { useState } from "react";
import { Wrapper } from "./Root.styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainTemplate from "../components/templates/MainTemplate/MainTemplate";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Registration from "./Registration";
import MainPage from "./MainPage";
import Rental from "./Rental";
import { useForm } from "react-hook-form";
import FormField from "../components/molecules/FormField/FormField";
import { Button } from "../components/atoms/Button/Button";
import { useAuth } from "../hooks/useAuth";
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

const UnAuthenticatedApp = () => {
	const auth = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	// const onSubmit = ({ username, password }) =>
	// 	handleSignIn({ username, password });

	return (
		<form
			onSubmit={handleSubmit(auth.signIn)}
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
			{/* {loginError && <span>{loginError}</span>} */}
		</form>
	);
};

const Root = () => {
	// const [token, setToken] = useState();
	// if(!token) {
	// 	return <Login setToken={setToken} />
	// }

	const auth = useAuth();

	return (auth.user ? (
		<AuthenticatedApp />
	) : (
		<UnAuthenticatedApp />
	))
};

export default Root;
