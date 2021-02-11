import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default function TestTopicSelector({ text, leftPress, rightPress }) {

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '10%',
            backgroundColor: '#3A41C6',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: '8%'
        },
        text: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: 20
        }
    });
    
    return (
            <View style={styles.container}>
                <TouchableOpacity onPress={leftPress}><Text style={styles.text}>{'⯇'}</Text></TouchableOpacity>
                <Text style={styles.text}>{text}</Text>
                <TouchableOpacity onPress={rightPress}><Text style={styles.text}>{'⯈'}</Text></TouchableOpacity>
            </View>
    )
}

