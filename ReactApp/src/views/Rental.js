import React, { useContext, useState } from "react";
import FormField from "../components/molecules/FormField/FormField.js";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js";
import { UsersContext } from "../providers/UsersProvider.js";

const initialFormState = {
	time: "",
	route: "",
};
const Rental = () => {
	const [formValues, setFormValues] = useState(initialFormState);
	const { users } = useContext(UsersContext);

	const handleInputChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<ViewWrapper>
			<h3>Wypożycz hulajnogę</h3>
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
		</ViewWrapper>
	);
};

export default Rental;
