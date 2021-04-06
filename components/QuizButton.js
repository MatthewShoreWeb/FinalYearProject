import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';


export default function QuizButton({ text, onPress, colour, textColour }) {

    const styles = StyleSheet.create({
        button: {
            justifyContent: 'center',
            backgroundColor: colour,
            height: '20%',
            width: '100%'
        },
        buttonText: {
            color: textColour,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: 16,
            textAlign: 'center'
        }
    });

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View>
                <Text style={styles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

