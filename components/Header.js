import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

// Viewport width and height.
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function Header({ text }) {
    return (
        <View style={styles.header}>
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
    }
})