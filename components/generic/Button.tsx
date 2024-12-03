import { View, Text, TouchableOpacity, ViewStyle, TextStyle, Pressable } from 'react-native';
import React, { ReactNode } from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

export interface ButtonProps {
    title: string;
    onPress: () => void;
    buttonStyle?: ViewStyle | (ViewStyle | undefined | false | null)[];
    textStyle?: TextStyle;
    disabled?: boolean;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
}

export default function Button(props: ButtonProps) {
    const globalStyles = useGlobalStyles();

    const combinedButtonStyle = Array.isArray(props.buttonStyle)
    ? [globalStyles.button, ...props.buttonStyle]
    : [globalStyles.button, props.buttonStyle];
    
	return (
		<Pressable 
            onPress={props.onPress} 
            style={combinedButtonStyle}
            android_ripple={{
                color: theme.text,
                borderless: false,
                foreground: true
            }}>
            {(props.icon && props.iconPosition === 'left') && (
                <View style={globalStyles.iconContainer}>
                    {props.icon}
                </View>
            )}
            <Text style={props.textStyle ? props.textStyle : globalStyles.buttonLabel}>{props.title}</Text>
            {(props.icon && props.iconPosition === 'right') && (
                <View style={globalStyles.iconContainer}>
                    {props.icon}
                </View>
            )}
        </Pressable>
	);
}
