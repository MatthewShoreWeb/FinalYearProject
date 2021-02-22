import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';


export default function ColourButton({ onPress, colour }) {

    const styles = StyleSheet.create({
        button: {
            justifyContent: 'center',
            backgroundColor: colour,
            height: '40px',
            width: '40px'
        },
      
    });

    return (
        <TouchableOpacity style={styles.button} onPress={onPress} />
    )
}

