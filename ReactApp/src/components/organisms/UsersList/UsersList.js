import React from "react";
import PropTypes from "prop-types";
import UserListItem from "../../molecules/StudentsListItem/StudentsListItem";
import { StyledList } from "./UserList.styles";
import { Title as StyledTitle } from "../../atoms/Title/Title.styles";
import { UserShape } from "../../../types/index";

const UsersList = ({ users }) => {
	return (
		<>
			<StyledTitle>Users list</StyledTitle>
			<StyledList>
				{users.map((userData) => (
					<UserListItem key={userData.email} userData={userData} />
				))}
			</StyledList>
		</>
	);
};
UsersList.propTypes = {
	users: PropTypes.arrayOf(PropTypes.shape(UserShape)),
	// deleteUser: PropTypes.func,
};
export default UsersList;
