import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';


export default function Popup({ text, yesPress, noPress }) {

    const styles = StyleSheet.create({
        container: {
            width: '50%',
            height: '50%',
            backgroundColor: 'white'
        },
        button: {

        }
    });

    return (
        <TouchableOpacity style={styles.container} >
            <Text>{text}</Text>
            <View style={styles.button} onPress={yesPress}>
                <Text>Yes</Text>
            </View>
            <View style={styles.button} onPress={noPress}>
                <Text style={styles.button}>No</Text>
            </View>
        </TouchableOpacity>
    )
}

