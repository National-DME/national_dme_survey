import { View, Text, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { theme } from '../../styles/theme';
import { useSurvey } from '../../context/SurveyContext';
import { AnswerBase } from '../Answer';

export interface TextAnswerProps extends AnswerBase {
	type: 'text';
	placeholder: string;
}

export default function TextAnswer(props: TextAnswerProps) {
	const globalStyles = useGlobalStyles();
	const { handleAnswer } = useSurvey();

	const [answer, setAnswer] = useState<string>('');
	const [focused, setFocused] = useState<boolean>(false);

	// Third of a second
	const DEBOUNCE_DELAY = 300;

	useEffect(() => {
		// Debounce local answer to not update context too often (for performance reasons)
		const timeoutId = setTimeout(() => {
			handleAnswer({question: props.question, answer});
		}, DEBOUNCE_DELAY);

		return () => clearTimeout(timeoutId);
	}, [answer]);

	// BUG the text box expands off screen when the first line of content goes beyond the first line
	return (
		<View style={globalStyles.textContainer}>
			<TextInput 
				value={answer}
				placeholder={props.placeholder}
				placeholderTextColor={theme.border}
				multiline
				style={[globalStyles.textInputAnswer, focused && globalStyles.textInputFocused]}
				onChangeText={setAnswer}
				keyboardType='default'
				cursorColor={theme.text}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
		</View>
  )
}
