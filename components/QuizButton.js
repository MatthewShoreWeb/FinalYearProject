import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';


export default function QuizButton({ text, onPress, colour, textColour, textSize }) {

    const styles = StyleSheet.create({
        button: {
            justifyContent: 'center',
            backgroundColor: colour,
            height: '20%',
            width: '100%'
        },
        buttonText: {
            color: textColour,  
            textTransform: 'uppercase',
            fontSize: 16 * textSize,
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

