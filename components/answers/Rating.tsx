import { View, Text } from 'react-native';
import React from 'react';
import { AirbnbRating, Rating as Rate } from 'react-native-ratings';
import { theme } from '../../styles/theme';

export default function Rating() {
	return (
        <>
            <Rate
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
