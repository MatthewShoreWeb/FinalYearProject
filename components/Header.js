import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

// Viewport width and height.
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function Header({ text, homeFunction }) {
    return (
        <View style={styles.header} onPress={homeFunction}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fillRule='evenodd'
                clipRule='evenodd'
             style={styles.headerHomeButton}>
                <path d='M22 11.414V24H2V11.414L.707 12.707 0 12 12 0l12 12-.707.707L22 11.414zM16 23h5V10.414l-9-9-9 9V23h5v-9h8v9zm-1-7.889H9v7.778h6v-7.778z'></path>
            </svg>
            <Text style={styles.headerText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        height: vh * 0.1,
        width: vw,
        alignItems: 'center',
        backgroundColor: '#42adf5',
        justifyContent: 'center'

    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
    headerHomeButton: {
       alignItems: 'right'
    }
})
