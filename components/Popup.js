import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';


export default function Popup({ text, yesPress, noPress, display }) {

    const styles = StyleSheet.create({
        container: {
            margin: 'auto',
            width: '70%',
            height: '25%',
            backgroundColor: '#3A41C6',
            display: display,
            borderStyle: 'solid',
            borderWidth: 3,
            borderColor: 'black'
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        },
        button: {
            width: '20%',
            backgroundColor: 'black'
        },
        text: {
            fontWeight: 'bold',
            color: 'white',
            padding: 10
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={yesPress}>
                    <Text style={styles.text}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={noPress}>
                    <Text style={styles.text}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

