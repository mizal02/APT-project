import React, { useState, useEffect } from "react";
import { Title } from "../components/atoms/Title/Title.styles";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js";
import { Button } from "../components/atoms/Button/Button";
import axios from "axios";
import AccountBalance from "./AccountBalance";
import { RouteList } from "./Root.styles";
import Edit from "./Edit";

const MainPage = () => {
	const [click, setClick] = useState(false);
	const [editClick, setEditClick] = useState(false);

	const [user, setUser] = useState(null);

	useEffect(() => {
		const UserId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		if (UserId) {
			(async () => {
				try {
					const response = await axios.get(
						`http://localhost:5100/api/users/${UserId}`,
						config
					);
					setUser(response.data);
					console.log(response.data);
				} catch (e) {
					// setError("Niepoprawne dane")
					console.log(e);
				}
			})();
		}
	}, []);

	return (
		<>
			<ViewWrapper>
				{user ? (
					<>
						<Title>Witaj, {user.username}</Title>
						<Title>Email: {user.email}</Title>
						<Title>Stan konta: {user.accountBalance.toFixed(2)}zł</Title>
						<Title>Trasy</Title>
						<RouteList>
							{user.rentals.map((rental) => (
								<li key={rental.id}>
									{`Czas trwania: ${rental.completeTime} `}
									<p>{`Dystans: ${rental.distance.toFixed(2)} km`}</p>{" "}
								</li>
							))}
						</RouteList>
					</>
				) : (
					console.log("Ładowanie")
				)}
				{click ? (
					<>
						{console.log(click)}
						<AccountBalance />
						<Button
							type="submit"
							onClick={(e) => {
								setClick(!click);
								console.log(click);
							}}>
							Anuluj
						</Button>
						{console.log(`main page stan konta ${user.accountBalance}`)}
					</>
				) : (
					<Button
						type="submit"
						onClick={(e) => {
							setClick(!click);
							console.log(click);
						}}>
						Doładuj konto
					</Button>
				)}

				{editClick ? (
					<Edit />
				) : (
					<Button
						type="submit"
						onClick={(e) => {
							setEditClick(!editClick);
							console.log(editClick);
						}}>
						Edytuj konto
					</Button>
				)}
			</ViewWrapper>
		</>
	);
};

export default MainPage;
