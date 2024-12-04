import { View, Text } from 'react-native';
import React from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../styles/theme';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../generic/Button';

export interface ErrorMessageProps {
    title: string;
    buttonTitle: string;
	callback: () => void;
}

export default function ErrorMessage(props: ErrorMessageProps) {
    const globalStyles = useGlobalStyles();

	return (
        <>
            <View style={globalStyles.errorContainer}>
                <Text style={globalStyles.title}>An error has occurred!</Text>
                <MaterialIcons 
                    name='nearby-error'
                    color={theme.constant.error}
                    size={80}
                />
                <Text style={globalStyles.subtitle}>
                    {props.title}
                </Text>
                <Button 
                    title={props.buttonTitle}
                    onPress={props.callback}
                />
            </View>
            <StatusBar style='light' animated={true} backgroundColor={theme.constant.error} />
        </>
	);
}
