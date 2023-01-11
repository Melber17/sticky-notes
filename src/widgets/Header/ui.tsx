import React, { useState } from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import Voice, { SpeechResultsEvent } from "@react-native-voice/voice";

import { ButtonWithIcon, CustomModal, Text } from "../../shared/ui";
import InfoIcon from "../../shared/assets/icons/InfoIcon.svg";
import MicrophoneIcon from "../../shared/assets/icons/microphoneIcon.svg";
import { GRAY_COLOR, Spacer } from "../../shared/config";
import { AppInformation } from "../AppInformation";
import { INavigation } from "../../screens/Home";
import { RootScreens } from "../../screens/config";

interface IHeaderProps {
	navigation: INavigation;
}

export const Header: React.FC<IHeaderProps> = ({ navigation }) => {
	const textValue = React.useRef("");
	const [isListening, setIsListening] = useState(false);
	const { t } = useTranslation();
	const [isOpenModal, setIsOpenModal] = useState(false);

	const stopSpeech = async () => {
		return await Voice.destroy(), setIsListening(false);
	};

	const callAction = async (value: string[]) => {
		const text = value[0].toLowerCase();

		if (text !== textValue.current) {
			textValue.current = text;

			if (text.includes("note")) {
				navigation.navigate(RootScreens.CREATE_NOTE, { editable: true });
				stopSpeech();

				return;
			}

			if (text.includes("information")) {
				handleToggleInfo();
				stopSpeech();
			}

		}
	};

	React.useEffect(() => {
		async function onSpeechResults (e: SpeechResultsEvent) {
			if (e.value) {
				callAction(e.value);
			}
		}

		Voice.onSpeechResults = onSpeechResults;

		return () => {
			Voice.destroy().then(Voice.removeAllListeners);
		};
	}, []);

	async function toggleListening () {
		if (isListening) {
			stopSpeech();
		} else {
			await Voice.start("en-US");
			setIsListening(true);
		}
	}

	const handleToggleInfo = () => {
		setIsOpenModal((prevValue) => !prevValue);
	};

	return (
		<Container>
			<Text size={40}>{t("general.title")}</Text>
			<Row>
				<ButtonWrapper>
					<Wrapper isListening={isListening} onPress={toggleListening}>
						<MicrophoneIcon />
					</Wrapper>
				</ButtonWrapper>
				<ButtonWithIcon onPress={handleToggleInfo}>
					<InfoIcon />
				</ButtonWithIcon>
			</Row>
			<CustomModal isVisible={isOpenModal} onClose={handleToggleInfo}>
				<AppInformation />
			</CustomModal>
		</Container>
	);
};

const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Row = styled.View`
	flex-direction: row;
`;

const ButtonWrapper = styled.View`
	margin-right: ${Spacer.MEDIUM}px;
`;

const Wrapper = styled.TouchableOpacity<{isListening: boolean}>`
  width: 50px;
  padding: 13px;
  align-items: center;
  border-radius: ${Spacer.MEDIUM}px;
  justify-content: center;
  background-color: ${GRAY_COLOR};
	border-width: 1px;
	border-color: ${({ isListening }) => isListening ? "green" : "transparent"};
`;
