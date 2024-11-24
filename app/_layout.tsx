import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { theme } from "../styles/theme";
import * as SystemUI from 'expo-system-ui';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SurveyContextProvider } from "../context/SurveyContext";
import { AuthProvider } from "../context/AuthContext";

/**
 * 
 * @returns The root layout of the application
 */

// TODO refactor this logic to hold RootStack component so that I can access the authentication context in the same logic that it is wrapping

// Prevents the splash screen from hiding until the application assets are loaded
SplashScreen.preventAutoHideAsync();

const Root = () => {
    // Load fonts using expo-font package
    const [fontsLoaded] = useFonts({
        'Nunito': require('../assets/fonts/Nunito-Regular.ttf')
    });

    // TODO useEffect here that logs in or out based on auth context

    // State to track whether the application is ready for user interaction
    const [appReady, setAppReady] = useState(false);

    // Runs every time fontsLoaded is updated (when a font is loaded)
    useEffect(() => {
        if (fontsLoaded) {
            // Hide splash screen when fonts are loaded
            SplashScreen.hideAsync().then(() => setAppReady(true));
        }
    }, [fontsLoaded]);

    useEffect(() => {
        // Set the system UI to be the same as the background
        // Prevents white flashes during system ui animations
        // like opening/closing system keyboard
        SystemUI.setBackgroundColorAsync(theme.background);
    }, [theme]);

    // Prevent rendering until splash screen is hidden
    if (!appReady) {
        return null;
    }

    return (
        <AuthProvider>
            <SurveyContextProvider>
                <GestureHandlerRootView style={{
                    flex: 1, backgroundColor: theme.background
                }}>
                    <Slot />
                </GestureHandlerRootView>
            </SurveyContextProvider>
        </AuthProvider>
    ); 
}

export default Root;