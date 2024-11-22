import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../styles/theme';
import useGlobalStyles from '../../styles/globalStyles';
import Button from '../generic/Button';

export default function RatingAnswer() {
    const globalStyles = useGlobalStyles();
    
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleRating = (rating: number) => {
        setSelectedRating(rating);
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
                        rating === selectedRating && globalStyles.selectedRatingBlock
                    ]} 
                />
            ))}
        </View>
	);
}
