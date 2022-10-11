import React from "react";
import { Button } from "../components/atoms/Button/Button";
import { Title } from "../components/atoms/Title/Title.styles";
import FormField from "../components/molecules/FormField/FormField";
import { Wrapper } from "./Root.styles";
import { useForm } from "react-hook-form";
import axios from "axios";

const Edit = () => {
	const {
		register,
		handleSubmit,
	} = useForm();

	const ChangeData = async ({ email, password }) => {
		const UserId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		try {
			const response = await axios.post(
				`http://localhost:5100/api/auth/${UserId}`,
				{ email, password },
				config
			);
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
		console.log("edit");
		window.location.reload(false); 
	};

	return (
		<Wrapper>
			{console.log("edit page")}
			<form onSubmit={handleSubmit(ChangeData)}>
				<Title>Edytuj</Title>
				<FormField
					label="Nowy email"
					id="email"
					name="email"
					{...register("email", { required: true })}
				/>

				<FormField
					label="Nowe hasło"
					id="password"
					name="password"
					type="password"
					{...register("password", { required: true })}
				/>

				<Button type="submit">Zapisz</Button>
			</form>
		</Wrapper>
	);
};

export default Edit;
