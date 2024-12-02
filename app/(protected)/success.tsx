import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
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

    const [name, setName] = useState<string>('');

    useEffect(() => {
        const foundName = answers.find(
            (answer) => answer && answer.question.key === 'NAME'
        );
        setName(', ' + foundName?.answer?.toString() || '');

        // Clear context data so that if the representative uses the same application session to conduct another survey, the data is not mixed
        clearContextData();
    }, []);

    const handleNavigateHome = () => {
        // Navigate
        router.replace('/(home)');
    }

	return (
		<View style={globalStyles.successContainer}>
            <StatusBar style='light' backgroundColor={theme.constant.success} />
			<Text style={globalStyles.title}>Survey submitted successfully!</Text>
            <Text style={globalStyles.subtitle}>Thank you{name}!</Text>
            <Button
                title='Home'
                onPress={handleNavigateHome}
                buttonStyle={globalStyles.buttonAccent}
            />
		</View>
	);
}
