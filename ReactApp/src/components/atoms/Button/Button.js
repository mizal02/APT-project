import styled from "styled-components";

export const Button = styled.button`
	cursor: pointer;
	margin: 15px 0;
	padding: 8px 20px;
	font-size: ${({ theme }) => theme.fontSize.m};
	background-color: ${({ theme }) => theme.colors.lightPurple};
	border-radius: 20px;
	border: none;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.darkGrey};
`;
