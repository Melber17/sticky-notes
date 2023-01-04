import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import { Platform, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

import { deleteNote, editNote, INoteResponse } from "../../entities/note";
import { Text, WithBottomSheet } from "../../shared/ui";
import {
	BLACK_COLOR,
	DARK_PURPLE_COLOR,
	FontStyles,
	LIGHT_GRAY_COLOR,
	RED_COLOR,
	Spacer,
} from "../../shared/config";
import ClockIcon from "../../shared/assets/icons/clockIcon.svg";
import TrashIcon from "../../shared/assets/icons/trashIcon.svg";
import ArrowRightIcon from "../../shared/assets/icons/arrowRight.svg";
import {
	formatCreatedDate,
	PlatformType,
	useAppDispatch,
} from "../../shared/lib";

interface INoteOptionsProps {
	onClose: () => void;
	setNote: (note: INoteResponse) => void;
	note: INoteResponse;
}

export const NoteOptions: React.FC<INoteOptionsProps> = ({ onClose, setNote, note }) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const { t } = useTranslation();
	const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
	const [reminderDate, setReminderDate] = useState(
		note.reminder ? new Date(note.reminder) : null
	);
	const snapPoints = useMemo(() => ["25%"], []);
	const navigation = useNavigation();
	const dispatch = useAppDispatch();

	const handleDeleteNote = () => {
		dispatch(deleteNote(note));
		bottomSheetRef.current?.close();
		navigation.goBack();
	};

	const handleToggleDatePicker = () => {
		setIsOpenDatePicker((prevValue) => !prevValue);
	};

	const handleConfirmDatePicker = (date: Date) => {
		handleToggleDatePicker();
		setReminderDate(date);
		if (Platform.OS === PlatformType.IOS) {
			PushNotificationIOS.addNotificationRequest({
				id: `${Math.random() * 10000}`,
				title: note.title,
				subtitle: note.description,
				fireDate: date,
			});
		} else {
			PushNotification.localNotificationSchedule({
				title: note.title,
				channelId: "notes-channel",
				message: note.description,
				date: date,
			});
		}
		const resultNote = {
			...note,
			reminder: date.toString()
		};

		dispatch(
			editNote(resultNote)
		);
		setNote(resultNote);
	};

	const handleRenderDateValue = () => {
		if (reminderDate) {
			return <SubTitle>{formatCreatedDate(reminderDate)}</SubTitle>;
		}

		return <SubTitle>{t("note.emptyReminder")}</SubTitle>;
	};

	return (
		<WithBottomSheet
			bottomSheetRef={bottomSheetRef}
			index={0}
			handleCloseSheet={onClose}
			snapPoints={snapPoints}
		>
			<Container>
				<OptionContainer onPress={handleToggleDatePicker} style={styles.button}>
					<ClockIcon />
					<ReminderTitle
						numberOfLines={ 1 }
						fontStyle={FontStyles.BOLD}>
						{t("note.reminder")}
					</ReminderTitle>
					<Row>
						{handleRenderDateValue()}
						<ArrowRightIcon />
					</Row>
				</OptionContainer>
				<OptionContainer onPress={handleDeleteNote} style={styles.button}>
					<TrashIcon />
					<TrashTitle fontStyle={FontStyles.BOLD}>{t("note.delete")}</TrashTitle>
				</OptionContainer>
			</Container>
			<DatePicker
				modal
				open={isOpenDatePicker}
				date={reminderDate ?? new Date()}
				onConfirm={handleConfirmDatePicker}
				onCancel={handleToggleDatePicker}
			/>
		</WithBottomSheet>
	);
};

const styles = StyleSheet.create({
	button: {
		shadowColor: BLACK_COLOR,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
});

const Container = styled.View`
	margin: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
`;

const OptionContainer = styled.TouchableOpacity`
	width: 100%;
	height: 56px;
	background: ${LIGHT_GRAY_COLOR};
	flex-direction: row;
	align-items: center;
	border-radius: ${Spacer.SMALL}px;
	margin-bottom: ${Spacer.MEDIUM}px;
	padding: ${Spacer.MEDIUM}px ${Spacer.SMALL}px;
`;

const ReminderTitle = styled(Text)`
	max-width: 50%;
	color: ${DARK_PURPLE_COLOR};
	margin-left: 12px;
`;

const TrashTitle = styled(Text)`
	color: ${RED_COLOR};
	margin-left: 12px;
`;

const Row = styled.View`
	flex-direction: row;
	align-items: center;
	margin-left: auto;
`;

const SubTitle = styled(Text)`
	text-size: ${Spacer.MEDIUM - Spacer.EXTRA_SMALL}px;
	margin-right: ${Spacer.SMALL}px;
	color: ${DARK_PURPLE_COLOR};
`;
