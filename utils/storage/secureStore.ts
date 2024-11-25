import * as SecureStore from 'expo-secure-store';
import { AuthState, failedState } from '../../types/authTypes';

/**
 * The storage key that the authentication state is stored under
 */
const STORAGE_KEY = 'authentication';

/**
 * 
 * @param value The authentication state being stored on device memory upon successfull login
 */
export const storeAuthenticationData = async (value: AuthState): Promise<void> => {
    try {
        await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(value));
        console.log('Authentication state stored successfully');
    } catch (error) {
        console.error('Authentication state failed to be stored', error);
        throw error;
    }
}

/**
 * 
 * @returns The authentication state stored when the user logged in
 * 
 * Retrieved in the AuthContext useEffect that runs on application launch
 */
export const getAuthenticationData = async (): Promise<AuthState> => {
    try {
        const value = await SecureStore.getItemAsync(STORAGE_KEY);
        if (value === null) {
            console.log('Authentication data failed to be read');
            return failedState;
        }
        console.log('Authentication data successfully read');
        return (JSON.parse(value)) as AuthState;
    } catch (error) {
        console.log('Error getting authentication data', error);
        throw error;
    }
}

/**
 * Deletes the stored authentication data
 */
export const deleteAuthenticationData = async (): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(STORAGE_KEY);
        console.log('Data successfully deleted');
    } catch (error) {
        console.log('Error deleting authentication data', error);
        throw error;
    }
}