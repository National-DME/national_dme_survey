import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

export default function TextAnswer() {
	const globalStyles = useGlobalStyles();

	const [answer, setAnswer] = useState<string>('');
	const [focused, setFocused] = useState<boolean>(false);

	return (
		<View>
			<TextInput 
				value={answer}
				placeholder='Say something...'
				placeholderTextColor={theme.border}
				multiline
				style={[globalStyles.textInput, focused && globalStyles.textInputFocused]}
				onChangeText={setAnswer}
				keyboardType='default'
				cursorColor={theme.text}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
		</View>
  )
}
