import { View, Text, TouchableOpacity, ViewStyle, TextStyle, Pressable } from 'react-native';
import React from 'react';
import useGlobalStyles from '../../styles/globalStyles';

export interface ButtonProps {
    title: string;
    onPress: () => void;
    buttonStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle;
    disabled?: boolean;
}

export default function Button(props: ButtonProps) {
    const globalStyles = useGlobalStyles();
    
	return (
		<Pressable onPress={props.onPress} style={props.buttonStyle ? props.buttonStyle : globalStyles.button}>
            <Text style={props.textStyle ? props.textStyle : globalStyles.buttonLabel}>{props.title}</Text>
        </Pressable>
	);
}
