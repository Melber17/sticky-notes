import React, { useMemo } from "react";
import { FlatList, ListRenderItemInfo, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { calcCardWidth, INote, NoteCart } from "../../../entities/note";
import { Spacer } from "../../../shared/config";
import { calcNumberColumns } from "../lib";
import { EmptyListData } from "./EmptyListData";

interface INotesListProps {
  data: Nullable<INote[]>;
	headerComponent: JSX.Element;
}

export const NotesList: React.FC<INotesListProps> = (props) => {
	const { data, headerComponent } = props;
	const { width } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const currentNumberColumns = useMemo(
		() => calcNumberColumns(width, insets.left, insets.right), [width, insets]
	);
	const cartWidth = useMemo(() => calcCardWidth(width), [width]);

	if (!data) {
		return <EmptyListData />;
	}

	const renderItem = ({ item }: ListRenderItemInfo<INote>) => {

		return (
			<NoteCart width={cartWidth} {...item} />
		);
	};

	const keyExtractor = (_: INote, index: number) => index.toString();

	return (
		<Container>
			<FlatList
				data={data}
				renderItem={renderItem}
				showsVerticalScrollIndicator={ false }
				numColumns={currentNumberColumns}
				key={`${width}-${currentNumberColumns}`}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				ListHeaderComponent={headerComponent}
				ListHeaderComponentStyle={{ marginBottom: Spacer.LARGE }}
				keyExtractor={keyExtractor}
			/>
		</Container>
	);
};

const Container = styled.View`
	flex: 1;
`;
