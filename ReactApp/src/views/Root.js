import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../assets/styles/globalStyles";
import { theme } from "../assets/styles/theme";
import { Wrapper } from "./Root.styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainTemplate from "../components/templates/MainTemplate/MainTemplate";
import AddUser from "./AddUser";
import Dashboard from "./Dashboard";
import { UsersProvider } from "../providers/UsersProvider";

const Root = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<MainTemplate>
					<UsersProvider>
						<Wrapper>
							<Switch>
								<Route path="/add-user">
									<AddUser />
								</Route>
								<Route path="/">
									<Dashboard />
								</Route>
							</Switch>
						</Wrapper>
					</UsersProvider>
				</MainTemplate>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default Root;
