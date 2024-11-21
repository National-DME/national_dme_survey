import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../styles/theme';
import Question, { QuestionInterface } from '../components/Question';
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
			text: 'How would you rate the overall timeliness of our deliveries?',
			type: 'rating',
		},
		{
			text: 'What challenges do you encounter when managing delivery schedules?',
			type: 'text',
		},
		{
			text: 'Which delivery frequencies work best for your hospital?',
			type: 'radio list',
			answers: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'],
		},
		{
			text: 'Rate the reliability of our delivery tracking system.',
			type: 'rating',
		},
		{
			text: 'What improvements would you like to see in our product selection?',
			type: 'text',
		},
		{
			text: 'How responsive is our customer support team to your inquiries?',
			type: 'rating',
		},
		{
			text: 'What areas of our service do you feel require immediate improvement?',
			type: 'text',
		},
		{
			text: 'How likely are you to recommend our logistics services to other facilities?',
			type: 'rating',
		},
		{
			text: 'Which aspects of our service are most valuable to your hospital? (Select all that apply)',
			type: 'check list',
			answers: [
				'Delivery Speed',
				'Customer Support',
				'Product Availability',
				'Pricing',
			],
		},
		{
			text: 'Rate the quality and durability of our medical supply packaging.',
			type: 'rating',
		},
		{
			text: 'Have you encountered any issues with delayed critical supply deliveries?',
			type: 'radio list',
			answers: ['Yes', 'No'],
		},
		{
			text: 'What are your thoughts on our digital inventory management system?',
			type: 'text',
		},
		{
			text: 'How would you describe your overall satisfaction with our logistics services?',
			type: 'rating',
		},
		{
			text: 'How often do you contact us to resolve issues with orders or deliveries?',
			type: 'radio list',
			answers: ['Never', 'Occasionally', 'Frequently', 'Always'],
		},
		{
			text: 'What specific steps could we take to enhance your experience?',
			type: 'text',
		},
		{
			text: 'Which of the following services would you like us to prioritize? (Select all that apply)',
			type: 'check list',
			answers: [
				'Faster Delivery',
				'More Product Options',
				'Better Customer Support',
				'Advanced Tracking Features',
			],
		},
	];


	return (
        <>
            {/* 
                Updating status bar color to convey to user that survey has started and to provide contrast
            */}
            <StatusBar style='light' backgroundColor={theme.accent.gradient1} />
            <View style={globalStyles.container}>
                <ScrollView contentContainerStyle={globalStyles.questionContainer}>
                    {mockSurvey.map((question: QuestionInterface, index) => (
                        <Question key={index} question={question} index={index} />
                    ))}
                </ScrollView>
            </View>
        </>
	);
}
