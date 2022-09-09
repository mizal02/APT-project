import styled from "styled-components";
import { Button } from "../components/atoms/Button/Button";

export const Wrapper = styled.div`
	box-shadow: 0 2px 0 ${({ theme }) => theme.colors.grey};
	clip-path: polygon(0% 0%, 100% 0%, 100% 120%, 0% 120%);
`;

export const BanButton = styled(Button)`
	margin-top: 0;
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.black};
`;
