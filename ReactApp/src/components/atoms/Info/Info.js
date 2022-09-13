import styled from "styled-components";

export const ErrorInfo = styled.div`
	margin: 8px 12px;
	display: flex;
	align-items: center;
	color: ${({ theme }) => theme.colors.error};
	font-size: 20px;
	font-weight: bold;
`;

export const SuccessInfo = styled.div`
	margin: 8px 12px;
	display: flex;
	// align-items: center;
	color: ${({ theme }) => theme.colors.success};
	font-size: 20px;
	font-weight: bold;
`;
