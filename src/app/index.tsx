import React, { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableFreeze, enableScreens } from "react-native-screens";

import { Routing } from "../screens";
import { PlatformType } from "../shared/lib/device";
import { WithNavigation, WithTheme } from "./providers";
import { WithRedux } from "./providers/with-redux";

enableFreeze(true);

export const App: React.FC = () => {
	useEffect(() => {
		if (Platform.OS === PlatformType.IOS) {
			enableScreens(false);
		}
	}, []);

	return (
		<GestureHandlerRootView style={styles.container}>
			<WithNavigation>
				<WithTheme>
					<WithRedux>
						<Routing />
					</WithRedux>
				</WithTheme>
			</WithNavigation>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
