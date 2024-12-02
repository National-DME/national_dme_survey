import { View, Text, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { theme } from '../styles/theme';
import Button from '../components/generic/Button';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
    const globalStyles = useGlobalStyles();
    const { authState, login } = useAuth();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log('auth check from login', authState.authenticated);
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        const loginAttempt = await login!(username.trim(), password.trim());
        setLoading(false);
        if (!loginAttempt.success && loginAttempt.message) {
            setErrorMessage(loginAttempt.message);
            return;
        }

        setErrorMessage('');
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
					style={[
						globalStyles.textInput,
						username ? globalStyles.textInputFocused : undefined,
					]}
					onChangeText={setUsername}
					keyboardType='default'
                    autoCapitalize='none'
                    autoComplete='off'
					cursorColor={theme.text}
				/>
				<TextInput
					value={password}
					placeholder='Password'
					placeholderTextColor={theme.border}
					style={[
						globalStyles.textInput,
						password ? globalStyles.textInputFocused : undefined,
					]}
					onChangeText={setPassword}
					keyboardType='default'
                    autoCapitalize='none'
                    autoComplete='off'
					cursorColor={theme.text}
					secureTextEntry={true}
				/>
				{errorMessage && (
					<Text style={globalStyles.error}>{errorMessage}</Text>
				)}
				<Button
					title={loading ? 'Logging in...' : 'Login'}
					onPress={handleLogin}
					buttonStyle={globalStyles.button}
					disabled={loading}
				/>
			</View>
		</>
	);
}
