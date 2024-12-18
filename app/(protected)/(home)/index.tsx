import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import useGlobalStyles from '../../../styles/globalStyles';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../../styles/theme';
import { useRouter } from 'expo-router';
import Button from '../../../components/generic/Button';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSurvey } from '../../../context/SurveyContext';
import { ScrollView } from 'react-native-gesture-handler';
import { getAuthenticationData } from '../../../utils/storage/secureStore';
import ErrorMessage from '../../../components/error/ErrorMessage';
import WarehousePicker from '../../../components/modal/WarehousePicker';
import { Chip } from 'react-native-paper';

export interface WarehouseSelection {
	value: string;
	label: string;
	lastDtm: string;
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
	const [renderWarehousePicker, setRenderWarehousePicker] = useState<boolean>(false);
	/**
	 * Effect that runs context mount
	 *
	 * Calls server; Compiles data; Initializes and sets state variables;
	 * All via the getAndSetWarehouseData function
	 */
	useEffect(() => {
		(async () => {
			await getDataViaContext();
		})();
	}, []);

	useEffect(() => {
		setSelectedWarehouses([]);
	}, [selectedBranch]);

	const handleSelectWarehouse = (warehouseId: string) => {
		const newSelection = selectedWarehouses.includes(warehouseId)
			? selectedWarehouses.filter((id) => id !== warehouseId)
			: [...selectedWarehouses, warehouseId];

		setSelectedWarehouses(newSelection);
	};

	const getDataViaContext = async () => {
		try {
			// Initialize context state
			const userData = await getAuthenticationData();
			if (!userData.token) return;

			console.log('Initializing survey');
			await handleWarehouses(userData.token);
			await handleQuestions(userData.token);
			setErrorMessage('');
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
				<>
					<ScrollView
						contentContainerStyle={globalStyles.container}
						keyboardShouldPersistTaps='handled'>
						<Text style={globalStyles.title}>Where are you?</Text>
						<View style={globalStyles.line} />
						<Text style={globalStyles.subtitle}>
							Before starting the survey, select the branch and
							warehouse(s) you’re at. This ensures the client ratings are
							linked to the right location.
						</Text>
						<Dropdown
							mode='default'
							style={globalStyles.dropdown}
							placeholderStyle={globalStyles.placeholder}
							selectedTextStyle={globalStyles.selectedText}
							inputSearchStyle={globalStyles.inputSearchStyle}
							itemTextStyle={globalStyles.itemTextStyle}
							activeColor={theme.secondary}
							data={branches.map((branch) => ({
								label: branch,
								value: branch,
							}))}
							placeholder='Select branch'
							searchPlaceholder='Search branches...'
							maxHeight={300}
							labelField='label'
							valueField='value'
							value={selectedBranch}
							onChange={(item) => {
								setSelectedBranch(item.value);
							}}
							renderLeftIcon={() => (
								<MaterialCommunityIcons
									color={theme.secondary}
									size={20}
									name='source-branch'
									style={{ padding: 5 }}
								/>
							)}
						/>
						{selectedBranch && selectedWarehouses.length > 0 && (
							<View style={globalStyles.chipContainer}>
								{selectedWarehouses.map((warehouse) => (
									<Chip
										key={warehouse}
										style={globalStyles.chip}
										textStyle={globalStyles.chipContent}
										onPress={() => handleSelectWarehouse(warehouse)}
										icon={() => (
											<MaterialCommunityIcons
												name='close'
												size={24}
												color={theme.text}
											/>
										)}>
										{warehouse}
									</Chip>
								))}
							</View>
						)}
						{selectedBranch && (
							<Button
								title='Select warehouse(s)'
								onPress={() => setRenderWarehousePicker(true)}
								buttonStyle={globalStyles.buttonSecondary}
							/>
						)}
						{selectedBranch && selectedWarehouses.length !== 0 && (
							<Button
								title='Start Survey'
								onPress={handleStartSurvey}
								buttonStyle={[
									globalStyles.button,
									globalStyles.buttonAccent,
								]}
							/>
						)}
					</ScrollView>
				</>
			)}
			{selectedBranch && warehouseList && (
				<WarehousePicker
					handleSelectWarehouse={handleSelectWarehouse}
					branch={selectedBranch}
					visible={renderWarehousePicker}
					onClose={() => setRenderWarehousePicker(false)}
					warehouses={warehouseList[selectedBranch].map((warehouse) => ({
						label: warehouse.WhseDescription,
						value: warehouse.WhseID,
						lastDtm: warehouse.LastDtm
					}))}
				/>
			)}
			<StatusBar style='light' animated={true} backgroundColor={theme.secondary} />
		</>
	);
}
