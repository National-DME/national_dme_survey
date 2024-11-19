import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../styles/theme';
import { Button } from 'react-native-paper';

/**
 *
 * @returns Where the survey questions are housed
 */
export default function SurveyScreen() {
    const globalStyles = useGlobalStyles();
    const router = useRouter();

	return (
        <>
            <StatusBar style='dark' backgroundColor={theme.secondary} />
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>Survey</Text>
                <View style={globalStyles.line} />
                <Text style={globalStyles.subtitle}>
                    Where the survey questions are housed
                </Text>
                <Button 
                    mode='contained'
                    onPress={() => router.back()} 
                    style={globalStyles.buttonSecondary}
                    labelStyle={globalStyles.buttonLabel}   
                >
                    Back
                </Button>
            </View>
        </>
	);
}
