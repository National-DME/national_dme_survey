import { StyleSheet } from 'react-native';
import { theme } from './theme';

/**
 * 
 * @returns Stylesheet that is accessible globally
 */
const useGlobalStyles = () => {
	return StyleSheet.create({
		/* -- CONTAINERS -- */
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.background,
			padding: 10,
		},
		/* -- CONTENT -- */
		title: {
			fontFamily: 'Nunito',
			fontSize: 28,
			color: theme.text,
		},
		subtitle: {
			fontFamily: 'Nunito',
			fontSize: 20,
			color: theme.text,
			textAlign: 'center',
			marginVertical: 10,
		},
		/* -- BUTTONS -- */
		buttonPrimary: {
			color: theme.text,
			backgroundColor: theme.primary,
		},
        buttonSecondary: {
            color: theme.text,
            backgroundColor: theme.secondary
        },
		buttonAccent: {
			color: theme.text,
			backgroundColor: theme.accent.primary,
		},
		buttonLabel: {
			fontFamily: 'Nunito',
		},
		/* -- SPECIAL -- */
		line: {
			borderWidth: 2,
			borderColor: theme.border,
			width: '100%',
			marginVertical: 5,
            borderRadius: 5,
		},
	});
};

export default useGlobalStyles;
