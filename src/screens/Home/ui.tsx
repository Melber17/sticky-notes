import React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { BLACK_COLOR, Spacer } from "../../shared/config";
import { WithSafeArea } from "../../shared/ui";
import { Header } from "../../widgets/Header";
import { NotesList } from "../../widgets/notes-list";
import PlusIcon from "../../shared/assets/icons/plusIcon.svg";
import { RootStackListType } from "..";
import { RootScreens } from "../config";
import { useAppSelector } from "../../shared/lib";

export type INavigation = StackNavigationProp<RootStackListType, RootScreens.HOME>;

interface IProps {
	navigation: INavigation;
}

export const HomeScreen: React.FC<IProps> = ({ navigation }) => {
	const { data } = useAppSelector(store => store.notes);

	const handlePressButton = () => {
		navigation.push(RootScreens.CREATE_NOTE, { editable: true });
	};

	return (
		<WithSafeArea>
			<Container>
				<NotesList headerComponent={<Header />} data={data} />
				<Button onPress={handlePressButton} style={styles.button}>
					<PlusIcon />
				</Button>
			</Container>
		</WithSafeArea>
	);
};

const styles = StyleSheet.create({
	button: {
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

const Container = styled.View`
	flex: 1;
	margin: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
	background: ${(props) => props.theme.colors.background};
`;

const Button = styled.TouchableOpacity`
	width: 70px;
	height: 70px;
	justify-content: center;
	align-items: center;
	border-radius: 35px;
	background: ${(props) => props.theme.colors.background};
	position: absolute;
	bottom: ${Spacer.EXTRA_LARGE}px;
	right: 0px;
`;
