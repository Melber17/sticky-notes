import React, { useMemo } from "react";
import {
	FlatList,
	ListRenderItemInfo,
	useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { calcCardWidth, INoteResponse, NoteCart } from "../../../entities/note";
import { Spacer } from "../../../shared/config";
import { Header } from "../../Header";
import { calcNumberColumns } from "../lib";
import { EmptyListData } from "./EmptyListData";
import { SortableList } from "./SortableList";

interface INotesListProps {
	data: Nullable<INoteResponse[]>;
	headerComponent: JSX.Element;
}

export const NotesList: React.FC<INotesListProps> = (props) => {
	const { data, headerComponent } = props;
	const { width } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const currentNumberColumns = useMemo(
		() => calcNumberColumns(width, insets.left, insets.right),
		[width, insets]
	);
	const cartWidth = useMemo(() => calcCardWidth(width), [width]);

	if (!data) {
		return <EmptyListData />;
	}

	const renderItem = ({ item }: ListRenderItemInfo<INoteResponse>) => {
		return <NoteCart width={cartWidth} {...item} />;
	};

	const keyExtractor = (_: INoteResponse, index: number) => index.toString();

	return (
		<Container>
			<SortableList
				data={data}
				editing={true}
				onDragEnd={(positions) =>
					console.log(JSON.stringify(positions, null, 2))
				}
			/>

			{/* <FlatList
				data={data}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				numColumns={currentNumberColumns}
				key={`${width}-${currentNumberColumns}`}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				ListHeaderComponent={headerComponent}
				ListHeaderComponentStyle={{ marginBottom: Spacer.LARGE }}
				keyExtractor={keyExtractor}
			/> */}
		</Container>
	);
};

const Container = styled.View`
	flex: 1;
`;
