import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import Panel from 'react-native-panel';

export default function NavigationButton({ text, header, textColour, textSize, display }) {

    const styles = StyleSheet.create({
        panelContainer: {
            borderBottomStyle: 'solid',
            borderBottomColor: 'white',
            borderBottomWidth: 3,
            backgroundColor: '#3A41C6',
            height: 10,
            width: '100%'
        },
        panelText: {
            fontFamily: 'Verdana',
            color: 'white',
            fontSize: 12,
            textAlign: 'center',
            padding: 5
        }
    });

    return (

        <Panel
            style={styles.panelContainer}
            header={header}>
            <Text style={styles.panelText}>
                {text}
            </Text>
        </Panel>
    )
}

