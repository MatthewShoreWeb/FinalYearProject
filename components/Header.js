import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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
        height: '8%',
        width: '100%',
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