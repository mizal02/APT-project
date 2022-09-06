import React, { useReducer } from "react";
import FormField from "../components/molecules/FormField/FormField";
import { Title as StyledTitle } from "../components/atoms/Title/Title.styles";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js";
import { UsersContext } from "../providers/UsersProvider";
import { useForm } from "../hooks/useForm";
import { Button } from "../components/atoms/Button/Button";

const initialFormState = {
	username: "",
	password: "",
	loginError: false,
	passwordError: false,
	error: "",
	// accountBalance: "",
};

const Login = () => {
	const { formValues, handleInputChange, handleClearForm, handleThrowError } =
		useForm(initialFormState);

	const handleSubmitUser = async (e) => {
		e.preventDefault();
		if (!formValues.username && !formValues.password) {
			handleThrowError("Błędny login lub hasło");
		} else {
			console.log(formValues.username);
			// tutaj przesłać token?
		}
		// if (formValues.username && formValues.password) {
		// 	await this.dispatch(
		// 		loginActions.login(formValues.username, formValues.password)
		// 	);
		// 	console.log("zalogowano");
		// }
	};
	// const handleSubmitUser = (e) => {
	// 	e.preventDefault();

	// 	if (formValues.login && formValues.password) {
	// 		handleClearForm(initialFormState);
	// 	} else {
	// 		handleThrowError("Błędny login lub hasło");
	// 	}
	// };

	return (
		<ViewWrapper as="form" onSubmit={handleSubmitUser}>
			<StyledTitle>Zaloguj się</StyledTitle>
			<FormField
				label="Login"
				id="username"
				name="username"
				value={formValues.username}
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
			{formValues.error ? <p>{formValues.error}</p> : null}
			<Button type="submit">Zaloguj</Button>

			{/* <p>Zarejestruj się</p> */}
			{/* tutaj będzie link do rejestracji */}
		</ViewWrapper>
	);
};

export default Login;
