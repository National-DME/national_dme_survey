import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import useGlobalStyles from '../styles/globalStyles';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../styles/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/generic/Button';
import { endpoints } from '../utils/network/endpoints';

export interface Warehouse {
    id: number;
    WhseKey: string;
    WhseID: string;
    BranchWhseKey: string;
    BranchWhseID: string;
    WhseDescription: string;
}

/**
 * 
 * @returns Representative screen; this is the first screen rendered
 * 
 * This is the screen used by the representative to input their data first and to initialize the survey
 */
export default function RepresentativeScreen() {
	const globalStyles = useGlobalStyles();
    const router = useRouter();

    const [warehouseList, setWarehouseList] = useState<Warehouse[]>([]);
    const [filteredWarehouseList, setFilteredWarehouseList] = useState<Warehouse[]>([]);
    const [branches, setBranches] = useState<string[]>([]);

    useEffect(() => {
        // Get the warehouse list
        (async () => {
            // Set the warehouse state
            const warehouses = await getWarehouseList();
            setWarehouseList(warehouses);

            // Set the branch state
            const branches = separateBranches(warehouses);
            setBranches(branches);
        })();
    }, []);

    const separateBranches = (warehouses: Warehouse[]): string[] => {
        // Separate branch id of each warehouse pulled
        const branches = warehouses.map(warehouse => warehouse.BranchWhseID);

        // Reduce the branch ids, removing duplicates
        return branches.reduce((accumulator, currentBranch) => {
            if (!accumulator.includes(currentBranch)) {
                accumulator.push(currentBranch);
            }
            return accumulator;
        }, [] as string[]);
    }

    const getWarehouseList = async () => {
        try {
            // Create the form data needed to send to the endpoint
            const data = new FormData();
            data.append('endpointname', endpoints.getWarehouses);

            // Make the request
            const response = await fetch(endpoints.BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: data
            });

            // Parse the request as json and return it
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    const handleStartSurvey = () => {
        router.push('/survey');
    }

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
                <Text style={globalStyles.subtitle}>{branches.length} branches</Text>
				<Button
					title='Start Survey'
					onPress={handleStartSurvey}
					buttonStyle={[globalStyles.button, globalStyles.buttonSecondary]}
				/>
			</SafeAreaView>
		</>
	);
}
