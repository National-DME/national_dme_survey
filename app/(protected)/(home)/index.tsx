import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import useGlobalStyles from '../../../styles/globalStyles';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../../styles/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/generic/Button';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSurvey } from '../../../context/SurveyContext';
import { ScrollView } from 'react-native-gesture-handler';
import { getAuthenticationData } from '../../../utils/storage/secureStore';
import ErrorMessage from '../../../components/error/ErrorMessage';
import WarehousePicker from '../../../components/modal/WarehousePicker';

export interface WarehouseSelection {
	value: string;
	label: string;
}

/**
 * This is the screen used by the representative to input their data first and to initialize the survey
 *
 * @returns Representative screen; this is the first screen rendered
 */
export default function RepresentativeScreen() {
	const globalStyles = useGlobalStyles();
	const router = useRouter();
	const {
		warehouseList,
		branches,
		selectedWarehouses,
		setSelectedWarehouses,
		selectedBranch,
		setSelectedBranch,
		handleWarehouses,
		handleQuestions,
	} = useSurvey();

	const [errorMessage, setErrorMessage] = useState<string>('');

	/**
	 * Effect that runs context mount
	 *
	 * Calls server; Compiles data; Initializes and sets state variables;
	 * All via the getAndSetWarehouseData function
	 */
	useEffect(() => {
		(async () => {
			await getDataViaContext();
			setSelectedBranch('UT1');
			setSelectedWarehouses(['72024A']);
		})();
	}, []);

	const getDataViaContext = async () => {
		try {
			// Initialize context state
			const userData = await getAuthenticationData();
			if (!userData.token) return;

			console.log('Initializing survey');
			await handleWarehouses(userData.token);
			await handleQuestions(userData.token);
		} catch (error: any) {
			setErrorMessage(
				error.message ? error.message : 'Unable to generate survey'
			);
		}
	};

	/**
	 * Starts the survey by pushing the user to the survey screen
	 */
	const handleStartSurvey = () => {
		router.replace('/survey');
	};

	return (
		<>
			{errorMessage ? (
				<ErrorMessage
					title={errorMessage}
					callback={getDataViaContext}
					buttonTitle='Generate survey again'
				/>
			) : (
				<ScrollView contentContainerStyle={globalStyles.container}>
					<StatusBar style='light' backgroundColor={theme.secondary} />
					<Text style={globalStyles.title}>Where are you?</Text>
					<View style={globalStyles.line} />
					<Text style={globalStyles.subtitle}>
						Before starting the survey, select the branch and
						warehouse(s) you’re at. This ensures the client ratings are
						linked to the right location.
					</Text>
					{selectedBranch && selectedWarehouses.length !== 0 && (
						<Button
							title='Start Survey'
							onPress={handleStartSurvey}
							buttonStyle={[
								globalStyles.button,
								globalStyles.buttonSecondary,
							]}
						/>
					)}
				</ScrollView>
			)}
			{selectedBranch && (
				<WarehousePicker branch='UT1' warehouses={
					warehouseList[selectedBranch].map(
						(warehouse) => ({
							label: warehouse.WhseDescription,
							value: warehouse.WhseID,
						})
					)}/>
			)}
		</>
	);
}
