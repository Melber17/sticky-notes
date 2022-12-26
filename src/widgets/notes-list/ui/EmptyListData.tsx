import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import NotesVector from "../../../shared/assets/icons/NotesVector.svg";
import { Spacer } from "../../../shared/config";
import { Text } from "../../../shared/ui";

export const EmptyListData: React.FC = () => {
	const { t } = useTranslation();

	return (
		<Container>
			<NotesVector />
			<Title>
				{t("general.emptyTitle")}
			</Title>
		</Container>
	);
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Text)`
  margin-top: ${Spacer.SMALL}px;
  font-size: 20px;
`;
