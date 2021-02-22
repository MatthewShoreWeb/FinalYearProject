import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';


export default function Popup({ text, yesPress, noPress, display }) {

    const styles = StyleSheet.create({
        container: {
            width: '50%',
            height: '25%',
            backgroundColor: 'red',
            display: display
        },
        button: {
            width: '20%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
            borderColor: 'black',
            borderStyle: 'solid'
        },
        text: {
            fontWeight: 'bold'
        }
    });

    return (
        <TouchableOpacity style={styles.container}>
            <Text>{text}</Text>
            <View style={styles.button} onPress={yesPress}>
                <Text style={styles.text}>Yes</Text>
            </View>
            <View style={styles.button} onPress={noPress}>
                <Text style={styles.text}>No</Text>
            </View>
        </TouchableOpacity>
    )
}

