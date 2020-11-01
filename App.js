import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Header from './components/Header';
import CustomButton from './components/CustomButton';
import QuestionButton from './components/QuestionButton';

export default function App() {
  // State changes.
  const [header, setHeader] = useState('Home Page');
  const [homeDisplay, changeHomeDisplay] = useState('flex');
  const [questionDisplay, changeQuestionDisplay] = useState('none');


  // When going from the home page to a question page.
  function toQuestionPage(type) {
    setHeader(type);
    changeHomeDisplay('none');
    changeQuestionDisplay('flex');
  };

  // For when the user selects Quizzes.
  const quizHandler = function () {

  };

  // For when the user selects Tests.
  const testsHandler = function () {

  };

  // For when the user selects Stats.
  const statsHandler = function () {

  };

  // For when the user selects About.
  const aboutHandler = function () {

  };

  const testHandler = function () {
    setHeader('Home Page');
    changeHomeDisplay('flex');
    changeQuestionDisplay('none');
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    homeNav: {
      display: homeDisplay
    },
    questionComponent: {
      display: questionDisplay,
      alignItems: 'center',

    },
    aboutComponent: {

    },
    questionText: {
      fontWeight: 'bold',
      fontSize: 25
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly'
    }
  });


  return (
    <View style={styles.container}>
      {/* Header component. */}
      <Header text={header}></Header>

      {/* Default home page component. */}
      <View style={styles.homeNav}>
        <CustomButton text='Quizzes' onPress={quizHandler} />
        <CustomButton text='Tests' onPress={testsHandler} />
        <CustomButton text='Stats' onPress={statsHandler} />
        <CustomButton text='About' onPress={aboutHandler} />
      </View>

      {/* Component for loading questions. TO BE CHANGED...*/}
      <View style={styles.questionComponent}>
        <Text style={styles.questionText}>What is 1,486 + 948?</Text>
        <View style={styles.buttonContainer}>
          <QuestionButton text='2,4342' />
          <QuestionButton text='538' />
          <QuestionButton text='2,436' />
          <QuestionButton text='2,444' />
        </View>
      </View>

      {/* Component for the about section. */}
      <View style={styles.aboutComponent}>
        <Text>Thank you for using our app. This app has several features. 
          You can do a quiz which will contain a random selection of questions to practice. 
          You can also take tests on certain topics to test your knowledge. You can see the results of the tests you do in the statistics page.</Text>
      </View>

    </View>
  );
}
