import React, { useState } from "react";
import FormField from "../components/molecules/FormField/FormField.js";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js";
import { Title } from "../components/atoms/Title/Title.styles.js";
import { Button } from "../components/atoms/Button/Button.js";

const initialFormState = {
	time: "",
	route: "",
};
//tutaj dane z drugiej tabeli wypożyczenia
const Rental = () => {
	const [formValues, setFormValues] = useState(initialFormState);

	const handleInputChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmitUser = (e) => {
		e.preventDefault();
		setFormValues(initialFormState);
	};

	return (
		<ViewWrapper as="form" onSubmit={handleSubmitUser}>
			<Title>Wypożycz hulajnogę</Title>
			<FormField
				label="Czas"
				id="time"
				name="time"
				value={formValues.time}
				onChange={handleInputChange}
			/>
			<FormField
				label="Trasa"
				id="route"
				name="route"
				value={formValues.route}
				onChange={handleInputChange}
			/>
			<Button type="submit">Wyślij</Button>
		</ViewWrapper>
	);
};

export default Rental;
