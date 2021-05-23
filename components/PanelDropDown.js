import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Panel from 'react-native-panel';

export default function NavigationButton({ text, header, colour, textColour }) {

    const styles = StyleSheet.create({
        panelContainer: {
            borderTopStyle: 'solid',
            borderTopColor: 'white',
            borderTopWidth: 1.5,
            backgroundColor: colour,
            height: 45,
            width: '100%',
            color: textColour
        },
        panelText: {
            fontFamily: 'Verdana',
            color: textColour,
            fontSize: 12,
            textAlign: 'center',
            padding: 5
        },
        panelTitle: {
            fontFamily: 'Verdana',
            color: textColour,
            fontSize: 12,
            margin: 'auto',
            padding: 5
        }
    });

    return (

        <Panel
            style={styles.panelContainer}
            header={function () {
                return <View style={styles.panelContainer}><Text style={styles.panelTitle}>{header}</Text></View>
            }}>
            <Text style={styles.panelText}>
                {text}
            </Text>
        </Panel>
    )
}

