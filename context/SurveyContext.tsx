import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { endpoints } from '../utils/network/endpoints';

export interface SurveyContextInterface {
    warehouseList: Record<string, Warehouse[]>;
    branches: { label: string, value: string }[];
    selectedWarehouses: string[];
    setSelectedWarehouses: (warehouses: string[]) => void;
}

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

export const SurveyContext = createContext<SurveyContextInterface | null>(null);

export const SurveyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	/**
	 * Warehouse list state variable represents the compiled_warehouse_groups data in the data-examples folder (ask Thomas (11/21/2024) - gitignore) warehouses grouped into arrays of warehouse objects by branch
	 */
	const [warehouseList, setWarehouseList] = useState<
		Record<string, Warehouse[]>
	>({});

	/**
	 * Branch state variable that holds possible branches to select warehouses from; Must be array of { label: branch, value: branch } objects in order to feed to dropdowns
	 */
	// TODO maybe better to be simple string array, then format data object for dropdowns in dropdown tsx
	const [branches, setBranches] = useState<{ label: string, value: string }[]>(
		[]
	);

	/**
	 * Represents the warehouse(s) that were selected by the account representative
	 */
	const [selectedWarehouses, setSelectedWarehouses] = useState<string[]>([]);

    /**
     * Effect that runs context mount
     * 
     * Calls server; Compiles data; Initializes and sets state variables;
     * All via the getAndSetWarehouseData function
     */
    useEffect(() => {
        (async () => {
            // Initialize context state
            await getAndSetWarehouseData();
        })();
    }, []);

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
		branches: { label: string; value: string }[];
		groupedWarehouses: Record<string, Warehouse[]>;
	} => {
		// Separate branch id of each warehouse pulled
		const branchArray = [
			...new Set(warehouses.map((warehouse) => warehouse.BranchWhseID)),
		];

		const branches = branchArray.map((branch) => ({
			label: branch,
			value: branch,
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
     * Initializes the warehouse data by: 
     * 1. Fetching the warehouse data from the get warehouses endpoint
     * 2. Creates an array of branches
     * 3. Creates an array of arrays of the warehouses with the warehouse id as the array index
     * 4. Sets the context branch and warehouse list state variables
     * 
     * @returns void
     */
	const getAndSetWarehouseData = async () => {
		try {
			// Fetch warehouses from server as Warehouse[]
			const warehouses = await getWarehouseList();

			// Compile raw warehouse data into branches and grouped warehouses
			const compileData = separateBranchesAndGroup(warehouses);

            // Set branch and warehouse list state
            setBranches(compileData.branches);
            setWarehouseList(compileData.groupedWarehouses);
		} catch (error) {
			throw error;
		}
	};

	return (
		<SurveyContext.Provider value={{ warehouseList, branches, selectedWarehouses, setSelectedWarehouses }}>{children}</SurveyContext.Provider>
	);
}

/**
 * Survey context hook; Allows components to 'hook' into the survey global state and update/read global variables using globally available functions
 * 
 * @returns Exposed survey context variables and functions
 * @throws Error if the useSurvey() hook is used outside of the SurveyContext.Provider tags that wrap the components that will comsume the survey context
 */
export const useSurvey = (): SurveyContextInterface => {
    const context = useContext(SurveyContext);

    if (!context) {
        throw new Error('useSurvey must be used within a SurveyProvider');
    }

    return context;
}