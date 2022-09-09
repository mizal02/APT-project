import styled from "styled-components";

export const Title = styled.h1`
	display: flex;
	justify-content: center;
	font-size: ${({ theme }) => theme.fontSize.xxl};
	color: ${({ theme }) => theme.colors.darkGrey};
`;
