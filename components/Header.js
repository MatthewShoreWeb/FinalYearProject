
import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

// Viewport width and height.
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function Header({ text, homeFunction, backButton, options }) {
    return (
        <View style={styles.header} onPress={homeFunction}>  
            <Text style={styles.back} onPress={backButton}>◄</Text>
            <Text style={styles.headerText}>{text}</Text>
            <Text style={styles.back} onPress={options}>⚙ </Text>
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
        flexDirection: 'row',
        justifyContent: 'space-evenly'

    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
    back: {
        color: 'white',
        fontSize: 60,
        fontWeight: 'bold',
        flex: 'righ'
    }
})
