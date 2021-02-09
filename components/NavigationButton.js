import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';

// Viewport width and height.
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function NavigationButton({ text, onPress }) {


    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        backgroundColor: '#42adf5',
        marginTop: vh * 0.05,
        height: vh * 0.1,
        width: vw * 0.8,
        borderRadius: 50
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }
});