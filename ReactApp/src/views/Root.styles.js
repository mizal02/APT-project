import styled from "styled-components";
import { Label } from "../components/atoms/Label/Label";

export const MainWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	// height: 50%;
	box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.3);
`;

export const StyledForm = styled.form`
	margin: 25px;
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;
	max-width: 500px;
	padding: 40px 50px;
	border-radius: 25px;
	// box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.3);
`;

export const StyledLabel = styled(Label)`
	display: flex;
	justify-content: center;
	font-size: 16px;
`;

export const RouteList = styled.ul`
	max-height: 400px;
	overflow-y: scroll;
`;
