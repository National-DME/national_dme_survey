import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';
import Answer from './Answer';

/**
 * @text is the question being asked
 * @type is the type of question
 * @answers optional; are the associated answers; only used with radio and check lists
 */
export interface QuestionInterface {
	text: string;
	type: 'radio list' | 'text' | 'rating' | 'check list';
    answers?: string[];
}

// Includes question interface with an index property
interface QuestionProps extends QuestionInterface {
    index: number;
}

/**
 *
 * @returns The question component; used to render a question
 */
export default function Question(props: QuestionProps) {
    const globalStyles = useGlobalStyles();
	return (
        <View style={globalStyles.questionContainer}>
            <View style={globalStyles.questionBanner}>
                <Text style={globalStyles.banner}>
                    Question: {props.index + 1}
                </Text>
            </View>
            <View style={globalStyles.questionTextContainer}>
                <Text style={globalStyles.question}>{props.text}</Text>
                <Answer type={props.type} answers={props.answers} />
            </View>
        </View>
	);
}
