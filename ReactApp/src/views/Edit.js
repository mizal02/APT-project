import React, {useState} from "react";
import { Button } from "../components/atoms/Button/Button";
import { Title } from "../components/atoms/Title/Title.styles";
import FormField from "../components/molecules/FormField/FormField";
import { Wrapper } from "./Root.styles";
import { useForm } from "react-hook-form";

const Edit = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [user, setUser] = useState(null);

	const ChangeData = async ({}) => {
		const UserId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		window.location.reload(false); // or true
	};

	return (
		<Wrapper>
			{console.log("edit page")}
			<form onSubmit={handleSubmit(ChangeData)}>
				<Title>Edytuj</Title>
				<FormField
					label="Nowe hasło"
					id="password"
					name="password"
					{...register("password", { required: true })}
				/>
				<Button type="submit">Zapisz</Button>
			</form>
		</Wrapper>
	);
};

export default Edit;
