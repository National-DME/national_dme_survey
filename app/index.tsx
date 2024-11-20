import { View, Text, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { theme } from '../styles/theme';
import Button from '../components/generic/Button';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
    const globalStyles = useGlobalStyles();
    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        router.push('/representative');
    }

	return (
        <>
            <StatusBar style='light' backgroundColor={theme.primary} />
            <View style={globalStyles.loginContainer}>
                <Image 
                    source={require('../assets/logo.png')}
                    style={globalStyles.image}
                />
                <Text style={globalStyles.title}>Survey DME</Text>
                <TextInput 
                    value={username}
                    placeholder='Username'
                    placeholderTextColor={theme.border}
                    style={[globalStyles.textInput, username && globalStyles.textInputFocused]}
                    onChangeText={setUsername}
                    keyboardType='default'
                    cursorColor={theme.text}
                />
                <TextInput 
                    value={password}
                    placeholder='Password'
                    placeholderTextColor={theme.border}
                    style={[globalStyles.textInput, password && globalStyles.textInputFocused]}
                    onChangeText={setPassword}
                    keyboardType='default'
                    cursorColor={theme.text}
                />
                <Button
                    title='Login'
                    onPress={handleLogin}
                    buttonStyle={globalStyles.button}
                />
            </View>
        </>
	);
}
