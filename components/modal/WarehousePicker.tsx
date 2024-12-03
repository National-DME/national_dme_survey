import { View, Text, Modal, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import useGlobalStyles from '../../styles/globalStyles';
import { theme } from '../../styles/theme';
import { WarehouseSelection } from '../../app/(protected)/(home)';
import { useSurvey } from '../../context/SurveyContext';
import { Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../generic/Button';

export interface WarehousePickerProps {
    branch: string;
    visible: boolean;
    warehouses: WarehouseSelection[];
    onClose: () => void;
    handleSelectWarehouse: (warehouseId: string) => void;
}

export default function WarehousePicker(props: WarehousePickerProps) {
    const globalStyles = useGlobalStyles();
    const { selectedWarehouses } = useSurvey();

    const [keyword, setKeyword] = useState<string>('');
    const [filteredSelection, setFilteredSelection] = useState<WarehouseSelection[]>(props.warehouses);

    useEffect(() => {
        if (!keyword){
            setFilteredSelection(props.warehouses);
            return;
        } 
    
        const newResultSet = props.warehouses.filter((warehouse) => {
            return warehouse.label && warehouse.label.trim().toLowerCase().includes(keyword.trim().toLowerCase());
        });
        setFilteredSelection(newResultSet);
    }, [keyword, props.warehouses]);

	return (
		<Modal
            animationType='fade'
            transparent={true}
            onRequestClose={props.onClose}
            visible={props.visible}>
            <View style={globalStyles.modalContainer}>
                <View style={[
                    globalStyles.generalModalView,
                    globalStyles.baseModalView
                ]}>
                    <Text style={globalStyles.modalTitle}>Select Warehouse(s)</Text>
                    <Text style={globalStyles.modalSubtitle}>{props.branch}</Text>
                    <View style={{
                        maxHeight: '20%'
                    }}>
                        <ScrollView 
                            contentContainerStyle={globalStyles.chipContainer}
                            keyboardShouldPersistTaps='handled'>
                            {selectedWarehouses.map((warehouse) => (
                                <Chip 
                                    key={warehouse}
                                    style={globalStyles.chip}
                                    textStyle={globalStyles.chipContent}
                                    icon={() => (
                                        <MaterialCommunityIcons 
                                            name='close'
                                            size={20}
                                            color={theme.text.toString()}  
                                        />
                                    )}
                                    onPress={() => props.handleSelectWarehouse(warehouse)}>
                                    {warehouse}
                                </Chip>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <TextInput 
                            value={keyword}
                            placeholder='Search warehouse(s)'
                            placeholderTextColor={theme.border.toString()}
                            style={globalStyles.textInput}
                            onChangeText={setKeyword}
                        />
                    </View>
                    <ScrollView 
                    contentContainerStyle={globalStyles.dropdownContainer}
                    keyboardShouldPersistTaps='handled'
                    >
                        {filteredSelection.length > 0 ? (
                            filteredSelection.map((warehouse) => (
                                <Pressable
                                key={warehouse.value} 
                                style={[
                                    globalStyles.dropdownContentContainer,
                                    selectedWarehouses.includes(warehouse.value) && globalStyles.dropdownContainerSelected
                                ]}
                                onPress={() => props.handleSelectWarehouse(warehouse.value)}>
                                    <Text style={globalStyles.dropdownContent}>
                                        {warehouse.label}
                                    </Text>
                                    <Text style={globalStyles.dropdownContentSubtitle}>
                                        {warehouse.value}
                                    </Text>
                                </Pressable>
                            ))
                        ) : (
                            <Text style={globalStyles.dropdownMessageContent}>
                                No data found for {keyword}
                            </Text>
                        )}
                    </ScrollView>
                    <Button 
                        title={`Select ${selectedWarehouses.length} warehouse${selectedWarehouses.length === 1 ? '' : 's'}`}
                        onPress={props.onClose}
                        buttonStyle={globalStyles.buttonSecondary}
                    />
                </View>
            </View>
        </Modal>
	);
}
