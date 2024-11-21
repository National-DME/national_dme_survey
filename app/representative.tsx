import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../styles/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/generic/Button';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSurvey } from '../context/SurveyContext';

/**
 * This is the screen used by the representative to input their data first and to initialize the survey
 * 
 * @returns Representative screen; this is the first screen rendered
 */
export default function RepresentativeScreen() {
	const globalStyles = useGlobalStyles();
	const router = useRouter();
    const { branches, selectedWarehouses, setSelectedWarehouses } = useSurvey();

	/**
	 * Starts the survey by pushing the user to the survey screen
	 */
	const handleStartSurvey = () => {
		router.push('/survey');
	};

	return (
		<>
			<StatusBar style='light' backgroundColor={theme.secondary} />
			<SafeAreaView style={globalStyles.container}>
				<Text style={globalStyles.title}>Where are you?</Text>
				<View style={globalStyles.line} />
				<Text style={globalStyles.subtitle}>
					Before starting the survey, select the branch and warehouse(s)
					you’re at. This ensures the responses are linked to the right
					location.
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
                        value: branch
                    }))}
                    placeholder='Select branch'
                    searchPlaceholder='Search branches...'
                    maxHeight={300}
                    labelField='label'
                    valueField='value'
                    onChange={item => {
                        console.log(item);
                    }}
                    renderLeftIcon={() => (
                        <MaterialCommunityIcons 
                            color={theme.secondary}
                            size={20}
                            name='source-branch'
                            style={{padding: 5}}
                        />
                    )}
                />
				<MultiSelect 
                    mode='default'
                    style={globalStyles.dropdown}
                    placeholderStyle={globalStyles.placeholder}
                    selectedTextStyle={globalStyles.selectedText}
                    inputSearchStyle={globalStyles.inputSearchStyle}
                    itemTextStyle={globalStyles.itemTextStyle}
                    selectedStyle={globalStyles.selectedStyle}
                    activeColor={theme.secondary}
                    data={branches.map((branch) => ({
                        label: branch,
                        value: branch
                    }))}
                    value={selectedWarehouses}
                    placeholder='Select warehouse(s)'
                    searchPlaceholder='Search warehouses'
                    search
                    maxHeight={300}
                    labelField='label'
                    valueField='value'
                    onChange={item => {
                        setSelectedWarehouses(item);
                    }}
                    renderLeftIcon={() => (
                        <MaterialCommunityIcons 
                            color={theme.secondary}
                            size={20}
                            name='warehouse'
                            style={{padding: 5}}
                        />
                    )}
                />
				<Button
					title='Start Survey'
					onPress={handleStartSurvey}
					buttonStyle={[globalStyles.button, globalStyles.buttonSecondary]}
				/>
			</SafeAreaView>
		</>
	);
}
