import styled from "styled-components";

export const StyledButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 22px;
	height: 22px;
	margin: 0 10px;
	background-color: ${({ theme }) => theme.colors.grey};
	border-radius: 50px;
	// background-color: ${(props) =>
		props.isSecondary ? "#e7e044" : "#c0c7d6"} ;
	// border-radius: ${({ isSquare }) => (isSquare ? "0px" : "50px")} ;
	border: none;
	color: white;

	svg {
		width: 100%;
		height: 100%;
	}
`;
