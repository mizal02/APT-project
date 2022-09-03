import React, { useContext, useState } from "react";
import { Title } from "../components/atoms/Title/Title.styles";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js";
import { Button } from "../components/atoms/Button/Button";
import { UsersContext } from "../providers/UsersProvider";
import UserListItem from "../components/molecules/StudentsListItem/StudentsListItem";
import FormField from "../components/molecules/FormField/FormField";
import { useForm } from "../hooks/useForm";

const MainPage = () => {
	const { handleAddUser } = useContext(UsersContext);
	const [account, setAccount] = useState([]);
	const { formValues, handleInputChange } = useForm("");
	const { users } = useContext(UsersContext);

	const onButtonClick = (e) => {
		// handleAddUser(formValues);
	};
	const handleAddOnClick = (e) => {
		setAccount(
			account.concat(
				<>
					<FormField
						label="Kwota"
						id="accountBalance"
						name="accountBalance"
						value={formValues.accountBalance}
						onChange={handleInputChange}
					/>
					<Button onClick={onButtonClick}>Doładuj</Button>
				</>
			)
		);
	};

	return (
		<ViewWrapper>
			<Title>Witaj, {users[0].login}</Title>
			<p>Stan twojego konta wynosi: {users[0].accountBalance} zł</p>
			{account}
			<Button type="submit" onClick={handleAddOnClick}>
				Doładuj konto
			</Button>
			<p>Zmień hasło?</p>
		</ViewWrapper>
	);
};

export default MainPage;
