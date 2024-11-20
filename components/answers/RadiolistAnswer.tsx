import { View, Text } from 'react-native';
import React, { useState } from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { RadioButton } from 'react-native-paper';
import { theme } from '../../styles/theme';

export interface RadioListInterface {
	answers: string[];
}

export default function RadioListAnswer(props: RadioListInterface) {
	const globalStyles = useGlobalStyles();
	const [selected, setSelected] = useState('');

	const handleSelection = (value: string) => {
		setSelected(value);
	}

	return (
		<View style={globalStyles.answerListContainer}>
			{props.answers.map((answer, index) => (
				<View key={index} style={globalStyles.listItem}>
					<RadioButton 
						value={answer}
						status={selected === answer ? 'checked' : 'unchecked'}
						onPress={() => handleSelection(answer)}
						color={theme.secondary.toString()}
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
