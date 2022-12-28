import { Dimensions } from "react-native";
import { Easing } from "react-native-reanimated";

import { Spacer } from "../../shared/config";

export interface Positions {
	[id: string]: number;
}

const { width } = Dimensions.get("window");

export const MARGIN = Spacer.SMALL;
export const SIZE = width / 2 - MARGIN;
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
	numberColumns: number
) => {
	"worklet";

	const x = Math.round(tx / SIZE) * SIZE;
	const y = Math.round(ty / SIZE) * SIZE;
	const row = Math.max(y, 0) / SIZE;
	const col = Math.max(x, 0) / SIZE;

	return Math.min(row * numberColumns + col, max);
};
