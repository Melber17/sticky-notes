import React from "react";
import styled from "styled-components/native";

import { Spacer } from "../../shared/config";
import { WithSafeArea } from "../../shared/ui";
import { Header } from "../../widgets/Header";

export const HomeScreen: React.FC = () => {

	return (
		<WithSafeArea>
			<Container>
				<Header />
			</Container>
		</WithSafeArea>
	);
};

const Container = styled.View`
	flex: 1;
	margin: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
	background: ${(props) => props.theme.colors.background};
`;
