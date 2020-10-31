import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default function QuestionButton({ text, onPress }) {
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
        backgroundColor: '#f01d71',
        width: 95,
        height: 95,
        justifyContent: 'space-evenly',

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }
})