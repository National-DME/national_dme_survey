import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../styles/theme';
import { useSurvey } from '../../context/SurveyContext';
import { useRouter } from 'expo-router';
import Button from '../../components/generic/Button';

export default function success() {
    const globalStyles = useGlobalStyles();
    const { clearContextData, answers } = useSurvey();
    const router = useRouter();

    const handleNavigateHome = () => {
        // Clear context
        clearContextData();
        // Navigate
        router.replace('/(home)');
    }

	return (
		<View style={globalStyles.successContainer}>
            <StatusBar style='light' backgroundColor={theme.constant.success} />
			<Text style={globalStyles.title}>Survey submitted successfully!</Text>
            <Text style={globalStyles.subtitle}>Thank you, {answers.find((answer) => answer.question.key === 'NAME')?.answer}!</Text>
            <Button
                title='Home'
                onPress={handleNavigateHome}
                buttonStyle={globalStyles.buttonAccent}
            />
		</View>
	);
}
