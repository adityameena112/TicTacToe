import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { useDimensions } from '@react-native-community/hooks'
import { useDeviceOrientation } from '@react-native-community/hooks';

function Box({ style, selectedBox, onPress, iconSize }) {
    
    const renderIcon = () => {
        if (selectedBox.value == 'X') {
            return <Feather name="x" size={iconSize} color="red" />
        }
        return <Feather name="circle" size={iconSize} color="green" />
    }

    return (
        <TouchableOpacity disabled={selectedBox.value != ''} onPress={() => onPress(selectedBox.id)} style={[styles.container, style]} >
            { selectedBox.value != '' && renderIcon()}
        </TouchableOpacity>   
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.25,
        height: Dimensions.get('window').width * 0.25,
        backgroundColor: 'grey',
        margin: 5,
        borderRadius: Dimensions.get('window').width * 0.05,
    },
    text: {
        fontSize: 25
    }
})

export default Box;