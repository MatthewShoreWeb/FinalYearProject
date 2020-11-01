import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default function BackButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{ 'Back' }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        backgroundColor: '#42adf5',
        marginTop: vh(1),
        height: '80px',
        width: vw(80),
        borderRadius: 100,
        marginHorizontal: 'auto'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }
        
})