import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyledInfo, Wrapper } from "./StudentsListItem.styles";
import DeleteButton from "../../atoms/DeleteButton/DeleteButton";
// import { Average } from "../../atoms/Average/Average";
import { UserShape } from "../../../types";
import { UsersContext } from "../../../providers/UsersProvider";

const UserListItem = ({
	userData: { average, firstname, lastname, accountBalance = "5", login },
}) => {
	const { deleteUser } = useContext(UsersContext);
	return (
		<Wrapper>
			{/* <Average value={average}>{average}</Average> */}
			<StyledInfo>
				<p>
					{firstname} {lastname}
					<DeleteButton onClick={() => deleteUser(login)} />
				</p>
				<p>{login}</p>
				<p>{accountBalance} zł</p>
			</StyledInfo>
		</Wrapper>
	);
};

UserListItem.propTypes = {
	userData: PropTypes.shape(UserShape),
};

export default UserListItem;
