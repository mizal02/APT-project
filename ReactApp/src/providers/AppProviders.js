import React from "react";
import { theme } from "../assets/styles/theme";
import { GlobalStyle } from "../assets/styles/globalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "../hooks/useAuth";

const AppProviders = ({ children }) => {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<GlobalStyle />
					{children}
				</AuthProvider>
			</ThemeProvider>
		</Router>
	);
};

export default AppProviders;