import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';


export default function Popup({ text, yesPress, noPress, display, colourArray, textColour }) {

    let yes = 'Yes';
    let noDisplay = 'flex';
    if (text.includes('Mistakes')) {
        yes = 'Ok';
        noDisplay = 'none';
    }

    const styles = StyleSheet.create({
        container: {
            margin: 'auto',
            width: '70%',
            height: '20%',
            backgroundColor: colourArray[0],
            display: display,
            borderStyle: 'solid',
            borderWidth: 3,
            borderColor: 'black',
            zIndex: 999,
            borderRadius: 10
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        },
        button: {
            width: '20%',
            backgroundColor: colourArray[3],
            borderRadius: 40
        },
        text: {
            fontFamily: 'Verdana',
            color: textColour,
            padding: 10,
            textAlign: 'center'
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={yesPress}>
                    <Text style={styles.text}>{yes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                      width: '20%',
                      backgroundColor: colourArray[3],
                      display: noDisplay,
                      borderRadius: 40,
                }} onPress={noPress}>
                    <Text style={styles.text}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

