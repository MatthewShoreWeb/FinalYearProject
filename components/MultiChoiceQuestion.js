import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from './CustomButton'

export default function MultiChoiceQuestion({ question, A, B, C, D, correctIndex, onPress}) {
    return (
            <View style={styles.button}>
                <Text style={styles.questionText}>{ question }</Text>
                <CustomButton text={'A) ' + A} onPress={onPress}/>
                <CustomButton text={'B) ' + B} onPress={onPress}/>
                <CustomButton text={'C) ' + C} onPress={onPress}/>
                <CustomButton text={'D) ' + C} onPress={onPress}/> 
            </View>
    )
}

const styles = StyleSheet.create({
   questionText: {
       fontWeight: 'bold'
   }
})