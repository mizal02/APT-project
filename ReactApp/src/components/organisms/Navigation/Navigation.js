import React from "react";
import { Wrapper, Logo, StyledLink } from "./Navigation.styles";
import { useAuth } from "../../../hooks/useAuth";

const Navigation = () => {
	const auth = useAuth();

	return (
		<Wrapper>
			<Logo>
				<h1>
					Wypożyczalnia
					<br />
					Hulajnóg
				</h1>
			</Logo>
			<StyledLink exact to="/">
				Dashboard
			</StyledLink>
			{/* <StyledLink to="/add-user">Add user</StyledLink> */}
			<StyledLink as="a" onClick={auth.signOut}>
				Logout
			</StyledLink>
			<StyledLink to="/login">Zaloguj</StyledLink>
			{/* <StyledLink to="/register">Zarejestruj</StyledLink> */}

			<StyledLink to="/rental">Wypożycz</StyledLink>
			<StyledLink to="/main-page">Informacje</StyledLink>

			{/* <StyledLink to="/">Settings</StyledLink>
			<StyledLink to="/">Logout</StyledLink> */}
		</Wrapper>
	);
};

export default Navigation;
