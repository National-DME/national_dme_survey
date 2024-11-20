import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';

export interface QuestionInterface {
	text: string;
	type: 'multiple choice' | 'text' | 'rating';
}

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
                    Question: {props.index}
                </Text>
            </View>
            <View style={globalStyles.questionTextContainer}>
                <Text style={globalStyles.question}>{props.text}</Text>
                <Text style={globalStyles.subtitle}>
                    Type: {props.type}
                </Text>
                <Text style={globalStyles.question}>
                    The answer component goes here and renders the answers/the different content based on the type of question
                </Text>
            </View>
        </View>
	);
}
