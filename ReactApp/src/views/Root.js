import React from "react";
import { Wrapper } from "./Root.styles";
import { Switch, Route, Redirect } from "react-router-dom";
import MainTemplate from "../components/templates/MainTemplate/MainTemplate";
import Dashboard from "./Dashboard";
import MainPage from "./MainPage";
import Rental from "./Rental";
import Login from "./Login";
import NotFoundPage from "./NotFoundPage";
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

						<Route path="/users">
							<Dashboard />
						</Route>
						<Route path="/**">
							<NotFoundPage />
						</Route>
					</Switch>
				
			</Wrapper>
		</MainTemplate>
	);
};

const Root = () => {
	const auth = useAuth();

	return auth.user ? (
		<>
			{auth.user.role === "admin" ? (
				<>
					{console.log("admin")}
					<Redirect from="/login" to="/users" />
					<AuthenticatedApp /> {console.log("authorization")}
				</>
			) : (
				<>
					{console.log("user")}
					<Redirect from="/login" to="/main-page" />
					<AuthenticatedApp /> {console.log("authorization")}
				</>
			)}
		</>
	) : (
		<>
			<Redirect to="/login" />
			<Login />
		</>
	);
};

export default Root;
