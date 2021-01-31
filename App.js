import React, { useState } from 'react';

// App components import.
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import CustomButton from './components/CustomButton';
import BackButton from './components/BackButton';
import QuizButton from './components/QuizButton';

// Questions Test
import testQuestions from './questions/testQuestions.json';

export default function App() {
  // State changes for updating components in the app.
  const [header, setHeader] = useState('Home');
  const [homeDisplay, changeHomeDisplay] = useState('flex');
  const [quizMenuDisplay, changeQuizMenuDisplay] = useState('none');
  const [testMenuDisplay, changeTestMenuDisplay] = useState('none');
  const [aboutDisplay, changeAboutDisplay] = useState('none');
  const [multiChoiceQuestions, changeQuestionDisplay] = useState('none');

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

  //Quiz/Test Functionality

  let loadQuestions = function () {
    // Generates a random key and accesses it from JSON.
    let keys = Object.keys(testQuestions);
    return testQuestions[keys[Math.floor(Math.random() * keys.length)]];
  };

  const [question, changeQuestion] = useState(loadQuestions());

  let [questionCounter, changeCounter] = useState(1);
  let [accuracy, changeAccuracy] = useState(0);
  let [accuracyColour, changeColour] = useState('red');
  let [correct, changeCorrect] = useState(0);
  let [wrong, changeWrong] = useState(0);

  function calculateAccuracy() {
    let accuracy
    if (correct - wrong === 0) {
      accuracy = 50;

    } else {
      accuracy = parseInt((correct / (correct + wrong) || 1) * 100);
    }

    if (accuracy > 100) {
      accuracy = 100;
    } else if (accuracy < 0) {
      accuracy = 0;
    }

    if (accuracy > 70) {
      changeColour('green');
    } else if (accuracy > 40) {
      changeColour('orange');
    } else {
      changeColour('red');
    }

    return accuracy;
  }

  function checkAnswer(question, answer) {
    if (question.correct === answer) {
      changeCorrect(correct + 1);
      changeCounter(questionCounter + 1);
      changeQuestion(loadQuestions());
    } else {
      changeWrong(wrong + 1);
    }
    changeAccuracy(calculateAccuracy());
    return question.correct === answer;
  }

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
    questionCountHeader: {
      width: '100vw',
      height: '5vh',
      backgroundColor: '#68bbe3',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    questionCount: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white',
    },
    correct: {
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'green',
      width: '10vw',
      textAlign: 'center',
      fontSize: 20
    },
    wrong: {
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'red',
      width: '10vw',
      textAlign: 'center',
      fontSize: 20
    },
    accuracy: {
      color: accuracyColour,
      fontWeight: 'bold',
      fontSize: 20
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
    },
    multiChoiceQuestions: {
      display: multiChoiceQuestions,
      top: '10vh',
      height: '100vh'
    },
    testbuttons: {
      position: 'absolute',
      bottom: '10vh'
    }
  });


  return (
    <View style={styles.container}>
      {/* Header component. */}
      <Header text={header} style={styles.header}></Header>

      {/* Default home page component. */}
      <View style={styles.homeNav}>
        <CustomButton text='Quizzes' onPress={quizHandler} />
        <CustomButton text='Tests' onPress={testsHandler} />
        <CustomButton text='Stats' onPress={statsHandler} />
        <CustomButton text='About' onPress={aboutHandler} />
      </View>

      {/* Menu for selecting what quiz you would like to do. */}
      <View style={styles.quizComponent}>
        <CustomButton text='Maths' onPress={function () {
          setHeader('Maths Quiz');
          changeQuizMenuDisplay('none');
          changeQuestionDisplay('flex');
        }}></CustomButton>
        <CustomButton text='Verbal' onPress={function () {
          setHeader('Verbal Quiz');
        }}></CustomButton>
        <CustomButton text='Non-Verbal' onPress={function () {
          setHeader('Non-Verbal Quiz');
        }}></CustomButton>
        <BackButton style={styles.backButton} onPress={function () {
          changeHomeDisplay('flex');
          changeQuizMenuDisplay('none');
          setHeader('Home');
        }}></BackButton>
      </View>

      <View style={styles.multiChoiceQuestions}>
        <View style={styles.questionCountHeader}>
          <Text style={styles.correct}> {correct} </Text>
          <Text style={styles.questionCount}> Question {questionCounter}/50</Text>
          <Text style={styles.accuracy}> Accuracy {accuracy}%</Text>
          <Text style={styles.wrong}> {wrong} </Text>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>{question.description}</Text>
        <View style={styles.testbuttons}>
          <QuizButton text={'A)  ' + question.A} onPress={function () {
            checkAnswer(question, 'A');
          }}></QuizButton>
          <QuizButton text={'B)  ' + question.B} onPress={function () {
            checkAnswer(question, 'B');
          }}></QuizButton>
          <QuizButton text={'C)  ' + question.C} onPress={function () {
            checkAnswer(question, 'C');
          }}></QuizButton>
          <QuizButton text={'D)  ' + question.D} onPress={function () {
            checkAnswer(question, 'D',);
          }}></QuizButton>
          <QuizButton text={'E)  ' + question.E} onPress={function () {
            checkAnswer(question, 'E',);
          }}></QuizButton>
        </View>
      </View>

      {/* Menu for selecting what test you would like to do. */}
      <View style={styles.testComponent}>
        <CustomButton text='Maths' onPress={function () {

        }}></CustomButton>
        <CustomButton text='Verbal' onPress={function () {

        }}></CustomButton>
        <CustomButton text='Non-Verbal' onPress={function () {

        }}></CustomButton>
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
