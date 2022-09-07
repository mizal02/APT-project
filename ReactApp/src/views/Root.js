import React, { useState } from "react";
import { Wrapper, StyledForm, MainWrapper } from "./Root.styles";
import { Switch, Route } from "react-router-dom";
import MainTemplate from "../components/templates/MainTemplate/MainTemplate";
import Dashboard from "./Dashboard";
// import Login from "./Login";
import Registration from "./Registration";
import MainPage from "./MainPage";
import Rental from "./Rental";
import { useForm } from "react-hook-form";
import FormField from "../components/molecules/FormField/FormField";
import { Button } from "../components/atoms/Button/Button";
import { Title } from "../components/atoms/Title/Title.styles";
import { ErrorInfo } from "../components/atoms/Info/Info";
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
	const auth = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	// const onSubmit = ({ username, password }) =>
	// 	handleSignIn({ username, password });
	const [click, setClick] = useState(false);

	return (
		<MainWrapper>
			<Wrapper>
				<>
					{console.log("false")}
					<StyledForm onSubmit={handleSubmit(auth.signIn)}>
						<Title>Zaloguj się</Title>
						<FormField
							label="login"
							name="username"
							id="username"
							{...register("username", { required: true })}
						/>
						{errors.username && <ErrorInfo>Login jest wymagany</ErrorInfo>}
						<FormField
							label="password"
							name="password"
							id="password"
							type="password"
							{...register("password", { required: true })}
						/>
						{errors.password && <ErrorInfo>Hasło jest wymagane</ErrorInfo>}
						<Button type="submit">Zaloguj się</Button>
						{auth.error && (
							<ErrorInfo>
								{/* {auth.error} */}
								Niepoprawne dane
							</ErrorInfo>
						)}
					</StyledForm>
					{click ? null : (
						<Button
							type="submit"
							onClick={(e) => {
								setClick(!click);
							}}>
							{" "}
							Zarejestruj
						</Button>
					)}
				</>

				{click ? <Registration /> : null}
			</Wrapper>
		</MainWrapper>
	);
};

const Root = () => {
	// const [token, setToken] = useState();
	// if(!token) {
	// 	return <Login setToken={setToken} />
	// }

	const auth = useAuth();

	return auth.user ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
};

export default Root;
