import React, { useContext, createContext, useState, ReactNode, useEffect, useReducer } from 'react';
import { endpoints } from '../utils/network/endpoints';
import { deleteAuthenticationData, storeAuthenticationData } from '../utils/storage/secureStore';

/**
 * Represents the authentication state
 * 
 * On login successful, this data is stored in the devices memory
 * 
 * On logout, this data is deleted from devices memory
 */
export interface AuthState {
    authenticated: boolean | null;
    username: string | null;
    branchKey: number | null;
    expiration: string | Date | null;
    token: string | null;
}

/**
 * Represents the different actions the context can take
 * 
 * Each action dispatches different data according to the needs of the application authentication events
 */
export type AuthAction =
	| {
			type: 'LOGIN_SUCCESS';
			payload: AuthState;
	  }
	| { type: 'LOGOUT' }
	| { type: 'LOAD_DATA'; payload: AuthState }
	| { type: 'LOGIN_FAILURE' };

/**
 * Represents the authentication props passed to the authentication context
 */
export interface AuthProps {
    authState: AuthState;
    login: (username: string, password: string) => Promise<LoginAttempt>;
    logout: () => void;
}

/**
 * Represents the data the application receives upon login request from the server
 */
export interface LoginCall {
	ResponseCode: number;
	ResponseMessage: string;
	UserToken: string;
	ExpiryDate: string | Date;
	BranchKey: number;
	LoginStatus: boolean;
}

export interface LoginAttempt {
    success: boolean;
    message?: string;
}

/**
 * Represents the initial state of authentication state 
 * 
 * This is the state BEFORE the device checks memory for stored tokens
 * This is the state BEFORE the user logs in and replaces the authentication state with their own data
 */
export const initialState: AuthState = {
    authenticated: false,
    username: null,
    branchKey: null,
    expiration: null,
    token: null
}

/**
 * 
 * @param state The authentication state
 * @param action The action for the context to take
 * @returns The authentication state and the action taken
 */
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                authenticated: true,
                username: action.payload.username,
                branchKey: action.payload.branchKey,
                expiration: action.payload.expiration,
                token: action.payload.token
            };
        case 'LOGOUT': 
        case 'LOGIN_FAILURE':
            return initialState;
        case 'LOAD_DATA':
            return { ...state, ...action.payload }
        default: 
            return state;
    }
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);

    /**
     * This useEffect will be used to try to find user credentials stored in devices memory
     * 
     * Runs once on application launch
     */
    useEffect(() => {
        (async () =>{
            try {
                
            } catch (error) {

            }
        })
    }, []);

    /**
     * 
     * @param username Username that the user entered
     * @param password Password that the user entered
     * @returns {Promise<boolean>} Boolean based on whether server authentication call was successfull 
     */
    const login = async (username: string, password: string): Promise<LoginAttempt> => {
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
                body: data,
            });

            const loginAttempt = (await response.json()) as LoginCall;

            if (loginAttempt.LoginStatus === true) {

                const compiledAuthState = {
                    authenticated: true,
                    username,
                    branchKey: loginAttempt.BranchKey,
                    token: loginAttempt.UserToken,
                    expiration: loginAttempt.ExpiryDate,
                };

                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: compiledAuthState
                });

                await storeAuthenticationData(compiledAuthState);

                return {
                    success: true
                };
            } else {
                dispatch({
                    type: 'LOGIN_FAILURE',
                });
    
                if (loginAttempt.ResponseCode !== 200) {
                    return {
                        success: false,
                        message: 'Server responded with code other than 200'
                    }
                };
    
                return {
                    success: false,
                    message: 'Username or password incorrect'
                }
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'LOGIN_FAILURE'
            });
            throw error;
        }
    };

    /**
     * Logout function that when called sets the authentication state to its initial state, thus logging out the user and deletes users stored authentication state from device memory
     */
    const logout = async () => {
        await deleteAuthenticationData();
        dispatch({
            type: 'LOGOUT'
        });
    }

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}