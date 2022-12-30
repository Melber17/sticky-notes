import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import React, { useMemo, useRef } from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

import { INoteResponse } from "../../entities/note";
import { Text, WithBottomSheet } from "../../shared/ui";
import
{ BLACK_COLOR, DARK_PURPLE_COLOR, FontStyles, LIGHT_GRAY_COLOR, RED_COLOR, Spacer }
	from "../../shared/config";
import ClockIcon from "../../shared/assets/icons/clockIcon.svg";
import TrashIcon from "../../shared/assets/icons/trashIcon.svg";

interface INoteOptionsProps {
  onClose: () => void;
	note: INoteResponse;
}

export const NoteOptions: React.FC<INoteOptionsProps> = ({ onClose }) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["25%"], []);

	return (
		<WithBottomSheet
			bottomSheetRef={bottomSheetRef}
			index={0}
			handleCloseSheet={onClose}
			snapPoints={snapPoints}>
			<Container>
				<OptionContainer style={styles.button}>
					<ClockIcon />
					<ReminderTitle
						fontStyle={FontStyles.BOLD}
					>
						Set Reminder
					</ReminderTitle>
				</OptionContainer>
				<OptionContainer style={styles.button}>
					<TrashIcon />
					<TrashTitle
						fontStyle={FontStyles.BOLD}

					>
						Delete Note
					</TrashTitle>
				</OptionContainer>
			</Container>
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
		shadowOpacity: 0.20,
		shadowRadius: 1.41,

		elevation: 2,
	},
});

const Container = styled.View`
	margin: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
`;

const OptionContainer = styled.View`
	width: 100%;
	height: 56px;
	background: ${LIGHT_GRAY_COLOR};
	flex-direction: row;
	border-radius: ${Spacer.SMALL}px;
	margin-bottom: ${Spacer.MEDIUM}px;
	padding: ${Spacer.MEDIUM}px ${Spacer.SMALL}px;
`;

const ReminderTitle = styled(Text)`
	color: ${DARK_PURPLE_COLOR};
	margin-left: 12px;
`;

const TrashTitle = styled(Text)`
	color: ${RED_COLOR};
	margin-left: 12px;

`;
