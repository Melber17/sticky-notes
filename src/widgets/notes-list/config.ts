import { Easing } from "react-native-reanimated";

import { Spacer } from "../../shared/config";

export const MARGIN = Spacer.SMALL;
export const CARD_HEIGHT = 120;

export const animationConfig = {
	easing: Easing.inOut(Easing.ease),
	duration: 350,
};

export const getPosition = (
	position: number,
	cardWidth: number,
	cardHeight: number,
	numberColumns: number
) => {
	"worklet";

	return {
		x:
			position % numberColumns === 0
				? 0
				: (cardWidth + Spacer.SMALL) * (position % numberColumns),
		y: Math.floor(position / numberColumns) * (cardHeight + Spacer.MEDIUM),
	};
};

export const getOrder = (
	tx: number,
	ty: number,
	max: number,
	numberColumns: number,
	cardWidth: number
) => {
	"worklet";

	const x = Math.round(tx / cardWidth) * cardWidth;
	const y = Math.round(ty / CARD_HEIGHT) * CARD_HEIGHT;
	const row = Math.max(y, 0) / CARD_HEIGHT;
	const col = Math.max(x, 0) / cardWidth;

	return Math.min(row * numberColumns + col, max);
};
