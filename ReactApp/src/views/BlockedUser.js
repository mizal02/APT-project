import React, { useState } from "react";
import axios from "axios";

const BlockedUser = ({ UserId }) => {
	const [user, setUser] = useState(null);

	const deactive = async ({ userId }) => {
		UserId = userId;
		const token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		try {
			const response = await axios.post(
				`http://localhost:5100/api/auth/deactive/${UserId}`,
				{ UserId },
				config
			);
			setUser(response.data);
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
		console.log("deactivating");
	};
};

export default BlockedUser;
