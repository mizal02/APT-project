import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyledInfo, Wrapper } from "./StudentsListItem.styles";
import DeleteButton from "../../atoms/DeleteButton/DeleteButton";
import { Average } from "../../atoms/Average/Average";
import { UserShape } from "../../../types";
import { UsersContext } from "../../../providers/UsersProvider";

const UserListItem = ({ userData: { average, name, attendance = "0%" } }) => {
	const { deleteUser } = useContext(UsersContext);
	return (
		<Wrapper>
			<Average value={average}>{average}</Average>
			<StyledInfo>
				<p>
					{name}
					<DeleteButton onClick={() => deleteUser(name)} />
				</p>
				<p>{attendance}</p>
			</StyledInfo>
		</Wrapper>
	);
};

UserListItem.propTypes = {
	userData: PropTypes.shape(UserShape),
};

export default UserListItem;
