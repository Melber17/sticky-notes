import React, { useEffect, useMemo } from "react";
import Animated, {
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SortableItem } from "./SortableItem";
import { CARD_HEIGHT } from "../config";
import { Header } from "../../Header";
import { calcCardWidth, INoteResponse, NoteCart } from "../../../entities/note";
import { Spacer } from "../../../shared/config";
import { calcNumberColumns } from "../lib";

interface ListProps {
	editing: boolean;
	data: INoteResponse[];
	onDragEnd: (diff: INoteResponse[]) => void;
}

export const SortableList = ({ data, editing, onDragEnd }: ListProps) => {
	const scrollY = useSharedValue(0);
	const { width } = useWindowDimensions();

	const cartWidth = useMemo(() => calcCardWidth(width), [width]);
	const inset = useSafeAreaInsets();
	const currentNumberColumns = useMemo(
		() => calcNumberColumns(width, inset.left, inset.right),
		[width, inset]
	);
	const scrollView = useAnimatedRef<Animated.ScrollView>();
	const currentData = data;
	const notesDataShared = useSharedValue<INoteResponse[]>(
		JSON.parse(JSON.stringify(currentData))
	);
	const onScroll = useAnimatedScrollHandler({
		onScroll: ({ contentOffset: { y } }) => {
			scrollY.value = y;
		},
	});

	useEffect(() => {
		notesDataShared.value = JSON.parse(JSON.stringify(data));
	}, [data]);

	return (
		<Container
			onScroll={onScroll}
			ref={scrollView}
			showsVerticalScrollIndicator={false}
			bounces={false}
			scrollEventThrottle={16}
		>
			<Header />
			<ListWrapper>
				{data.map((item, index) => {
					return (
						<SortableItem
							key={item.id}
							notesData={notesDataShared}
							id={item.id}
							editing={editing}
							onDragEnd={onDragEnd}
							scrollView={scrollView}
							scrollY={scrollY}
							note={item}
						>
							<NoteCart width={cartWidth} {...item} key={index} />
						</SortableItem>
					);
				})}
			</ListWrapper>
			<Block dataLength={data.length / currentNumberColumns} />
		</Container>
	);
};

const Container = styled(Animated.ScrollView)`
	flex: 1;
	padding: ${Spacer.SMALL}px ${Spacer.MEDIUM}px 0;
`;

const ListWrapper = styled.View`
	margin-top: ${Spacer.MEDIUM}px;
`;

const Block = styled.View<{ dataLength: number }>`
	z-index: -1;
	height: ${({ dataLength }) => dataLength * CARD_HEIGHT * 1.5}px;
`;
