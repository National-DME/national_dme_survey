import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { QuestionInterface } from './Question';
import RatingAnswer from './answers/RatingAnswer';
import TextAnswer from './answers/TextAnswer';
import CheckListAnswer from './answers/CheckListAnswer';
import RadioListAnswer from './answers/RadioListAnswer';


export interface AnswerBase {
    question: QuestionInterface;
}


/**
 * @type references the question interface type property; must be the same as this type because based on the type defined in the question component, answer must render a certain answer type
 * @answers is optional; will only be used when the type in question is 'check list' or 'radio list'
 */
export interface AnswerProps extends AnswerBase {
    type: QuestionInterface['type'];
    answers?: {title: string, key: number}[];
    placeholder?: string;
}

export default function Answer(props: AnswerProps) {
    const globalStyles = useGlobalStyles();
    
	return (
		<View style={globalStyles.answerContianer}>
			{(props.type === 'check list' && props.answers) && (
                <CheckListAnswer answers={props.answers}/>
            )}
            {(props.type === 'radio list' && props.answers) && (
                <RadioListAnswer question={props.question} answers={props.answers} />
            )}
            {props.type === 'rating' && (
                <RatingAnswer question={props.question} />
            )}
            {(props.type === 'text' && props.placeholder) && (
                <TextAnswer question={props.question} type={props.type} placeholder={props.placeholder} />
            )}
		</View>
	);
}
