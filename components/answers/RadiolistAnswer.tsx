import { View, Text } from 'react-native';
import React, { useState } from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { RadioButton } from 'react-native-paper';
import { theme } from '../../styles/theme';
import { useSurvey } from '../../context/SurveyContext';
import { AnswerBase } from '../Answer';

export interface RadioListAnswerProps extends AnswerBase {
	answers: string[];
}

export default function RadioListAnswer(props: RadioListAnswerProps) {
	const globalStyles = useGlobalStyles();
	const { currentAnswer, handleAnswer } = useSurvey();

	const handleSelection = (answer: string) => {
		handleAnswer({questionKey: props.question.key, answer});
	}

	return (
		<View style={globalStyles.answerListContainer}>
			{props.answers.map((answer, index) => (
				<View key={index} style={globalStyles.listItem}>
					<RadioButton 
						value={answer}
						status={currentAnswer(props.question.key) === answer ? 'checked' : 'unchecked'}
						onPress={() => handleSelection(answer)}
						color={theme.accent.gradient1.toString()}
						uncheckedColor={theme.border.toString()}
					/>
					<Text style={globalStyles.answer}>
						{answer}
					</Text>
				</View>
			))}
		</View>
	);
}
