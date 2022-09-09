import React, { useEffect, useState } from "react";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js";
import { Wrapper } from "./Dashboard.styles.js";
import axios from "axios";
import { BanButton } from "./Dashboard.styles.js";
import BlockedUser from "./BlockedUser.js";

const Dashboard = () => {
	const [users, setUsers] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		(async () => {
			try {
				const response = await axios.get(
					`http://localhost:5100/api/users`,
					config
				);
				setUsers(response.data);
				console.log(response.data);
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	const deactive = async (userId) => {
		const token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		console.log(userId);
		try {
			const response = await axios.post(
				`http://localhost:5100/api/auth/deactive/${userId}`,
				{ userId },
				config
			);
			setUser(response.data);
			console.log(userId);
		} catch (e) {
			console.log(e);
		}
		console.log("deactivating");
	};

	return (
		<>
			<ViewWrapper>
				{users ? (
					users.map((user) => {
						return (
							<>
								<Wrapper>
									{`Nazwa użytkownika: ${user.username}`}
									<p>{`Email: ${user.email}`}</p>
									<p>{`Rola: ${user.role}`}</p>
									<p>{`Aktywny: ${user.isActive}`}</p>
									<BanButton
										onClick={(e) => {
											console.log(user.id);
											deactive(user.id);
											window.location.reload(false);
										}}>
										Banuj użytkownika
									</BanButton>
								</Wrapper>
							</>
						);
					})
				) : (
					<p>loading users list</p>
				)}
				{/* {click ? (
					<>
						{console.log("iii")}
						<BlockedUser UserId={IdUser} />
					</>
				) : (
					console.log("nnuull")
				)} */}
			</ViewWrapper>
		</>
	);
};

export default Dashboard;
