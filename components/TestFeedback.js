import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Component to display test feedback. 
// Takes a JSON object as a parameter.
export default function TestFeedback({data, display, testCompleteFunction}) {

    function getMessage() {
        try {
            if (data.score === 100) {
                return 'You scored 100%. Perfect!'
            } else if (data.score > 80) {
                return 'You scored' + data.score + '%. Well done!'
            } else if (data.score > 50) {
                return 'You scored ' + data.score + '%. Well done!'
            } else {
                return 'You scored ' + data.score + '%. Keep trying!'
            }
        } catch (e) { }
    };

    let topMessage = getMessage();

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

