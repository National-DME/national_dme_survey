import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../styles/theme';
import { Button } from 'react-native-paper';
import Question, { QuestionInterface } from '../components/Question';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

/**
 *
 * @returns Where the survey questions are housed
 */
export default function SurveyScreen() {
    const globalStyles = useGlobalStyles();
    const router = useRouter();

    const mockSurvey: QuestionInterface[] = [
        {
            text: 'How would you rate the timeliness of our deliveries?',
            type: 'rating',
            index: 1,
        },
        {
            text: 'What challenges do you face when receiving medical supplies?',
            type: 'text',
            index: 2,
        },
        {
            text: 'How often are orders accurately fulfilled?',
            type: 'multiple choice',
            index: 3,
        },
        {
            text: 'Rate the professionalism of our delivery staff.',
            type: 'rating',
            index: 4,
        },
        {
            text: 'What additional products or services would you like us to offer?',
            type: 'text',
            index: 5,
        },
        {
            text: 'How easy is it to communicate with our support team?',
            type: 'rating',
            index: 6,
        },
        {
            text: 'Which area of our service needs the most improvement?',
            type: 'text',
            index: 7,
        },
        {
            text: 'How likely are you to recommend our services to other hospitals?',
            type: 'rating',
            index: 8,
        },
        {
            text: 'What delivery frequency best suits your hospital’s needs?',
            type: 'multiple choice',
            index: 9,
        },
        {
            text: 'Rate the quality of the packaging for our medical supplies.',
            type: 'rating',
            index: 10,
        },
        {
            text: 'Have you experienced any delays in receiving critical supplies?',
            type: 'multiple choice',
            index: 11,
        },
        {
            text: 'What do you think about our online ordering system?',
            type: 'text',
            index: 12,
        },
        {
            text: 'How would you describe your overall satisfaction with our service?',
            type: 'rating',
            index: 13,
        },
        {
            text: 'How often do you need to contact us for order-related issues?',
            type: 'multiple choice',
            index: 14,
        },
        {
            text: 'What suggestions do you have for enhancing our services?',
            type: 'text',
            index: 15,
        },
    ];


	return (
        <>
            {/* 
                Updating status bar color to convey to user that survey has started and to provide contrast
            */}
            <StatusBar style='dark' backgroundColor={theme.secondary} />
            <View style={globalStyles.container}>
                <ScrollView contentContainerStyle={globalStyles.questionContainer}>
                    {mockSurvey.map((question: QuestionInterface, index) => (
                        <Question key={index} text={question.text} type={question.type} index={index + 1} />
                    ))}
                </ScrollView>
            </View>
        </>
	);
}
