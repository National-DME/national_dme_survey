import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import * as SystemUI from 'expo-system-ui';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SurveyContextProvider } from "../context/SurveyContext";
import { AuthProvider, useAuth } from "../context/AuthContext";

/**
 * 
 * @returns The root layout of the application
 */

// Prevents the splash screen from hiding until the application assets are loaded
SplashScreen.preventAutoHideAsync();

const RootStack = () => {
	const { authState } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	// Load fonts using expo-font package
	const [fontsLoaded] = useFonts({
		Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
	});

	useEffect(() => {
		(async () => {
			await SplashScreen.preventAutoHideAsync();
			await SystemUI.setBackgroundColorAsync(theme.background.toString());
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (!fontsLoaded || authState.authenticated === null) {
				return;
			}
	
			if (authState.authenticated === true) {
				router.replace('/(protected)/success');
			} else {
				router.replace('/LoginScreen');
			}
		})();
	}, [authState, fontsLoaded]);

	useEffect(() => {
		(async () => {
			if (authState?.authenticated !== null && (segments[0] === '/' || segments[0] === '(protected)')) {
				await SplashScreen.hideAsync();
			}
		})();
	}, [authState, segments]);

	return (
		<GestureHandlerRootView
			style={{
				flex: 1,
				backgroundColor: theme.background,
			}}>
				{(fontsLoaded && authState.authenticated !== null) && (
					<Slot />
				)}
		</GestureHandlerRootView>
	);
}

const Root = () => {
    return (
        <AuthProvider>
            <SurveyContextProvider>
                <RootStack />
            </SurveyContextProvider>
        </AuthProvider>
    ); 
}

export default Root;