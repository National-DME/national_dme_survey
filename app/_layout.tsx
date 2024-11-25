import { useFonts } from "expo-font";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
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

	// State to track whether the application is ready for user interaction
	const [appReady, setAppReady] = useState(false);

	// Load fonts using expo-font package
	const [fontsLoaded] = useFonts({
		Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
	});

    /**
     * This useEffect controls the application initial screen
     * 
     * Redirects to the login screen or representative (home) screen based on whether the auth context determines the user to be logged in or not
     */
	useEffect(() => {
		(async () => {
			if (!fontsLoaded || authState?.authenticated === null) {
				return; // Don't proceed until fonts are loaded and auth state is determined
			}

			if (!appReady) {
				console.log('Hiding splash screen...');
				await SplashScreen.hideAsync();
				setAppReady(true);
			}

			if (authState.authenticated === false) {
				console.log('Redirecting to login...');
				router.replace('/');
			} else if (authState.authenticated === true) {
				console.log('Redirecting to protected section...');
				router.replace('/(protected)/representative');
			}
		})();
	}, [fontsLoaded, authState, appReady]);


	useEffect(() => {
		/**
         * Set the system UI to be the same as the background
		 * Prevents white flashes during system ui animations like opening/closing system keyboard
         */
		SystemUI.setBackgroundColorAsync(theme.background);
	}, [theme]);

    /**
     * This useEffect uses segments from expo router to remove the user from the protected segments of the application if the users authenticated status is not true
     * 
     * This runs every time the user navigates between screens
     */
    useEffect(() => {   
        if (!authState) return;

        if (segments[0] === '(protected)' && !authState.authenticated) {
            router.replace('/');
        }
    }, [authState, segments]);

	// Prevent rendering until splash screen is hidden
	if (!appReady) {
		return null;
	}

	return (
		<GestureHandlerRootView
			style={{
				flex: 1,
				backgroundColor: theme.background,
			}}>
			<Slot />
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