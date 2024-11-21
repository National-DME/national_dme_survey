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
			justifyContent: 'flex-start',
			//alignItems: 'center',
			backgroundColor: theme.background,
			padding: 8,
			marginVertical: 10,
		},
		loginContainer: {
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.background,
		},
		iconContainer: {
			paddingHorizontal: 5
		},
		/* -- CONTENT -- */
		image: {
			width: 130,
			height: 130,
			resizeMode: 'contain',
		},
		title: {
			fontFamily: 'Nunito',
			fontSize: 40,
			textAlign: 'center',
			marginBottom: 15,
			color: theme.text,
		},
		subtitle: {
			fontFamily: 'Nunito',
			fontSize: 20,
			color: theme.text,
			textAlign: 'center',
			marginVertical: 10,
		},
		banner: {
			fontFamily: 'Nunito',
			fontSize: 22,
			color: theme.text,
			textAlign: 'left',
			padding: 8,
		},
		question: {
			fontFamily: 'Nunito',
			fontSize: 19,
			textAlign: 'left',
			padding: 8,
			color: theme.text,
		},
		answer: {
			fontFamily: 'Nunito',
			fontSize: 17,
			padding: 8,
			color: theme.text,
		},
		/* -- BUTTONS -- */
		button: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.primary,
			borderRadius: 8,
			marginVertical: 10,
			paddingHorizontal: 15,
			paddingVertical: 8,
		},
		buttonLabel: {
			fontFamily: 'Nunito',
			fontSize: 20,
			color: theme.text,
			textAlign: 'center',
		},
		buttonPrimary: {
			backgroundColor: theme.primary,
		},
		buttonSecondary: {
			backgroundColor: theme.secondary,
		},
		buttonAccent: {
			backgroundColor: theme.accent.primary,
		},
		/* -- INPUTS -- */
		textInput: {
			backgroundColor: theme.background,
			width: '85%',
			margin: 10,
			padding: 8,
			borderWidth: 0.5,
			borderRadius: 8,
			borderColor: theme.border,
			fontFamily: 'Nunito',
			fontSize: 20,
			color: theme.text,
		},
		textInputFocused: {
			borderColor: theme.secondary,
		},
		answerListContainer: {
			justifyContent: 'flex-start',
		},
		listItem: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
		},
		/* -- DROPDOWN -- */
		dropdown: {
			height: 50,
			borderColor: theme.border,
			borderWidth: 0.5,
			borderRadius: 8,
			paddingHorizontal: 8,
			marginVertical: 10,
		},
		placeholder: {
			color: theme.border,
			fontFamily: 'Nunito',
		},
		selectedText: {
			color: theme.text,
			fontFamily: 'Nunito',
			fontSize: 20,
		},
		selectedStyle: {
			borderColor: theme.border,
			borderRadius: 8,
		},
		inputSearchStyle: {
			fontFamily: 'Nunito',
			borderRadius: 8,
			color: theme.border,
		},
		itemTextStyle: {
			fontFamily: 'Nunito',
			color: theme.border,
		},
		containerStyle: {
			backgroundColor: theme.border,
		},
		selectedButton: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.background,
			color: theme.text,
			marginVertical: 10,
			marginRight: 10,
			padding: 8,
			paddingRight: 0,
			borderWidth: 0.5,
			borderRadius: 8,
			borderColor: theme.secondary,
		},
		/* -- SPECIAL -- */
		line: {
			borderWidth: 0.5,
			borderColor: theme.border,
			width: '100%',
			marginVertical: 5,
			borderRadius: 8,
		},
		/* -- QUESTION COMPONENT -- */
		questionContainer: {
			width: '100%',
			flexDirection: 'column',
			marginVertical: 10,
		},
		questionBanner: {
			backgroundColor: theme.border,
			borderTopLeftRadius: 10,
			borderTopRightRadius: 10,
		},
		questionTextContainer: {
			borderBottomWidth: 1,
			borderRightWidth: 1,
			borderLeftWidth: 1,
			borderColor: theme.border,
			borderBottomLeftRadius: 10,
			borderBottomRightRadius: 10,
		},
		/* -- ANSWER COMPONENT -- */
		answerContianer: {
			flexDirection: 'column',
			marginVertical: 10,
		},
	});
};

export default useGlobalStyles;
