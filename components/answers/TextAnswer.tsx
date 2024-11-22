import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

export interface TextAnswerProps {
	placeholder: string;
}

export default function TextAnswer({ placeholder }: TextAnswerProps) {
	const globalStyles = useGlobalStyles();

	const [answer, setAnswer] = useState<string>('');
	const [focused, setFocused] = useState<boolean>(false);

	return (
		<View style={globalStyles.textContainer}>
			<TextInput 
				value={answer}
				placeholder={placeholder}
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
