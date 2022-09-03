import React, { useRef, useState, useEffect, useContext } from "react";
import FormField from "../components/molecules/FormField/FormField";
import { Title as StyledTitle } from "../components/atoms/Title/Title.styles";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js";
import { UsersContext } from "../providers/UsersProvider";
import { useForm } from "../hooks/useForm";
import { Button } from "../components/atoms/Button/Button";


const initialFormState = {
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	error: "",
	// accountBalance: "",
};

const Login = () => {
	const { formValues, handleInputChange, handleClearForm, handleThrowError } =
		useForm(initialFormState);

	const handleSubmitUser = (e) => {
		e.preventDefault();

		if (formValues.login && formValues.password) {
			handleClearForm(initialFormState);
		} else {
			handleThrowError("Błędny login lub hasło");
		}
	};

	return (
		<ViewWrapper as="form" onSubmit={handleSubmitUser}>
			<StyledTitle>Zaloguj się</StyledTitle>
			<FormField
				label="Login"
				id="login"
				name="login"
				value={formValues.login}
				onChange={handleInputChange}
			/>
			<FormField
				label="Password"
				id="password"
				name="password"
				type="password"
				value={formValues.password}
				onChange={handleInputChange}
			/>
			<Button type="submit">Zaloguj</Button>

			{/* <p>Zarejestruj się</p> */}
			{/* tutaj będzie link do rejestracji */}
		</ViewWrapper>
	);
};

export default Login;
