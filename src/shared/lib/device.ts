import { NativeModules, Platform } from "react-native";

export enum PlatformType {
	ANDROID = "android",
	IOS = "ios",
}

export const getDeviceLanguage =
	Platform.OS === PlatformType.IOS
		? NativeModules.SettingsManager.settings.AppleLocale ||
		NativeModules.SettingsManager.settings.AppleLanguages[0]
		: NativeModules.I18nManager.localeIdentifier;
