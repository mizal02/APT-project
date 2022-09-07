import styled from "styled-components";

export const ErrorInfo = styled.div`
	margin: 8px 16px;
	display: flex;
	// justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.colors.error};
	font-size: 20px;
    font-weight: bold;
`;
