import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormField from "../components/molecules/FormField/FormField";
import { Wrapper } from "./Root.styles";
import { Title } from "../components/atoms/Title/Title.styles";
import { Button } from "../components/atoms/Button/Button";

const AccountBalance = () => {
	const {
		register,
		handleSubmit,
	} = useForm();

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
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
		window.location.reload(true);
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
					<Button type="submit">Doładuj</Button>
				</form>
			</Wrapper>
		</>
	);
};

export default AccountBalance;
