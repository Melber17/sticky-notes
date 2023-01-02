import React, { useState } from "react";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import Voice, {
	SpeechResultsEvent,
} from "@react-native-voice/voice";

import { ButtonWithIcon, Text } from "../../shared/ui";
import InfoIcon from "../../shared/assets/icons/InfoIcon.svg";
import MicrophoneIcon from "../../shared/assets/icons/microphoneIcon.svg";
import { Spacer } from "../../shared/config";

export const Header: React.FC = () => {
	const textValue = React.useRef("");
	const [isListening, setIsListening] = useState(false);
	const { t } = useTranslation();

	const splitLastWords = (sentence: string, lastWordsCount: number) =>
		sentence.split(" ").splice(-lastWordsCount).join().toLocaleLowerCase();

	const stopSpeech = async () => {
		return await Voice.destroy(), setIsListening(false);
	};

	const callAction = async (value: string[]) => {
		const text = value[0];

		if (text !== textValue.current) {
			textValue.current = text;
			const lastWord = splitLastWords(text, 1);

			console.log("lastworkd", lastWord);
			switch (lastWord) {
			case "note":
				console.log("Yeah");
			default:
				break;
			}
			stopSpeech();
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

	const handlePressShowInfo = () => {

	};

	return (
		<Container>
			<Text size={40}>
				{t("general.title")}
			</Text>
			<Row>
				<ButtonWrapper>
					<ButtonWithIcon onPress={toggleListening}>
						<MicrophoneIcon />
					</ButtonWithIcon>
				</ButtonWrapper>
				<ButtonWithIcon onPress={handlePressShowInfo}>
					<InfoIcon />
				</ButtonWithIcon>
			</Row>

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
