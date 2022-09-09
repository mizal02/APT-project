import React, { useEffect, useState } from "react";
import { ViewWrapper } from "../components/molecules/ViewWrapper/ViewWrapper.js";
import { Wrapper } from "./Dashboard.styles.js";
import axios from "axios";

const Dashboard = () => {
	
	const [users, setUsers] = useState(null);
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

	return (
		<>
			<ViewWrapper>
				{users ? (
					users.map((user) => {						
						return (
							<Wrapper key={user.id}>
								{`Nazwa użytkownika: ${user.username}`}
								<p>{`Email: ${user.email}`}</p>
								<p>{`Rola: ${user.role}`}</p>
								<p>{`Aktywny: ${user.isActive}`}</p>
								
							</Wrapper>
						);
						
					})
				) : (
					<p>loading users list</p>
				)}

			</ViewWrapper>
		</>
	);
};

export default Dashboard;
