import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../styles/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/generic/Button';

/**
 * 
 * @returns Representative screen; this is the first screen rendered
 * 
 * This is the screen used by the representative to input their data first and to initialize the survey
 */
export default function RepresentativeScreen() {
	const globalStyles = useGlobalStyles();
    const router = useRouter();

    const handleStartSurvey = () => {
        router.push('/survey');
    }

	return (
        <>
            <StatusBar style='light' backgroundColor={theme.secondary} />
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.title}>Representative screen</Text>
                <View style={globalStyles.line} />
                <Text style={globalStyles.subtitle}>
                    This screen is used by the representative to input their data first and to initialize the survey
                </Text>
                <Button 
                    title='Start Survey'
                    onPress={handleStartSurvey}
                    buttonStyle={[globalStyles.button, globalStyles.buttonSecondary]}
                />
            </SafeAreaView>
        </>
	);
}
