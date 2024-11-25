import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../styles/theme';
import Question, { QuestionInterface } from '../../components/Question';
import { ScrollView } from 'react-native-gesture-handler';
import { useSurvey } from '../../context/SurveyContext';

/**
 *
 * @returns Where the survey questions are housed
 */
export default function SurveyScreen() {
	const globalStyles = useGlobalStyles();
	const router = useRouter();
	const { survey } = useSurvey();

	return (
		<>
			{/* 
                Updating status bar color to convey to user that survey has started and to provide contrast
            */}
			<StatusBar style='light' backgroundColor={theme.accent.gradient1} />
			<View style={globalStyles.container}>
				<ScrollView contentContainerStyle={globalStyles.questionContainer}>
					{survey.map((question: QuestionInterface, index) => (
						<Question key={index} question={question} index={index} />
					))}
				</ScrollView>
			</View>
		</>
	);
}
