import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from './components/CustomButton'

export default function CustomButton({ question, answers, correctIndex }) {
    return (
            <View style={styles.button}>
                <Text style={styles.questionText}>{ question }</Text>
                <CustomButton text='A'/>
                <CustomButton text='B'/>
                <CustomButton text='C'/>
                <CustomButton text='D'/>
                <CustomButton text='E'/>
            </View>
    )
}

const styles = StyleSheet.create({
   questionText: {
       fontWeight: 'bold'
   }
})