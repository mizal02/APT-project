import styled from "styled-components";

export const Wrapper = styled.div`
	box-shadow: 0 2px 0 ${({ theme }) => theme.colors.grey};
	clip-path: polygon(0% 0%, 100% 0%, 100% 120%, 0% 120%);
`;