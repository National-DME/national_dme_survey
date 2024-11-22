import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { QuestionInterface } from './Question';
import RatingAnswer from './answers/RatingAnswer';
import TextAnswer from './answers/TextAnswer';
import CheckListAnswer from './answers/CheckListAnswer';
import RadioListAnswer from './answers/RadioListAnswer';

/**
 * @type references the question interface type property; must be the same as this type because based on the type defined in the question component, answer must render a certain answer type
 * @answers is optional; will only be used when the type in question is 'check list' or 'radio list'
 */
export interface AnswerPropsBase {
    type: QuestionInterface['type'];
}

export interface RatingAnswerProps extends AnswerPropsBase {
    type: 'rating';
}

export interface RadioListAnswerProps extends AnswerPropsBase {
    type: 'radio list';
    answers: string[];
}

export interface CheckListAnswerProps extends AnswerPropsBase {
    type: 'check list';
    answers: string [];
}

export interface TextAnswerProps extends AnswerPropsBase {
    type: 'text';
    placeholder: string;
}

type AnswerProps = 
    | RatingAnswerProps 
    | RadioListAnswerProps 
    | CheckListAnswerProps 
    | TextAnswerProps;

export default function Answer(props: AnswerProps) {
    const globalStyles = useGlobalStyles();
    
	return (
		<View style={globalStyles.answerContianer}>
			{props.type === 'check list' && (
                <CheckListAnswer answers={props.answers && props.answers}/>
            )}
            {props.type === 'radio list' && (
                <RadioListAnswer answers={props.answers && props.answers} />
            )}
            {props.type === 'rating' && (
                <RatingAnswer />
            )}
            {props.type === 'text' && (
                <TextAnswer placeholder={props.placeholder} />
            )}
		</View>
	);
}
