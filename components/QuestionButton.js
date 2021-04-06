import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default function QuestionButton({ text, onPress, colour, textColour }) {
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
        borderRadius: 8,
        marginTop: 15,
        backgroundColor: colour,
        width: 95,
        height: 95,
        justifyContent: 'space-evenly',

    },
    buttonText: {
        color: textColour,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }
})