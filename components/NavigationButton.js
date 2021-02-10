import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default function NavigationButton({ text, onPress, colour }) {


    const styles = StyleSheet.create({
        button: {
            justifyContent: 'center',
            backgroundColor: colour,
            height: '25%',
            width: '100%',
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: 20,
            textAlign: 'center'
        },
        explainText: {
    
        }
    });
    
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View>
                <Text style={styles.buttonText}>{text}</Text>
                <Text style={styles.explainText}></Text>
            </View>
        </TouchableOpacity>
    )
}

