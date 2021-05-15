import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Panel from './PanelDropDown'

// Component to display test feedback. 
// Takes a JSON object, string and function as parameters.
export default function TestFeedback({ data, display }) {


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
    function generateText(string, header) {
        try {
            string = string.split('/')
            if (header) {
                if (string[1].split(' ').pop() === string[2].split(' ').pop()) {
                    return 'correct. Well done!';
                } else {
                    return 'incorrect. Keep trying!'
                }
            } else {
            string = string[0] + '\n' + 'You put: ' + string[1] + '\n' + 'Correct ans: ' + string[2];
            return string;
            }
        } catch (e) { }
    };

    const styles = StyleSheet.create({
        container: {
            display: display,
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'white'
        },
        topTextContainer: {
            width: '100%',
            height: '20%',
            backgroundColor: '#3D3BBB'
        },
        text: {
            marginTop: 15,
            textAlign: 'center',
            fontFamily: 'Verdana',
            color: 'white'
        }
    });  

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topTextContainer}>
                <Text style={styles.text}>{'You scored 60%, well done. Keep practicing your mistakes.'}</Text>
            </View>
        <Panel header={'Question 1 was ' + generateText(data[0], true)} text={generateText(data[0])} display={display}></Panel>
        <Panel header={'Question 2 was ' + generateText(data[1], true)} text={generateText(data[1])} display={display}></Panel>
        <Panel header={'Question 3 was ' + generateText(data[2], true)} text={generateText(data[2])} display={display}></Panel>
        <Panel header={'Question 4 was ' + generateText(data[3], true)} text={generateText(data[3])} display={display}></Panel>
        <Panel header={'Question 5 was ' + generateText(data[4], true)} text={generateText(data[4])} display={display}></Panel>
        <Panel header={'Question 6 was ' + generateText(data[5], true)} text={generateText(data[5])} display={display}></Panel>
        <Panel header={'Question 7 was ' + generateText(data[6], true)} text={generateText(data[6])} display={display}></Panel>
        <Panel header={'Question 8 was ' + generateText(data[7], true)} text={generateText(data[7])} display={display}></Panel>
        <Panel header={'Question 9 was ' + generateText(data[8], true)} text={generateText(data[8])} display={display}></Panel>
        <Panel header={'Question 10 was ' + generateText(data[9], true)} text={generateText(data[9])} display={display}></Panel>
        </ScrollView>
    )
}

