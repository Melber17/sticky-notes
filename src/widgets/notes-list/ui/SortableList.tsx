import React, { ReactElement, useMemo } from "react";
import Animated, {
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SortableItem } from "./SortableItem";
import { CARD_HEIGHT, Positions } from "../config";
import { Header } from "../../Header";
import { calcCardWidth, INoteResponse, NoteCart } from "../../../entities/note";
import { Spacer } from "../../../shared/config";
import { calcNumberColumns } from "../lib";

interface ListProps {
	editing: boolean;
	data: INoteResponse[];
	onDragEnd: (diff: Positions) => void;
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
	const positions = useSharedValue<Positions>(
		Object.assign({}, ...data.map((child, index) => ({ [child.id]: index })))
	);
	const onScroll = useAnimatedScrollHandler({
		onScroll: ({ contentOffset: { y } }) => {
			console.log("Scroll");
			scrollY.value = y;
		},
	});

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
							positions={positions}
							id={item.id}
							editing={editing}
							onDragEnd={onDragEnd}
							scrollView={scrollView}
							scrollY={scrollY}
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
