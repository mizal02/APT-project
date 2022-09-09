import React, { useState } from "react";
import FormField from "../components/molecules/FormField/FormField";
// import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js.js";
import { Wrapper } from "./Register.styles";
import { Title as StyledTitle } from "../components/atoms/Title/Title.styles";
import { Button } from "../components/atoms/Button/Button";
import axios from "axios";
import { useForm } from "react-hook-form";


const Registration = () => {
	
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [user, setUser] = useState(null);

	const Register = async ({ email, username, password }) => {
		try {
			const response = await axios.post(
				"http://localhost:5100/api/auth/register",
				{ email, username, password }
			);
			setUser(response.data);
			// localStorage.setItem("username", response.data.username);
			console(response.data);
			// localStorage.setItem("token", response.data.token);
		} catch (e) {
			console.log(e);
		}
	};
	//
	return (
		<Wrapper>
			<form onSubmit={handleSubmit(Register)}>
				<StyledTitle>Zarejestruj się</StyledTitle>
				{/* <FormField
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
				/> */}
				<FormField
					label="Login"
					id="username"
					name="username"
					{...register("username", { required: true })}
				/>
				{errors.username && <span>Login jest wymagany</span>}
				<FormField
					label="Email"
					id="email"
					name="email"
					{...register("email", { required: true })}
				/>
				{errors.email && <span>Email jest wymagany</span>}
				<FormField
					label="Password"
					id="password"
					name="password"
					type="password"
					{...register("password", { required: true })}
				/>
				{errors.password && <span>Hasło jest wymagane</span>}
				<Button type="submit">Załóż konto</Button>
			</form>
		</Wrapper>
	);
};

export default Registration;
