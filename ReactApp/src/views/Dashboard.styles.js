import styled from "styled-components";
import { Button } from "../components/atoms/Button/Button";

export const Wrapper = styled.div`
margin-bottom: 8px;
	box-shadow: 0 2px 0 ${({ theme }) => theme.colors.grey};
	clip-path: polygon(0% 0%, 100% 0%, 100% 120%, 0% 120%);
`;

export const BanButton = styled(Button)`
	margin-top: 0;
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.black};
`;

export const ActiveButton = styled(Button)`
	margin-top: 0;
    background-color: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.black};
`;

export const UserList = styled.ul`
	max-height: 450px;
	overflow-y: scroll;
`;