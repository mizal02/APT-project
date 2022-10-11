import React, { useState } from "react";
import FormField from "../components/molecules/FormField/FormField";
import { Wrapper } from "./Register.styles";
import { Title as StyledTitle } from "../components/atoms/Title/Title.styles";
import { Button } from "../components/atoms/Button/Button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorInfo, SuccessInfo } from "../components/atoms/Info/Info";

const Registration = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const Register = async ({ email, username, password }) => {
		try {
			const response = await axios.post(
				"http://localhost:5100/api/auth/register",
				{ email, username, password }
			);

			setSuccess("Udało się zarejestrować");
			console.log(response.data);
		} catch (e) {
			console.log(e);
			setError("Isnieje już osoba z podanym loginem i/lub emailem");
		}
		console.log("register");
	};
	//
	return (
		<Wrapper>
			<form onSubmit={handleSubmit(Register)}>
				<StyledTitle>Zarejestruj się</StyledTitle>
				<FormField
					label="Login"
					id="username"
					name="username"
					{...register("username", { required: true })}
				/>
				{errors.username && <ErrorInfo>Login jest wymagany</ErrorInfo>}
				<FormField
					label="Email"
					id="email"
					name="email"
					{...register("email", { required: true })}
				/>
				{errors.email && <ErrorInfo>Email jest wymagany</ErrorInfo>}
				<FormField
					label="Password"
					id="password"
					name="password"
					type="password"
					{...register("password", { required: true })}
				/>
				{errors.password && <ErrorInfo>Hasło jest wymagane</ErrorInfo>}
				<Button type="submit">Załóż konto</Button>
			</form>
			{error ? (
				<ErrorInfo>{error}</ErrorInfo>
			) : (
				<SuccessInfo>{success}</SuccessInfo>
			)}
		</Wrapper>
	);
};

export default Registration;
