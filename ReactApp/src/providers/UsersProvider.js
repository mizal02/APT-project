import React, { useState } from "react";
import { users as usersData } from "../data/users";

export const UsersContext = React.createContext({
	users: [],
	handleAddUser: () => {},
	deleteUser: () => {},
});

export const UsersProvider = ({ children }) => {
	const [users, setUsers] = useState(usersData);

	const deleteUser = (login) => {
		const filteredUsers = users.filter((user) => user.login !== login);
		setUsers(filteredUsers);
	};

	const handleAddUser = (values) => {
		const newUser = {
			firstname: values.firstname,
			lastname: values.lastname,
			email: values.email,
			accountBalance: values.accountBalance,
		};

		setUsers([newUser, ...users]);
	};

	return (
		<UsersContext.Provider
			value={{
				users,
				handleAddUser,
				deleteUser,
			}}>
			{children}
		</UsersContext.Provider>
	);
};
