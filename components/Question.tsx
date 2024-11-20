import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';
import Answer from './Answer';

/**
 * @text is the question being asked
 * @type is the type of question
 * @answers optional; are the associated answers; only used with radio and check lists
 */
export interface BaseQuestion {
	text: string;
}

export interface RadioListQuestion extends BaseQuestion {
	type: 'radio list';
	answers: string[]; // Required for 'radio list'
}

export interface CheckListQuestion extends BaseQuestion {
	type: 'check list';
	answers: string[]; // Required for 'check list'
}

export interface RatingQuestion extends BaseQuestion {
	type: 'rating'; // No `answers`
}

export interface TextQuestion extends BaseQuestion {
	type: 'text'; // No `answers`
}

// Includes question interface with an index property
export type QuestionInterface = 
    | RadioListQuestion
    | CheckListQuestion
    | RatingQuestion
    | TextQuestion

interface QuestionProps {
    question: QuestionInterface;
    index: number;
}
/**
 *
 * @returns The question component; used to render a question
 */
export default function Question({ question, index }: QuestionProps) {
    const globalStyles = useGlobalStyles();
	return (
        <View style={globalStyles.questionContainer}>
            <View style={globalStyles.questionBanner}>
                <Text style={globalStyles.banner}>
                    Question: {index + 1}
                </Text>
            </View>
            <View style={globalStyles.questionTextContainer}>
                <Text style={globalStyles.question}>{question.text}</Text>
                {question.type === 'radio list' || question.type === 'check list' ? (
                    <Answer type={question.type} answers={question.answers} />
                ) : (
                    <Answer type={question.type} />
                )}
            </View>
        </View>
	);
}
