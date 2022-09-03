import React, { useContext, useReducer } from "react";
import FormField from "../components/molecules/FormField/FormField";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js.js";
import { Title as StyledTitle } from "../components/atoms/Title/Title.styles";
import { Button } from "../components/atoms/Button/Button";
import { UsersContext } from "../providers/UsersProvider";
import { useForm } from "../hooks/useForm";

const initialFormState = {
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	error: "",
};

const AddUser = () => {
	const { handleAddUser } = useContext(UsersContext);
	// const dimensions = useWindowHeight();
	const {
		formValues,
		handleInputChange,
		handleClearForm,
		handleThrowError,
		handleToggleConsent,
	} = useForm(initialFormState);

	const handleSubmitUser = (e) => {
		e.preventDefault();

		if (formValues.consent) {
			handleAddUser(formValues);
			handleClearForm(initialFormState);
		} else {
			handleThrowError("You need to give consent");
		}
		// setFormValues(initialFormState);
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
			<FormField
				label="Consent"
				id="consent"
				name="consent"
				type="checkbox"
				value={formValues.consent}
				onChange={handleToggleConsent}
			/>
			<Button type="submit">Add</Button>
			{formValues.error ? <p>{formValues.error}</p> : null}
		</ViewWrapper>
	);
};

export default AddUser;
