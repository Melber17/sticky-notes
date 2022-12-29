import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import React, { useMemo, useRef } from "react";
import styled from "styled-components/native";

import { Text, WithBottomSheet } from "../../shared/ui";

interface INoteOptionsProps {
  onClose: () => void;
}

export const NoteOptions: React.FC<INoteOptionsProps> = ({ onClose }) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["20%"], []);

	const handleCloseSheet = () => {
		bottomSheetRef.current?.forceClose();
	};

	return (
		<WithBottomSheet
			bottomSheetRef={bottomSheetRef}
			index={0}
			handleCloseSheet={onClose}
			snapPoints={snapPoints}>
			<Container>
				<Text>Hola</Text>
			</Container>
		</WithBottomSheet>
	);
};

const Container = styled.View`

`;
