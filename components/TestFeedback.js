import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Component to display test feedback. 
// Takes a JSON object, string and function as parameters.
export default function TestFeedback({data, display, testCompleteFunction}) {
    function getScore() {
        let correctAns = [];
        for (let index = 0; index < data.questions.length; index++) {
            if (data.questions[index].toLowerCase().includes('correct!')) {
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
        text: {
          fontWeight: 'bold',
          marginLeft: '5%'
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
        <View style={styles.container}>
            <Text style={styles.text}>{topMessage}</Text>
            <Text style={styles.text}>{feedbackText}</Text>
            <View style={styles.button}><Text style={styles.buttonText} onPress={testCompleteFunction}>Complete Test</Text></View>
        </View>
    )
}

