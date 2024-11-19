import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../styles/globalStyles';

export default function RepresentativeScreen() {
	const globalStyles = useGlobalStyles();

	return (
		<View style={globalStyles.container}>
			<Text style={globalStyles.text}>Representative screen</Text>
		</View>
	);
}
