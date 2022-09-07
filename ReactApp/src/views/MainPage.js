import React, { useState, useEffect } from "react";
import { Title } from "../components/atoms/Title/Title.styles";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js";
import { Button } from "../components/atoms/Button/Button";
import FormField from "../components/molecules/FormField/FormField";
import { useForm } from "../hooks/useForm";
import axios from "axios";
// import { useAuth } from "../hooks/useAuth";

let isClick = true;
const MainPage = () => {
	const [account, setAccount] = useState([]);
	const { formValues, handleInputChange } = useForm("");

	const [user, setUser] = useState(null);

	useEffect(() => {
		const UserId = localStorage.getItem("userId");
		// const token = localStorage.getItem("token");
		if (UserId) {
			(async () => {
				try {
					const response = await axios.get(
						`http://localhost:5100/api/users/${UserId}`
					);
					setUser(response.data);
					console.log(response.data);
				} catch (e) {
					// setError("Niepoprawne dane")
					console.log(e);
				}
			})();
		}
	}, []);

	const onButtonClick = (e) => {
		// handleAddUser(formValues);
	};

	const handleAddOnClick = (e) => {
		if (isClick) {
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
		}
		isClick = false;
	};

	// const handleEditData = (e) => {
	// 	//tuatj formularz, albo strona do zmiany danych
	// };

	return (
		<ViewWrapper>
			<Title>Witaj, {user ? user.username : console.log(user)}</Title>
			{console.log(localStorage.getItem("username"))}

			{/*<Title>
				{users[0].firstname} {users[0].lastname}
			</Title>
			<p>Stan twojego konta wynosi: {users[0].accountBalance} zł</p>
			{account} */}
			<Button type="submit" onClick={handleAddOnClick}>
				Doładuj konto
			</Button>
			<Button>Edytuj konto</Button>
		</ViewWrapper>
	);
};

export default MainPage;
