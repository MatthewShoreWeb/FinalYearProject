import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
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
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    homeNav: {
      display: homeDisplay,
      width: '100vw',
      height: '100vh',
      marginTop: 160,
      backgroundColor: 'blue'
    },
    questionComponent: {
      display: questionDisplay,
      alignItems: 'center',
      
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
        <CustomButton text='About' onPress={aboutHandler}/>
      </View>

      {/* Component for loading questions. */}
      <View style={styles.questionComponent}>
        <Text style={styles.questionText}>What is 1,486 + 948?</Text>
        <View style={styles.buttonContainer}>
          <QuestionButton text='2,4342' />
          <QuestionButton text='538' />
          <QuestionButton text='2,436' />
          <QuestionButton text='2,444' />
        </View>
        
      </View>
    </View>
  );
}
