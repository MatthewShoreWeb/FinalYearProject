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
        height: '12.5%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#667894',
        justifyContent: 'center'

    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    }
})