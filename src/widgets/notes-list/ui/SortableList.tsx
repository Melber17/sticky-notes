import React, { useMemo } from "react";
import Animated, {
	useAnimatedRef,
	useSharedValue,
} from "react-native-reanimated";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";

import { SortableItem } from "./SortableItem";
import { CARD_HEIGHT } from "../config";
import { calcCardWidth, INoteResponse, NoteCart } from "../../../entities/note";
import { Spacer } from "../../../shared/config";
import { calcNumberColumns } from "../lib";

interface ListProps {
	isChangedData: boolean;
	notesData: Animated.SharedValue<INoteResponse[]>;
	onDragEnd: (diff: INoteResponse[]) => void;
	editing: boolean;
	data: INoteResponse[];
}

const SortableList = ({
	onDragEnd,
	notesData,
	data,
	editing,
}: ListProps) => {
	const scrollY = useSharedValue(0);
	const { width } = useWindowDimensions();

	const cartWidth = useMemo(() => calcCardWidth(width), [width]);

	const scrollView = useAnimatedRef<Animated.ScrollView>();

	return (
		<ListWrapper>
			{data.map((item, index) => {
				return (
					<SortableItem
						key={item.id}
						data={data}
						notesData={notesData}
						id={item.id}
						editing={editing}
						onDragEnd={onDragEnd}
						scrollView={scrollView}
						scrollY={scrollY}
						note={item}
					>
						<NoteCart
							width={cartWidth}
							{...item}
							key={index}
						/>
					</SortableItem>
				);
			})}
		</ListWrapper>
	);
};

export default React.memo(SortableList, (prevProps, nextProps) => {
	if (prevProps.isChangedData !== nextProps.isChangedData) {
		return false;
	} else {
		return true;
	}
});

const Container = styled(Animated.ScrollView)`
	flex: 1;
	padding: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
`;

const ListWrapper = styled.View`
	margin-top: ${Spacer.MEDIUM}px;
`;
