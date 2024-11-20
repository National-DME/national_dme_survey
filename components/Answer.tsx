import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { QuestionInterface } from './Question';
import Rating from './answers/Rating';

/**
 * @type references the question interface type property; must be the same as this type because based on the type defined in the question component, answer must render a certain answer type
 * @answers is optional; will only be used when the type in question is 'check list' or 'radio list'
 */
export interface AnswerProps {
    type: QuestionInterface['type'];
    answers?: string[];
}

export default function Answer(props: AnswerProps) {
    const globalStyles = useGlobalStyles();
    
	return (
		<View style={globalStyles.answerContianer}>
			{props.type === 'check list' && (
                <Text style={globalStyles.question}>Check list</Text>
            )}
            {props.type === 'radio list' && (
                <Text style={globalStyles.question}>Radio list</Text>
            )}
            {props.type === 'rating' && (
                <Rating />
            )}
            {props.type === 'text' && (
                <Text style={globalStyles.question}>Text</Text>
            )}
		</View>
	);
}
