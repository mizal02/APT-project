import React, { useState, useContext } from "react";
import FormField from "../components/molecules/FormField/FormField";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js.js";
import { Title as StyledTitle } from "../components/atoms/Title/Title.styles";
import { Button } from "../components/atoms/Button/Button";
import { UsersContext } from "../providers/UsersProvider";

const initialFormState = {
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	// accountBalance: "",
};

const Login = () => {
	const [formValues, setFormValues] = useState(initialFormState);
	const { handleAddUser } = useContext(UsersContext);

	const handleInputChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmitUser = (e) => {
		e.preventDefault();
		handleAddUser(formValues);

		setFormValues(initialFormState);
	};

	return (
		<ViewWrapper as="form" onSubmit={handleSubmitUser}>
			<StyledTitle>Zaloguj się</StyledTitle>
			<FormField
				label="Firstname"
				id="firstname"
				name="firstname"
				value={formValues.firstname}
				onChange={handleInputChange}
			/>
			<FormField
				label="Lastame"
				id="lastname"
				name="lastname"
				value={formValues.lastname}
				onChange={handleInputChange}
			/>
			<FormField
				label="Email"
				id="email"
				name="email"
				value={formValues.email}
				onChange={handleInputChange}
			/>
			<FormField
				label="Password"
				id="password"
				name="password"
				value={formValues.password}
				onChange={handleInputChange}
			/>
			<Button type="submit">Zaloguj</Button>
		</ViewWrapper>
	);
};

export default Login;
