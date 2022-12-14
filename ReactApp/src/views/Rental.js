import React, { useState, useEffect } from "react";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js.js";
import { Title } from "../components/atoms/Title/Title.styles.js";
import { Button } from "../components/atoms/Button/Button.js";
import axios from "axios";
import { useForm } from "react-hook-form";
import { StyledLabel } from "./Root.styles.js";
import { StyledForm } from "./Rent.styles.js";
import { ErrorInfo } from "../components/atoms/Info/Info.js";


const Rental = () => {
	const {
		handleSubmit,
	} = useForm();

	const [user, setUser] = useState(null);
	const [error, setError] = useState(false);

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

				} catch (e) {

					console.log(e);

				}
			})();
		}
	}, []);

	const startRent = async ({ startTime }) => {
		const UserId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		try {
			const response = await axios.post(
				`http://localhost:5100/api/users/${UserId}/startRent`,
				{ startTime },
				config
			);
			setUser(response.data);
			console.log(response.data);
		} catch (e) {
			console.log(e);
			setError(true);
		}

		console.log("start rent");
	};

	const stopRent = async ({ endTime }) => {
		const UserId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		try {
			const response = await axios.post(
				`http://localhost:5100/api/users/${UserId}/endRent`,
				{ endTime },
				config
			);
			setUser(response.data);
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}

		console.log("stop rent");
	};
	let isCan = true;
	return (
		<ViewWrapper>
			<Title>Wypo??ycz hulajnog??</Title>
			{user
				? user.rentals.forEach((element) => {
						if (!element.isCompleted) {
							isCan = false;
						} else {
							isCan = true;
						}
				  })
				: console.log("rental page loading...")}

			{isCan ? (
				<>
					<StyledForm onSubmit={handleSubmit(startRent)}>
						<StyledLabel>
							Aby wypo??yczy?? kliknij przycisk "Rozpocznij"
						</StyledLabel>
						<Button type="submit">Rozpocznij </Button>
					</StyledForm>
					{error ? (
						<ErrorInfo>Zbyt niski stan portfela, doladuj konto.</ErrorInfo>
					) : null}
				</>
			) : (
				<StyledForm onSubmit={handleSubmit(stopRent)}>
					<StyledLabel>Aby odda?? kliknij przycisk "Zako??cz"</StyledLabel>
					<Button type="submit">Zako??cz </Button>
				</StyledForm>
			)}

		</ViewWrapper>
	);
};

export default Rental;
