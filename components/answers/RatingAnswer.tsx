import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../styles/theme';
import useGlobalStyles from '../../styles/globalStyles';
import Button from '../generic/Button';
import { useSurvey } from '../../context/SurveyContext';
import { AnswerBase } from '../Answer';

export default function RatingAnswer(props: AnswerBase) {
    const globalStyles = useGlobalStyles();
    const { currentAnswer, handleAnswer } = useSurvey();

    const handleRating = (rating: number) => {
        handleAnswer({question: props.question, answer: rating})
    }

	return (
        <View style={globalStyles.ratingAnswerContainer}>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((rating) => (
                <Button 
                    key={rating} 
                    title={rating.toString()} 
                    onPress={() => handleRating(rating)} 
                    buttonStyle={[
                        globalStyles.ratingBlock,
                        rating === currentAnswer(props.question.key) && globalStyles.selectedRatingBlock
                    ]}
                />
            ))}
        </View>
	);
}
