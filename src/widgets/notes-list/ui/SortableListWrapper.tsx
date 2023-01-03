import React, { useEffect, useMemo, useState } from "react";
import Animated, {
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CARD_HEIGHT } from "../config";
import { INoteResponse } from "../../../entities/note";
import { Spacer } from "../../../shared/config";
import { calcNumberColumns } from "../lib";
import SortableList from "./SortableList";

interface ListProps {
	editing: boolean;
	data: INoteResponse[];
	onDragEnd: (diff: INoteResponse[]) => void;
	headerComponent: JSX.Element;
}

export const SortableListWrapper = ({
	data,
	editing,
	headerComponent,
	onDragEnd,
}: ListProps) => {
	const scrollY = useSharedValue(0);
	const [isChangedData, setIsChangedData] = useState(false);
	const { width } = useWindowDimensions();

	const inset = useSafeAreaInsets();
	const currentNumberColumns = useMemo(
		() => calcNumberColumns(width, inset.left, inset.right),
		[width, inset]
	);
	const scrollView = useAnimatedRef<Animated.ScrollView>();
	const notesDataShared = useSharedValue<INoteResponse[]>(JSON.parse(JSON.stringify(data)));
	const onScroll = useAnimatedScrollHandler({
		onScroll: ({ contentOffset: { y } }) => {
			scrollY.value = y;
		},
	});

	useEffect(() => {
		notesDataShared.value = JSON.parse(JSON.stringify(data));
		setIsChangedData((prevValue) => !prevValue);
	}, [data]);

	return (
		<Container
			onScroll={onScroll}
			ref={scrollView}
			showsVerticalScrollIndicator={false}
			bounces={false}
			scrollEventThrottle={16}
		>
			{headerComponent}
			<SortableList
				notesData={notesDataShared}
				data={data}
				editing={editing}
				onDragEnd={onDragEnd}
				isChangedData={isChangedData}
			/>
			<Block dataLength={Math.round(data.length / currentNumberColumns)} />
		</Container>
	);
};

const Container = styled(Animated.ScrollView)`
	flex: 1;
	padding: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
`;

const Block = styled.View<{ dataLength: number }>`
	z-index: -1;
	height: ${({ dataLength }) => dataLength * (CARD_HEIGHT + Spacer.MEDIUM)}px;
`;
