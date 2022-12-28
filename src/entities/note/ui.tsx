import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

import { RootScreens } from "../../screens/config";
import { INavigation } from "../../screens/Home";
import { BLACK_COLOR, Spacer } from "../../shared/config";
import { Text } from "../../shared/ui";
import { INoteResponse } from "./model";

interface INoteCartProps extends INoteResponse {
  width: number;
}

export const NoteCart: React.FC<INoteCartProps> = (props) => {
	const { title, color } = props;
	const navigation = useNavigation<INavigation>();
	const handlePressCart = () => {
		navigation.push(RootScreens.CREATE_NOTE, { editable: false, note: props },);
	};

	return (
		<Container onPress={handlePressCart} style={styles.cart} {...props}>
			<Title color={color} numberOfLines={3}>
				{title}
			</Title>
		</Container>
	);
};

const styles = StyleSheet.create({
	cart: {
		shadowColor: BLACK_COLOR,
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.39,
		shadowRadius: 8.3,

		elevation: 13,
	},
});

const Container = styled.TouchableOpacity<INoteCartProps>`
  width: ${({ width }) => width}px;
	height: 120px;
  background: ${({ backgroundColor }) => backgroundColor};
  padding: ${Spacer.SMALL}px;
	border-radius: 10px;
	margin-bottom: ${Spacer.MEDIUM}px;
`;

const Title = styled(Text)<{color: string}>`
	font-size: ${Spacer.LARGE}px;
	color: ${({ color }) => color};
`;
