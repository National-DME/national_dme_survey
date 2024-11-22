import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from 'react';
import { endpoints } from '../utils/network/endpoints';
import { QuestionInterface, RatingQuestion } from '../components/Question';

/**
 * Exposed functions/state variables of the context
 * 
 * Used by children of the context
 */
export interface SurveyContextInterface {
	warehouseList: Record<string, Warehouse[]>;
	branches: string[];
	selectedWarehouses: string[];
	setSelectedWarehouses: (warehouses: string[]) => void;
	selectedBranch: string;
	setSelectedBranch: (branch: string) => void;
	survey: QuestionInterface[];
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

/**
 * Represents the question object received in the array of questions from server
 */
export interface QuestionCall {
	BranchID: number;
	IsAll: number;
	QuestionDesc: string;
	QuestionKey: number;
	Status: number;
}

/**
 * Represents the department structure
 */
export interface Department {
	DeptKey: number;
	DeptDesc: string;
	Status: number;
}

/**
 * Represents the return type of the separateBranchesAndGroup function
 * 
 * branches is a group of strings
 * 
 * groupedWarehouses is an object with a string key and an array of warehouses as the value
 */
type BranchGroup = {
	branches: string[];
	groupedWarehouses: Record<string, Warehouse[]>;
}

export const SurveyContext = createContext<SurveyContextInterface | null>(null);

export const SurveyContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	/**
	 * Warehouse list state variable represents the compiled_warehouse_groups data in the data-examples folder (ask Thomas (11/21/2024) - gitignore) warehouses grouped into arrays of warehouse objects by branch
	 */
	const [warehouseList, setWarehouseList] = useState<
		Record<string, Warehouse[]>
	>({});

	/**
	 * Branch state variable that holds possible branches to select warehouses from; Must be array of strings
	 */
	const [branches, setBranches] = useState<string[]>([]);

	/**
	 * Selected branch state variable that holds the branch name that the representative selected
	 *
	 * @where Set in the first dropdown of the representative screen
	 */
	const [selectedBranch, setSelectedBranch] = useState<string>('');

	/**
	 * Represents the warehouse(s) that were selected by the account representative
	 */
	const [selectedWarehouses, setSelectedWarehouses] = useState<string[]>([]);

	/**
	 * Represents the questions that the survey will be made out of
	 */
	const [survey, setSurvey] = useState<QuestionInterface[]>([]);

	/**
	 * Represents the different departments that personnel can choose from
	 */
	const [departments, setDepartments] = useState<Department[]>([]);

	/**
	 * Effect that runs context mount
	 *
	 * Calls server; Compiles data; Initializes and sets state variables;
	 * All via the getAndSetWarehouseData function
	 */
	useEffect(() => {
		(async () => {
			// Initialize context state
			await handleWarehouses();
			await handleQuestions();
			await handleDepartments();
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
	 * Initializes the warehouse data by:
	 * 1. Fetching the warehouse data from the get warehouses endpoint
	 * 2. Creates an array of branches
	 * 3. Creates an array of arrays of the warehouses with the warehouse id as the array index
	 * 4. Sets the context branch and warehouse list state variables
	 *
	 * @returns void
	 */
	const handleWarehouses = async () => {
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

	/**
	 * Fetches the list of departments from the server
	 *
	 * This function sends a POST request to the `BASE_URL` with the 'endpointname' field set to `Get_SurveyDepartments` using FormData.
	 * The server responds with a list of warehouses available for selection. The response is parsed as JSON and returned
	 *
	 * @async
	 * @function
	 * @returns {Promise<Department[]>} A promise that resolves to an array of `Department` objects representing the available Departments that the clinical personnel can choose from
	 * @throws {Error} If the fetch request fails or the server returns an invalid response, the error is logged and rethrown.
	 */
	const getDepartments = async (): Promise<Department[]> => {
		try {
			const data = new FormData();
			data.append('endpointname', endpoints.getDepartments);

			const response = await fetch(endpoints.BASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				body: data,
			});

			return (await response.json()) as Department[];
		} catch (error) {
			throw error;
		}
	};

	const handleDepartments = async (): Promise<void> => {
		try {
			const departments = (await getDepartments()) as Department[];
			setDepartments(departments);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	/**
	 * Fetches the list of questions from the server
	 *
	 * This function sends a POST request to the `BASE_URL` with the 'endpointname' field set to `Get_SurveyQuestions`
	 * @returns {Promise<QuestionCall[]>} An array of questions from the API call
	 */
	const getQuestions = async (): Promise<QuestionCall[]> => {
		try {
			const data = new FormData();
			data.append('endpointname', endpoints.getQuestions);

			const response = await fetch(endpoints.BASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				body: data,
			});

			return (await response.json()) as QuestionCall[];
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	/**
	 * Parent function that runs the questions call, compiles the survey and sets the survey state
	 */
	const handleQuestions = async (): Promise<void> => {
		try {
			const questions = (await getQuestions()) as QuestionCall[];
			const compiledSurvey = compileQuestions(questions);
			setSurvey(compiledSurvey);
		} catch (error) {
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
	): BranchGroup => {
		// Separate branch id of each warehouse pulled
		const branches = [
			...new Set(
				warehouses.map((warehouse) => warehouse.BranchWhseID.trim())
			),
		];

		// Reduce the warehouse list to arrays separated by branch
		const groupedWarehouses = warehouses.reduce((accumulator, warehouse) => {
			const branchId = warehouse.BranchWhseID.trim();

			if (!accumulator[branchId]) {
				accumulator[branchId] = [];
			}
			accumulator[branchId].push(warehouse);
			return accumulator;
		}, {} as Record<string, Warehouse[]>);

		return { branches, groupedWarehouses };
	};

	/**
	 * Takes in the `Get_SurveyQuestions` call data and compiles the question data into a form that the survey screen logic can use
	 *
	 * Compiles questions into a usable survey
	 *
	 * @param rawQuestionData Takes in the question data from the server
	 * @returns A survey of questions, compatible with the survey screen that renders the questions
	 */
	const compileQuestions = (
		rawQuestionData: QuestionCall[]
	): QuestionInterface[] => {
		const survey = rawQuestionData.map(
			(question): QuestionInterface => ({
				text: `${question.QuestionDesc}?`,
				type: 'rating',
				key: question.QuestionKey,
			})
		);

		// TODO figure out what to do with the key properties in the questions below

		// Add name question to the top
		const nameQuestion: QuestionInterface = {
			text: 'What is your first and last name?',
			type: 'text',
			key: 0,
			placeholder: 'Your complete name',
		};

		const departmentQuestion: QuestionInterface = {
			text: 'What department / position do you belong do?',
			type: 'radio list',
			key: 0,
			answers: departments.map((department) => department.DeptDesc),
		};

		// Add comments question to the bottom
		const commentQuestion: QuestionInterface = {
			text: 'Do you have any additional comments?',
			type: 'text',
			key: 0,
			placeholder: 'Comments',
		};

		// Returning a complete survey
		return [nameQuestion, departmentQuestion, ...survey, commentQuestion];
	};

	return (
		<SurveyContext.Provider
			value={{
				warehouseList,
				branches,
				selectedWarehouses,
				setSelectedWarehouses,
				selectedBranch,
				setSelectedBranch,
				survey,
			}}>
			{children}
		</SurveyContext.Provider>
	);
};

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
};
