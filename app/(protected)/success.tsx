import { View, Text, Image } from 'react-native';
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

    const images = [
        require('../../assets/helipad.png'),
        require('../../assets/hospital.png'),
        require('../../assets/icu.png'),
        require('../../assets/office.png'),
        require('../../assets/exam.png'),
        require('../../assets/check.png')
    ];

    useEffect(() => {
        const foundName = answers.find(
            (answer) => answer && answer.question.key === 'NAME'
        );
        setName(foundName ? ', ' + foundName?.answer?.toString() : '');

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
			<Text style={globalStyles.successTitleContent}>Survey submitted successfully!</Text>
            <Text style={globalStyles.successSubtitleContent}>Thank you{name}!</Text>
            <Image
                source={images[Math.floor(Math.random() * 6)]}
                style={globalStyles.image}
            />
            <Text style={globalStyles.successSubtitleContent}>
                Please return device to the account representative
            </Text>
            <Button
                title='Home'
                onPress={handleNavigateHome}
                buttonStyle={globalStyles.buttonSuccess}
            />
		</View>
	);
}
