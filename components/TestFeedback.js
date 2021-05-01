import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Panel from './PanelDropDown'

// Component to display test feedback. 
// Takes a JSON object, string and function as parameters.
export default function TestFeedback({ data, display, testCompleteFunction }) {


    function getScore() {
        let correctAns = [];
        for (let index = 0; index < data.length; index++) {
            if (data[1].toLowerCase().includes('correct!')) {
                correctAns.push('.');
            }
        };
       
        return (correctAns.length / data.questions.length) * 100;
    };

    // Function generates a summary message for the user based on their score.
    function getMessage() {
        try {
            let score = getScore();
            if (score === 100) {
                return 'You scored 100%. Perfect!'
            } else if (score > 80) {
                return 'You scored' + score + '%. Well done!'
            } else if (score > 50) {
                return 'You scored ' + score + '%. Well done!'
            } else {
                return 'You scored ' + score + '%. Keep trying!'
            }
        } catch (e) { }
    };

    let topMessage = getMessage();

    // Generates text for each question based on the input.
    function generateText() {
        try {
            let text = '';
            for (let index = 0; index < data.questions.length; index++) {
                text = text + data.questions[index] + '\n';
            };
            return text;
        } catch (e) { }
    };

    let feedbackText = generateText();

    const styles = StyleSheet.create({
        container: {
            display: display,
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'white'
        },
        button: {
            width: 150,
            height: 50,
            backgroundColor: 'yellow',
            margin: 'auto'
        },
        buttonText: {
            margin: 'auto'
        }
    });  

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topTextContainer}>
                <Text>{topMessage}</Text>
            </View>
        <Panel header={'Question 1'} text={data[0]} display={display}></Panel>
        <Panel header={'Question 2'} text={data[1]} display={display}></Panel>
        <Panel header={'Question 3'} text={data[2]} display={display}></Panel>
        <Panel header={'Question 4'} text={data[3]} display={display}></Panel>
        </ScrollView>
    )
}

