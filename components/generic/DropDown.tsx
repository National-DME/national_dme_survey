import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import Button from './Button';

export default function DropDown() {
    const globalStyles = useGlobalStyles();

	return (
		<View style={globalStyles.dropdownContainer}>
			<Button
                title='Select branch'
                onPress={() => console.log('Select branch')}
                buttonStyle={globalStyles.buttonSecondary}
            />
		</View>
	);
}
