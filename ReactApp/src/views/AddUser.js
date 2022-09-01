import React, { useState, useContext } from "react";
import FormField from "../components/molecules/FormField/FormField";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js.js";
import { Title as StyledTitle } from "../components/atoms/Title/Title.styles";
import { Button } from "../components/atoms/Button/Button";
import { UsersContext } from "../providers/UsersProvider";

const initialFormState = {
	name: "",
	attendance: "",
	average: "",
};

const AddUser = () => {
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
			<StyledTitle>Add new student</StyledTitle>
			<FormField
				label="Name"
				id="name"
				name="name"
				value={formValues.name}
				onChange={handleInputChange}
			/>
			<FormField
				label="Attendance"
				id="attendance"
				name="attendance"
				value={formValues.attendance}
				onChange={handleInputChange}
			/>
			<FormField
				label="Average"
				id="average"
				name="average"
				value={formValues.average}
				onChange={handleInputChange}
			/>
			<Button type="submit">Add</Button>
		</ViewWrapper>
	);
};

export default AddUser;
