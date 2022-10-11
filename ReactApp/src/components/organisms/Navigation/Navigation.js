import React from "react";
import { Wrapper, Logo, StyledLink } from "./Navigation.styles";
import { useAuth } from "../../../hooks/useAuth";

const Navigation = () => {
	const auth = useAuth();
	let isAdmin = false;
	if (auth.user.role === "admin") {
		isAdmin = true;
		console.log(`isAdmin ${isAdmin}`);
	} else {
		console.log(`isAdmin ${isAdmin}`);
	}

	return (
		<Wrapper>
			<Logo>
				<h1>
					Wypożyczalnia
					<br />
					Hulajnóg
				</h1>
			</Logo>
			{isAdmin ? (
				<>
					<StyledLink to="/main-page">Informacje</StyledLink>
					<StyledLink to="/rental">Wypożycz</StyledLink>
					<StyledLink exact to="/users">
						Użytkownicy
					</StyledLink>
					<StyledLink to="/login" onClick={auth.signOut}>
						Wyloguj
					</StyledLink>
				</>
			) : (
				<>
					<StyledLink to="/main-page">Informacje</StyledLink>
					<StyledLink to="/rental">Wypożycz</StyledLink>
					<StyledLink as="a" to="/login" onClick={auth.signOut}>
						Wyloguj
					</StyledLink>
				</>
			)}
		</Wrapper>
	);
};

export default Navigation;
