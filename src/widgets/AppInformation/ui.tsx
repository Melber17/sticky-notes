import React from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";

import { BLUE_COLOR, Fonts, FontStyles, Spacer } from "../../shared/config";
import { Text } from "../../shared/ui";
import { SOCIAL_MEDIA_LINK } from "./config";

export const AppInformation: React.FC = () => {
	const { t } = useTranslation();
	const handleOpenLink = () => {
		Linking.openURL(SOCIAL_MEDIA_LINK);
	};

	return (
		<Container>
			<Title>🎉 Welcome! 🎉</Title>
			<EmojiImage
				resizeMode="cover"
				source={require("../../shared/assets/icons/emoji.png")}
			/>
			<DescriptionContainer>
				<DescriptionText>
					{t("general.welcomeTitle")}{" "}
					<Text size={18} fontStyle={FontStyles.BOLD}>
						{t("general.title")}.
					</Text>
					{t("general.description")}
					{t("general.develop")}
				</DescriptionText>
				<LinkButton onPress={handleOpenLink}>
					<LinkText> Melber17</LinkText>
				</LinkButton>
			</DescriptionContainer>
		</Container>
	);
};

const Container = styled.ScrollView``;

const Title = styled(Text)`
	margin: 0 auto;
	font-size: ${Spacer.EXTRA_LARGE}px;
	font-family: ${Fonts.NUNITO}-${FontStyles.BOLD};
	padding-top: ${Spacer.MEDIUM}px;
	padding-bottom: 0;
`;

const EmojiImage = styled(FastImage)`
	width: 240px;
	height: 300px;
	padding: 0 ${Spacer.MEDIUM}px;
	margin: 0 auto;
`;

const DescriptionContainer = styled.Text`
	margin: ${Spacer.MEDIUM}px;
`;

const DescriptionText = styled(Text)`
	text-align: center;
	font-size: 18px;
	color: ${(props) => props.theme.colors.color};
	font-family: ${Fonts.NUNITO}-${FontStyles.SEMIBOLD};
`;

const LinkButton = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	transform: translateY(5px);
`;

const LinkText = styled(Text)`
	font-size: 18px;
	color: ${BLUE_COLOR};
	font-family: ${Fonts.NUNITO}-${FontStyles.BOLD};
`;
