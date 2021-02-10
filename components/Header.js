import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';



export default function Header({ text, backButton, options }) { 
    return (
            <View style={styles.header}>
                <Text style={styles.back} onPress={backButton}> ◄</Text>
                <Text style={styles.headerText}>{text}</Text>
                <Text style={styles.back} onPress={options}>⚙ </Text>
            </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        height: '10%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#42adf5',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
    back: {
        color: 'white',
        fontSize: 60,
        fontWeight: 'bold'
    }
})
