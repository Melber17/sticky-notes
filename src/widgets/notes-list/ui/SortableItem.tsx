import React, { ReactNode, RefObject, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useAnimatedReaction,
	withSpring,
	scrollTo,
	withTiming,
	useSharedValue,
	runOnJS,
} from "react-native-reanimated";
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { clamp } from "react-native-redash";

import { animationConfig, CARD_HEIGHT, getOrder, getPosition } from "../config";
import { calcCardWidth, INoteResponse } from "../../../entities/note";
import { calcNumberColumns } from "../lib";

interface ItemProps {
	children: ReactNode;
	notesData: Animated.SharedValue<INoteResponse[]>;
	id: number;
	note: INoteResponse;
	editing: boolean;
	onDragEnd: (diffs: INoteResponse[]) => void;
	scrollView: RefObject<Animated.ScrollView>;
	scrollY: Animated.SharedValue<number>;
}

export const SortableItem = ({
	children,
	notesData,
	id,
	note,
	onDragEnd,
	scrollView,
	scrollY,
	editing,
}: ItemProps) => {
	const inset = useSafeAreaInsets();
	const { width, height } = useWindowDimensions();
	const currentCardWidth = useMemo(() => calcCardWidth(width), [width]);

	const currentNumberColumns = useMemo(
		() => calcNumberColumns(width, inset.left, inset.right),
		[width, inset]
	);
	const containerHeight = useMemo(
		() => height - inset.top - inset.bottom,
		[height, inset]
	);
	const contentHeight =
		(notesData.value.length / currentNumberColumns) * currentCardWidth;
	const isGestureActive = useSharedValue(false);

	const position = getPosition(
		notesData.value.find((item) => item.id === id)!.position!,
		currentCardWidth,
		CARD_HEIGHT,
		currentNumberColumns
	);

	const translateX = useSharedValue(position.x ?? 0);
	const translateY = useSharedValue(position.y ?? 0);

	useAnimatedReaction(
		() => notesData.value.find((item) => item.id === note.id)!.position,
		(newOrder) => {
			if (!isGestureActive.value) {
				const pos = getPosition(
					newOrder,
					currentCardWidth,
					CARD_HEIGHT,
					currentNumberColumns
				);

				translateX.value = withTiming(pos.x, animationConfig);
				translateY.value = withTiming(pos.y, animationConfig);
			}
		}
	);

	const onGestureEvent = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		{ x: number; y: number }
	>({
		onStart: (_, ctx) => {
			// dont allow drag start if we're done editing
			if (editing) {
				ctx.x = translateX.value;
				ctx.y = translateY.value;
				isGestureActive.value = true;
			}
		},
		onActive: ({ translationX, translationY }, ctx) => {
			// dont allow drag if we're done editing
			if (editing) {
				translateX.value = ctx.x + translationX;
				translateY.value = clamp(ctx.y + translationY, 0, contentHeight);
				// 1. We calculate where the tile should be
				const newOrder = getOrder(
					translateX.value,
					translateY.value,
					notesData.value.length - 1,
					currentNumberColumns,
					currentCardWidth
				);

				// 2. We swap the positions
				const oldOlder = notesData.value.find(
					(item) => item.id === id
				)!.position;

				if (newOrder !== oldOlder) {
					const idToSwap = notesData.value.find(
						(item) => item.position === newOrder
					)?.id;

					if (idToSwap) {
						const currentPositions = JSON.parse(
							JSON.stringify(notesData.value)
						) as INoteResponse[];
						const newPositions = currentPositions.map((item) => {
							const currentNote = item;

							if (item.id === id) {
								currentNote.position = newOrder;

								return currentNote;
							}

							if (item.id === idToSwap) {
								currentNote.position = oldOlder;

								return currentNote;
							}

							return item;
						});

						notesData.value = newPositions;
					}
				}

				// 3. Scroll up and down if necessary
				const lowerBound = scrollY.value;
				const upperBound = lowerBound + containerHeight - CARD_HEIGHT;
				const maxScroll = contentHeight - containerHeight;
				const leftToScrollDown = maxScroll - scrollY.value;

				if (translateY.value < lowerBound) {
					const diff = Math.min(lowerBound - translateY.value, lowerBound);

					scrollY.value -= diff;
					scrollTo(scrollView, 0, scrollY.value, false);
					ctx.y -= diff;
					translateY.value = ctx.y + translationY;
				}
				if (translateY.value > upperBound) {
					const diff = Math.min(
						translateY.value - upperBound,
						leftToScrollDown
					);

					scrollY.value += diff;
					scrollTo(scrollView, 0, scrollY.value, false);
					ctx.y += diff;
					translateY.value = ctx.y + translationY;
				}
			}
		},
		onEnd: () => {
			const newPosition = getPosition(
				notesData.value.find((item) => item.id === id)!.position!,
				currentCardWidth,
				CARD_HEIGHT,
				currentNumberColumns
			);

			translateX.value = withTiming(newPosition.x, animationConfig, () => {
				isGestureActive.value = false;
				runOnJS(onDragEnd)(notesData.value);
			});
			translateY.value = withTiming(newPosition.y, animationConfig);
		},
	});
	const style = useAnimatedStyle(() => {
		const zIndex = isGestureActive.value ? 100 : 0;
		const scale = withSpring(isGestureActive.value ? 1.05 : 1);

		return {
			position: "absolute",
			top: 0,
			left: 0,
			width: currentCardWidth,
			height: CARD_HEIGHT,
			zIndex,
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
				{ scale },
			],
		};
	});

	return (
		<Animated.View style={style}>
			<PanGestureHandler enabled={editing} onGestureEvent={onGestureEvent}>
				<Animated.View style={StyleSheet.absoluteFill}>
					{children}
				</Animated.View>
			</PanGestureHandler>
		</Animated.View>
	);
};
