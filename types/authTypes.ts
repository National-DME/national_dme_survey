/**
 * These are in a separate file to avoid a require cycle warning
 *  (NOBRIDGE) WARN  Require cycle: context\AuthContext.tsx -> utils\storage\secureStore.ts -> context\AuthContext.tsx
 * 
 * The secureStorage.ts utility file is imported into the auth context, but the authentication context interfaces are imported into the secure store utility functions
 * 
 * Warning resolved when (Thomas 11/25/2024) moved the interface and initialState variable into a separate file
 */

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

export const failedState: AuthState = {
	authenticated: false,
	username: null,
	branchKey: null,
	expiration: null,
	token: null,
};