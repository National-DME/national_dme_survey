import { View, Text, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { theme } from '../styles/theme';
import Button from '../components/generic/Button';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { endpoints } from '../utils/network/endpoints';

interface LoginCall {
    ResponseCode: number;
    ResponseMessage: string;
    UserToken: string;
    ExpiryDate: string | Date;
    BranchKey: number;
    LoginStatus: boolean;
}

export default function LoginScreen() {
    const globalStyles = useGlobalStyles();
    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleLogin = async () => {
        const loginAttempt = await login();
        if (loginAttempt.ResponseCode !== 200) {
            setErrorMessage('Network error, check internet connection');
            return;
        }

        if (loginAttempt.LoginStatus === true) {
            setErrorMessage('');
            router.replace('/representative');
        } else {
            setErrorMessage('Username or password incorrect');
        }
    }

    const login = async (): Promise<LoginCall> => {
        try {
            const data = new FormData();
            data.append('endpointname', endpoints.login);
            data.append('UserName', username);
            data.append('Password', password);

            const response = await fetch(endpoints.BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: data
            });

            return (await response.json()) as LoginCall;
        } catch (error) {
            console.log(error);
            throw error;
        }
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
                {errorMessage && (
                    <Text style={globalStyles.error}>
                        {errorMessage}
                    </Text>
                )}
                <Button
                    title='Login'
                    onPress={handleLogin}
                    buttonStyle={globalStyles.button}
                />
            </View>
        </>
	);
}
