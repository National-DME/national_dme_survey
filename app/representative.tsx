import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../styles/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/generic/Button';
import { endpoints } from '../utils/network/endpoints';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Represents a warehouse object returned from the server
 */
export interface Warehouse {
    id: number;
    WhseKey: string;
    WhseID: string;
    BranchWhseKey: string;
    BranchWhseID: string;
    WhseDescription: string;
}

/**
 * This is the screen used by the representative to input their data first and to initialize the survey
 * 
 * @returns Representative screen; this is the first screen rendered
 */
export default function RepresentativeScreen() {
	const globalStyles = useGlobalStyles();
	const router = useRouter();

	// Warehouse list state variable represents the compiled_warhouse_groups data in the data-examples folder; warehouses grouped into arrays of warehouse objects by branch
	const [warehouseList, setWarehouseList] =
		useState<Record<string, Warehouse[]>>({});

	// Filtered warehouse list is ALMOST the same as the warehouseList state variable, but holds the warehouse objects filtered by the search results (only pulls data from the branch array selected by the representative first)
	const [filteredWarehouseList, setFilteredWarehouseList] = useState<
		Warehouse[]
	>([]);

	// Branch state variable that holds the possible branches to select from
	const [branches, setBranches] = useState<{ label: string, value: string}[]>([]);
    const [selectedWarehouses, setSelectedWarehouses] = useState<string[]>([]);

	/**
     * Initializes the warehouse data for the screen by:
     * 1. Checking if warehouse data was already fetched
     * 2. Compiling the data into branch IDs and grouped warehouse structures
     * 3. Setting the state variables for branches and grouped warehouses
     * 
     * This effect runs only once when the component is mounted
     */
    // TODO setup survey context to record answers/initalizing data
	useEffect(() => {
		// Get the warehouse list
		(async () => {
            // Stop the function if data was already fetched
            if (Object.keys(warehouseList).length !== 0) return;

            // If data was not yet fetched, fetch the data
			const warehouses = await getWarehouseList();

			// Compile the branch/warehouse data into usable structures
			const compiledData = separateBranchesAndGroup(warehouses);

			// Set state variables
			setBranches(compiledData.branches);
			setWarehouseList(compiledData.groupedWarehouses);
		})();
	}, []);

    useEffect(() => {
        console.log(selectedWarehouses);
    }, [selectedWarehouses]);

	/**
	 * Separates a list of warehouses into unique branch IDs and groups warehouses by their branches.
	 *
	 * @param {Warehouse[]} warehouses - The list of all available warehouses pulled from the server.
	 * @returns {{
	 *   branches: string[],
	 *   groupedWarehouses: Record<string, Warehouse[]>
	 * }} An object containing two properties:
	 * - `branches`: An array of unique branch IDs.
	 * - `groupedWarehouses`: An object where each key is a branch ID and the value is an array of warehouses belonging to that branch.
	 */
	const separateBranchesAndGroup = (
		warehouses: Warehouse[]
	): {
		branches: { label: string, value: string }[];
		groupedWarehouses: Record<string, Warehouse[]>;
	} => {
		// Separate branch id of each warehouse pulled
		const branchArray = [
			...new Set(warehouses.map((warehouse) => warehouse.BranchWhseID)),
		];

        const branches = branchArray.map((branch) => ({
            label: branch,
            value: branch
        }));

		// Reduce the warehouse list to arrays separated by branch
		const groupedWarehouses = warehouses.reduce((accumulator, warehouse) => {
			const { BranchWhseID } = warehouse;
			if (!accumulator[BranchWhseID]) {
				accumulator[BranchWhseID] = [];
			}
			accumulator[BranchWhseID].push(warehouse);
			return accumulator;
		}, {} as Record<string, Warehouse[]>);

		return { branches, groupedWarehouses };
	};

	/**
	 * Fetches the list of warehouses from the server.
	 *
	 * This function sends a POST request to the `BASE_URL` with the 'endpointname' field set to `Get_Warehouses` using `FormData`.
	 * The server responds with a list of warehouses available for selection. The response is parsed as JSON and returned.
	 *
	 * @async
	 * @function
	 * @returns {Promise<Warehouse[]>} A promise that resolves to an array of `Warehouse` objects representing the available warehouses.
	 * @throws {Error} If the fetch request fails or the server returns an invalid response, the error is logged and rethrown.
	 */
	const getWarehouseList = async (): Promise<Warehouse[]> => {
		try {
			// Create the form data needed to send to the endpoint
			const data = new FormData();
			data.append('endpointname', endpoints.getWarehouses);

			// Make the request
			const response = await fetch(endpoints.BASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				body: data,
			});

			// Parse the request as json and return it
			return (await response.json()) as Warehouse[];
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

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
                    data={branches}
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
                    data={branches}
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
