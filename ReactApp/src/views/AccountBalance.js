import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormField from "../components/molecules/FormField/FormField";
import { Wrapper } from "./Root.styles";
import { Title } from "../components/atoms/Title/Title.styles";
import { Button } from "../components/atoms/Button/Button";
import MainPage from "./MainPage";

const AccountBalance = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [user, setUser] = useState(null);
	const ChangeAcountBalance = async ({ accountBalance }) => {
		const UserId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		try {
			const response = await axios.post(
				`http://localhost:5100/api/users/${UserId}/addAccountBalance`,
				{ accountBalance },
				config
			);
			setUser(response.data);
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
		window.location.reload(false);
	};

	return (
		<>
			{console.log(localStorage.getItem("accountBalance"))}

			<Wrapper>
				{console.log("account balance page")}
				<form onSubmit={handleSubmit(ChangeAcountBalance)}>
					<Title>Doładuj konto</Title>
					<FormField
						label="Kwota"
						id="accountBalance"
						name="accountBalance"
						{...register("accountBalance", { required: true })}
					/>
					{/* {console.log(`stan konta: ${user.accountBalance}`)} */}
					{/* czy tutaj trzeba dać jakąś obsługe błędów, jaką? */}
					<Button type="submit">Doładuj</Button>
				</form>
			</Wrapper>
		</>
	);
};

export default AccountBalance;
