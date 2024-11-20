import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../styles/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * 
 * @returns Representative screen; this is the first screen rendered
 * 
 * This is the screen used by the representative to input their data first and to initialize the survey
 */
export default function RepresentativeScreen() {
	const globalStyles = useGlobalStyles();
    const router = useRouter();

	return (
        <>
            <StatusBar style='light' backgroundColor={theme.primary} />
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.title}>Representative screen</Text>
                <View style={globalStyles.line} />
                <Text style={globalStyles.subtitle}>
                    This screen is used by the representative to input their data first and to initialize the survey
                </Text>
                <Button 
                    mode='contained'
                    onPress={() => router.push('/survey')}
                    style={globalStyles.buttonPrimary}
                    labelStyle={globalStyles.buttonLabel}
                >
                    Start Survey
                </Button>
            </SafeAreaView>
        </>
	);
}
