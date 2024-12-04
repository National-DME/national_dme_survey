import { View, Text } from 'react-native';
import React, { useState } from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../styles/theme';
import Question, { QuestionInterface } from '../../components/Question';
import { ScrollView } from 'react-native-gesture-handler';
import { useSurvey } from '../../context/SurveyContext';
import Button from '../../components/generic/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorMessage from '../../components/error/ErrorMessage';

/**
 *
 * @returns Where the survey questions are housed
 */
export default function SurveyScreen() {
	const globalStyles = useGlobalStyles();
	const router = useRouter();
	const { survey, surveyFinished, handleUpload } = useSurvey();
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const handleSubmit = async () => {
		try {
			setLoading(true);
			console.log('Submitting...');
			await handleUpload();
			setLoading(false);
			router.replace('/success');
		} catch (error: any) {
			setErrorMessage('Unable to submit survey');
		}
	}

	return (
		<>
			{errorMessage ? (
				<ErrorMessage
				title={errorMessage}
				callback={handleSubmit}
				buttonTitle='Submit survey again'
				/>
			) : (
				<SafeAreaView style={globalStyles.container}>
					{/* 
						Updating status bar color to convey to user that survey has started and to provide contrast
						*/}
					<ScrollView
						contentContainerStyle={globalStyles.questionContainer}
						keyboardShouldPersistTaps='handled'>
						{survey.map((question: QuestionInterface, index) => (
							<Question key={index} question={question} index={index} />
						))}
						{surveyFinished && (
							<Button
							title={loading ? 'Submitting...' : 'Submit Survey'}
							onPress={handleSubmit}
							buttonStyle={
								loading
								? globalStyles.buttonSuccess
								: globalStyles.buttonAccent
							}
							disabled={loading}
							/>
						)}
					</ScrollView>
				</SafeAreaView>
			)}
			<StatusBar style='light' animated={true} backgroundColor={theme.accent.gradient1} />
		</>
	);
}
