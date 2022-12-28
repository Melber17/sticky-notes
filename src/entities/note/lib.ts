import { MIN_TABLE_WIDTH, Spacer } from "../../shared/config";
import { CARD_WIDTH } from "./config";

export const calcCardWidth = (width: number) => {
	const widthWithoutMargins = width - Spacer.MEDIUM * 2 - Spacer.SMALL;

	if (width < MIN_TABLE_WIDTH) {
		return widthWithoutMargins / 2;
	}

	return CARD_WIDTH;
};
