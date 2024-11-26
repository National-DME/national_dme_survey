import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';
import useGlobalStyles from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

export interface CheckListAnswerProps {
	answers: string[];
}

export default function CheckListAnswer(props: CheckListAnswerProps) {
	const globalStyles = useGlobalStyles();
	const [checkedState, setCheckedState] = useState<boolean[]>(
		props.answers.map(() => false)
	);

	// TODO test implementation of checklist

	const handleCheckboxChanged = (index: number) => {
		const updatedCheckedState = [...checkedState];
		updatedCheckedState[index] = !updatedCheckedState[index];
		setCheckedState(updatedCheckedState);
	}

	return (
		<View style={globalStyles.answerListContainer}>
			{props.answers.map((answer, index) => (
				<View key={index} style={globalStyles.listItem}>
					<Checkbox
						status={checkedState[index] ? 'checked' : 'unchecked'}
						onPress={() => handleCheckboxChanged(index)}
						color={theme.secondary.toString()}
						uncheckedColor={theme.border}
					/>
					<Text style={globalStyles.answer}>
						{answer}
					</Text>
				</View>
			))}
		</View>
	);
}
