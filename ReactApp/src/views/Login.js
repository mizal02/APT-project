import React, { useState } from "react";
import FormField from "../components/molecules/FormField/FormField";
import { Button } from "../components/atoms/Button/Button";
import { MainWrapper, Wrapper, StyledForm } from "./Root.styles";
import { Title } from "../components/atoms/Title/Title.styles";
import { ErrorInfo } from "../components/atoms/Info/Info";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import Registration from "./Registration";

const Login = () => {
	const auth = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	// const onSubmit = ({ username, password }) =>
	// 	handleSignIn({ username, password });
	const [click, setClick] = useState(false);

	return (
		<MainWrapper>
			<Wrapper>
				<>
				{console.log('login page')
				}
					<StyledForm onSubmit={handleSubmit(auth.signIn)}>
						<Title>Zaloguj się</Title>
						<FormField
							label="login"
							name="username"
							id="username"
							{...register("username", { required: true })}
						/>
						{errors.username && <ErrorInfo>Login jest wymagany</ErrorInfo>}
						<FormField
							label="password"
							name="password"
							id="password"
							type="password"
							{...register("password", { required: true })}
						/>
						{errors.password && <ErrorInfo>Hasło jest wymagane</ErrorInfo>}
						<Button type="submit">Zaloguj się</Button>
						{auth.error && (
							<ErrorInfo>
								{/* {auth.error} */}
								Niepoprawne dane
							</ErrorInfo>
						)}
					</StyledForm>
					{click ? null : (
						<Button
							type="submit"
							onClick={(e) => {
								setClick(!click);
							}}>
							{" "}
							Zarejestruj
						</Button>
					)}
				</>

				{click ? <Registration /> : null}
			</Wrapper>
		</MainWrapper>
	);
};

export default Login;
