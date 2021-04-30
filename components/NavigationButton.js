import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default function NavigationButton({ text, explainText, onPress, colour, previousScore, textColour }) {

    const styles = StyleSheet.create({
        button: {
            justifyContent: 'center',
            backgroundColor: colour,
            height: '25%',
            width: '100%',
        },
        buttonText: {
            color: textColour,
            textTransform: 'uppercase',
            fontSize: 20,
            textAlign: 'center',
            fontFamily: 'Verdana'
        },
        explainText: {
            color: textColour,
            fontSize: 12,
            textAlign: 'center'
        }
    });
    
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View>
                <Text style={styles.buttonText}>{text}</Text>
                <Text style={styles.explainText}>{explainText}</Text>
                <Text>{previousScore}</Text>
            </View>
        </TouchableOpacity>
    )
}

