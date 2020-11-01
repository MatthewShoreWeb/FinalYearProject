import React, { useState } from 'react';

// App components import.
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import CustomButton from './components/CustomButton';
import BackButton from './components/BackButton';

export default function App() {
  // State changes for updating components in the app.
  const [header, setHeader] = useState('Home');
  const [homeDisplay, changeHomeDisplay] = useState('flex');
  const [quizMenuDisplay, changeQuizMenuDisplay] = useState('none');
  const [testMenuDisplay, changeTestMenuDisplay] = useState('none');
  const [aboutDisplay, changeAboutDisplay] = useState('none');

  // For when the user selects Quizzes.
  const quizHandler = function () {
    changeHomeDisplay('none');
    changeQuizMenuDisplay('flex');
    setHeader('Quizzes');
  };

  // For when the user selects Tests.
  const testsHandler = function () {
    changeHomeDisplay('none');
    changeTestMenuDisplay('flex');
    setHeader('Tests');
  };

  // For when the user selects Stats.
  const statsHandler = function () {
    setHeader('Stats');
  };

  // For when the user selects About.
  const aboutHandler = function () {
    changeHomeDisplay('none');
    changeAboutDisplay('flex');
    setHeader('About');
  };

  const styles = StyleSheet.create({
    container: {
      fontFamily: 'openSans',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    homeNav: {
      display: homeDisplay
    },
    quizComponent: {
      display: quizMenuDisplay
    },
    testComponent: {
      display: testMenuDisplay
    },
    aboutComponent: {
      fontFamily: 'openSans',
      display: aboutDisplay,
      margin: '20%',
      fontSize: 20
    },
    aboutText: {
      padding: '10px',
      borderWidth: 3,
      borderColor: "#42adf5",
      borderRadius: 10,
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

      {/* Menu for selecting what quiz you would like to do. */}
      <View style={styles.quizComponent}>
        <CustomButton text='Maths'></CustomButton>
        <CustomButton text='Verbal'></CustomButton>
        <CustomButton text='Non-Verbal'></CustomButton>
        <BackButton style={styles.backButton} onPress={function () {
          changeHomeDisplay('flex');
          changeQuizMenuDisplay('none');
          setHeader('Home');
        }}></BackButton>
      </View>

        {/* Menu for selecting what test you would like to do. */}
        <View style={styles.testComponent}>
        <CustomButton text='Maths'></CustomButton>
        <CustomButton text='Verbal'></CustomButton>
        <CustomButton text='Non-Verbal'></CustomButton>
        <BackButton style={styles.backButton} onPress={function () {
          changeHomeDisplay('flex');
          changeTestMenuDisplay('none');
          setHeader('Home');
        }}></BackButton>
      </View>

      {/* Component for the about section. */}
      {/* 'u2002' is the code for a bullet point, it is required to form an unordered list. */}
      <View style={styles.aboutComponent}>
        <Text style={styles.aboutText}>
          Thank you for using our app. This app has several features you can use: {'\n'}
          <Text>{'\u2022'} You can do a quiz which will contain a random selection of questions to practice.</Text> {'\n'}
          <Text>{'\u2022'} You can also take tests on certain topics to test your knowledge. </Text> {'\n'}
          <Text>{'\u2022'} You can see the results of the tests you do in the statistics page. </Text> {'\n'}
        </Text>
        <BackButton style={styles.backButton} onPress={function () {
          changeHomeDisplay('flex');
          changeAboutDisplay('none');
          setHeader('Home');
        }}></BackButton>
      </View>

    </View>
  );
}
