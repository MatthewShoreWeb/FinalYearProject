import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default function CustomButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        backgroundColor: '#f01d71',
        height: '100%',
        width: '100vw',
        
    },
    buttonText: {
        color: 'gold',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }
        
})