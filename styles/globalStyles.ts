import { Dimensions, StyleSheet } from 'react-native';
import { theme } from './theme';

/**
 * 
 * @returns Stylesheet that is accessible globally
 */
const useGlobalStyles = () => {
	const { height } = Dimensions.get('window');

	return StyleSheet.create({
		/* -- CONTAINERS -- */
		container: {
			flexGrow: 1,
			justifyContent: 'flex-start',
			backgroundColor: theme.background,
			paddingHorizontal: 8,
		},
		questionContainer: {
			width: '100%',
			flexDirection: 'column',
			paddingVertical: 10,
		},
		loginContainer: {
			flexGrow: 1,
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.background,
			marginHorizontal: 10,
		},
		iconContainer: {
			paddingHorizontal: 8,
		},
		errorContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.background,
			padding: 8,
		},
		successContainer: {
			flexGrow: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.text,
			padding: 8,
		},
		/* -- CONTENT -- */
		successTitleContent: {
			fontFamily: 'Nunito',
			fontSize: 35,
			color: theme.border,
			textAlign: 'center',
			marginVertical: 10,
		},
		successSubtitleContent: {
			fontFamily: 'Nunito',
			fontSize: 20,
			color: theme.border,
			textAlign: 'center',
			marginVertical: 10,
		},
		error: {
			backgroundColor: theme.constant.error,
			color: theme.text,
			textAlign: 'center',
			fontFamily: 'Nunito',
			fontSize: 20,
			padding: 15,
			borderRadius: 8,
		},
		errorText: {
			color: theme.constant.error,
		},
		surveyInstructionContent: {
			color: theme.text,
			fontFamily: 'Nunito',
			fontSize: 20
		},
		logo: {
			width: 130,
			height: 130,
			resizeMode: 'contain',
		},
		image: {
			width: '100%',
			height: undefined,
			aspectRatio: 1,
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
		modalTitle: {
			fontFamily: 'Nunito',
			fontSize: 30,
			textAlign: 'center',
			color: theme.text,
		},
		modalSubtitle: {
			fontFamily: 'Nunito',
			fontSize: 25,
			textAlign: 'center',
			color: theme.text,
		},
		drawerHeaderTitle: {
			fontFamily: 'Nunito',
			fontSize: 24,
			color: theme.text,
		},
		drawerLabelStyle: {
			color: theme.text,
			fontFamily: 'Nunito',
			includeFontPadding: false,
			fontSize: 20,
			textAlignVertical: 'center',
		},
		drawerVersionText: {
			color: theme.text,
			fontSize: 20,
			fontFamily: 'Nunito',
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
		buttonSuccess: {
			backgroundColor: theme.constant.success,
		},
		/* -- INPUTS -- */
		textContainer: {
			alignItems: 'center',
		},
		textInput: {
			backgroundColor: theme.background,
			width: '100%',
			textAlignVertical: 'top',
			margin: 10,
			padding: 8,
			borderWidth: 0.5,
			borderRadius: 8,
			borderColor: theme.border,
			fontFamily: 'Nunito',
			fontSize: 20,
			color: theme.text,
		},
		textInputAnswer: {
			backgroundColor: theme.background,
			width: '90%',
			height: 100,
			textAlignVertical: 'top',
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
			borderColor: theme.accent.gradient1,
		},
		answerListContainer: {
			justifyContent: 'flex-start',
		},
		listItem: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
		},
		/* -- MODAL -- */
		modalContainer: {
			flex: 1,
			backgroundColor: 'rgba(0, 0, 0, 0.7)',
			justifyContent: 'center',
			alignItems: 'center',
		},
		baseModalView: {
			flex: 1,
			padding: 15,
			margin: 20,
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'stretch',
			borderRadius: 8,
			width: '95%',
			maxHeight: height * 0.9,
			shadowOffset: {
				width: 2,
				height: 2,
			},
		},
		generalModalView: {
			backgroundColor: theme.background,
		},
		/* -- CHIPS -- */
		chipContainer: {
			flexDirection: 'row',
			flexWrap: 'wrap',
		},
		chip: {
			margin: 5,
			backgroundColor: theme.secondary,
		},
		chipContent: {
			fontFamily: 'Nunito',
			fontSize: 15,
			color: theme.text,
		},
		/* -- DROPDOWN -- */
		dropdownContainer: {
			width: '100%',
			minHeight: '80%',
		},
		dropdownContent: {
			fontFamily: 'Nunito',
			fontSize: 18,
			color: theme.text,
			textAlign: 'left',
			width: '100%',
		},
		dropdownContentContainer: {
			padding: 8,
			marginVertical: 10,
			borderWidth: 0.5,
			borderColor: theme.border,
			borderRadius: 8,
		},
		dropdownContainerSelected: {
			backgroundColor: theme.secondary,
			color: theme.text,
			borderColor: theme.secondary,
		},
		dropdownContentSubtitle: {
			fontFamily: 'Nunito',
			fontSize: 18,
			color: theme.text,
		},
		dropdownContentSubtitleFaded: {
			fontFamily: 'Nunito',
			fontSize: 18,
			color: theme.text,
			fontStyle: 'italic'
		},
		dropdownMessageContent: {
			fontFamily: 'Nunito',
			fontSize: 20,
			color: theme.constant.error,
			textAlign: 'center',
		},
		dropdown: {
			alignSelf: 'stretch',
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
		ratingAnswerContainer: {
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'space-evenly',
			alignItems: 'center',
		},
		ratingBlock: {
			backgroundColor: theme.background,
			borderWidth: 0.5,
			borderRadius: 8,
			borderColor: theme.text,
			paddingVertical: 10,
			paddingHorizontal: 15,
		},
		selectedRatingBlock: {
			backgroundColor: theme.accent.gradient1,
			borderColor: theme.accent.gradient1,
		},
	});
};

export default useGlobalStyles;
