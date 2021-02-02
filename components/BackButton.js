import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';

// Viewport width and height.
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

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
        marginTop: vh * 0.05,
        height: '80px',
        width: vw * 0.3,
        borderRadius: 100,
        marginHorizontal: 'auto'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 32,
        textAlign: 'center'
    }
        
})