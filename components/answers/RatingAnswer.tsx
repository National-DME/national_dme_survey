import { View, Text } from 'react-native';
import React from 'react';
import { Rating } from 'react-native-ratings';
import { theme } from '../../styles/theme';

export default function RatingAnswer() {
	return (
        <>
            <Rating
                type='heart'
                showRating
                ratingBackgroundColor={theme.text}
                tintColor={theme.background}
                startingValue={3}
                minValue={1}
                fractions={0}
            />
        </>
	);
}
