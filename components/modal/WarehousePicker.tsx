import { View, Text, Modal, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { theme } from '../../styles/theme';
import { WarehouseSelection } from '../../app/(protected)/(home)';
import { ScrollView } from 'react-native-gesture-handler';

export interface WarehousePickerProps {
    branch: string;
    warehouses: WarehouseSelection[]
}

export default function WarehousePicker(props: WarehousePickerProps) {
    const globalStyles = useGlobalStyles();

    const [keyword, setKeyword] = useState<string>('');
    const [filteredSelection, setFilteredSelection] = useState<WarehouseSelection[]>(props.warehouses);

    useEffect(() => {
        if (!keyword){
            setFilteredSelection(props.warehouses);
            return;
        } 
    
        const newResultSet = props.warehouses.filter((warehouse) => {
            return warehouse.label && warehouse.label.toLowerCase().includes(keyword.toLowerCase());
        });
        setFilteredSelection(newResultSet);
    }, [keyword, props.warehouses]);

	return (
		<Modal
            animationType='fade'
            transparent={true}
            visible={true}>
            <View style={globalStyles.modalContainer}>
                <View style={[
                    globalStyles.generalModalView,
                    globalStyles.baseModalView
                ]}>
                    <Text style={globalStyles.modalTitle}>Select Warehouse(s)</Text>
                    <Text style={globalStyles.modalSubtitle}>{props.branch}</Text>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <TextInput 
                            placeholder='Search warehouse(s)'
                            placeholderTextColor={theme.border.toString()}
                            style={globalStyles.textInput}
                            onChangeText={setKeyword}
                        />
                    </View>
                    <ScrollView contentContainerStyle={globalStyles.dropdownContainer}>
                        {filteredSelection.length > 0 ? (
                            filteredSelection.map((warehouse) => (
                                <View key={warehouse.value} style={globalStyles.dropdownContentContainer}>
                                    <Text style={globalStyles.dropdownContent}>
                                        {warehouse.label}
                                    </Text>
                                    <Text style={globalStyles.dropdownContentSubtitle}>
                                        {warehouse.value}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <Text style={globalStyles.dropdownMessageContent}>
                                No data found for {keyword}
                            </Text>
                        )}
                    </ScrollView>
                </View>
            </View>
        </Modal>
	);
}
