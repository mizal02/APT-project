import React, { useState } from "react";
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
		formState: { errors },
	} = useForm();

	const [user, setUser] = useState(null);

	const ChangeData = async ({ username, password }) => {
		const UserId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		try {
			const response = await axios.post(
				`http://localhost:5100/api/auth/${UserId}`,
				{ username, password },
				config
			);
			setUser(response.data);
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
		console.log("edit");
		// window.location.reload(false); // or true
	};

	return (
		<Wrapper>
			{console.log("edit page")}
			<form onSubmit={handleSubmit(ChangeData)}>
				<Title>Edytuj</Title>
				<FormField
					label="Nowy login"
					id="username"
					name="username"
					{...register("username", { required: true })}
				/>
				{errors.username && <span>Login</span>}
				<FormField
					label="Nowe hasło"
					id="password"
					name="password"
					type="password"
					{...register("password", { required: true })}
				/>
				{errors.password && <span>hasło</span>}
				<Button type="submit">Zapisz</Button>
			</form>
		</Wrapper>
	);
};

export default Edit;
