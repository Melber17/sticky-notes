import { CARD_WIDTH } from "../../entities/note";
import { MIN_TABLE_WIDTH, Spacer } from "../../shared/config";

export const calcNumberColumns = (width: number, insetLeft: number, insetRight: number) => {
	const widthWithoutMargins = width - Spacer.MEDIUM - Spacer.SMALL;

	if (width < MIN_TABLE_WIDTH) {
		return 2;
	}

	const numberColumnsWithoutMargins = Math.floor(widthWithoutMargins / CARD_WIDTH);

	const countMargins = numberColumnsWithoutMargins - 1;

	const resultWidth = width - Spacer.MEDIUM
											- Spacer.SMALL
											* countMargins - insetLeft - insetRight;

	return Math.floor(resultWidth / CARD_WIDTH);
};
