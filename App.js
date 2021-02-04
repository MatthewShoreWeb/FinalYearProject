import React, { useState } from 'react';

// App components import.
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import CustomButton from './components/CustomButton';
import QuizButton from './components/QuizButton';
import DotGraph from './components/DotGraph';

// Questions Test Data
import testQuestions from './questions/testQuestions.json';

export default function App() {
  // State changes for updating components in the app.
  const [header, setHeader] = useState('Home');
  const [homeDisplay, changeHomeDisplay] = useState('flex');
  const [quizMenuDisplay, changeQuizMenuDisplay] = useState('none');
  const [testMenuDisplay, changeTestMenuDisplay] = useState('none');
  const [aboutDisplay, changeAboutDisplay] = useState('none');
  const [multiChoiceQuestions, changeQuestionDisplay] = useState('none');
  const [displayOptions, changeOptionsDisplay] = useState('none');
  const [displayStatistics, changeStatisticsDisplay] = useState('none');

  // Functions for navigation.
  // General function for hiding all elements.
  function hideAll() {
    changeQuizMenuDisplay('none');
    changeTestMenuDisplay('none');
    changeAboutDisplay('none');
    changeQuestionDisplay('none');
    changeHomeDisplay('none');
    changeStatisticsDisplay('none');
  };
  // Return to the home page.
  function backToHome() {
    setHeader('Home');
    hideAll();
    changeHomeDisplay('flex');
  };
  // Go to the menu for quizzes.
  function toQuizMenu() {
    setHeader('Quizzes');
    hideAll();
    changeQuizMenuDisplay('flex');
  };
  // Go to the menu for tests.
  function toTestMenu() {
    setHeader('Tests');
    hideAll();
    changeTestMenuDisplay('flex');
  };
  // Go to the menu for statistics.
  function toStatsMenu() {
    setHeader('Stats');
    hideAll();
    changeStatisticsDisplay('flex');
  };
  // Go to the about page.
  function toAboutPage() {
    setHeader('About');
    hideAll();
    changeAboutDisplay('flex');
  };

  // Works out what page to go to when the back button is pressed.
  function backButtonPressed() {
    if (displayOptions === 'flex') {
      optionsPressed();
    } else {
    switch (header.toLowerCase()) {
      case 'quizzes':
      case 'tests':
      case 'stats':
      case 'about':
        backToHome();
        break;
      case 'maths quiz':
      case 'verbal quiz':
      case 'non-verbal quiz':
        toQuizMenu();
        break;
    };
  }
  };

  // Options functionality - when the user clicks the gear icon in the top right.
  function optionsPressed() {
    if (displayOptions === 'none') {
      hideAll();
      changeOptionsDisplay('flex');
    } else {
      changeOptionsDisplay('none');
      switch (header.toLowerCase()) {
        case 'home':
          backToHome();
          break;
        case 'quizzes':
          toQuizMenu();
          break;
        case 'tests':
          toTestMenu();
          break;
        case 'stats':
          toStatsMenu()
          break;
        case 'about':
          toAboutPage()
          break;
      }
    }
  };

  // Quiz/Test Functionality.
  let loadQuestions = function () {
    // Generates a random key and accesses it from JSON.
    let keys = Object.keys(testQuestions);
    let randomKey = keys[Math.floor(Math.random() * keys.length)]
    return testQuestions[randomKey];
  };

  const [question, changeQuestion] = useState(loadQuestions());

  let [questionCounter, changeCounter] = useState(1);
  let [accuracy, changeAccuracy] = useState(0);
  let [accuracyColour, changeColour] = useState('red');
  let [correct, changeCorrect] = useState(0);
  let [wrong, changeWrong] = useState(0);

  // Calculates the user's accuracy during a quiz.
  function calculateAccuracy() {
    let accuracy;
    if (correct === 0) {
      accuracy = 0;
    } else {
      if (correct - wrong === 0) {
        accuracy = 50;
      }
      else {
        accuracy = parseInt((correct / (correct + wrong + 1) || 1) * 100);
      }
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
    topText: {
      fontWeight: 'bold',
      fontSize: 30
    },
    options: {
      display: displayOptions,
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0,
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
    questionCount: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white',
    },
    correct: {
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'green',
      width: '10%',
      textAlign: 'center',
      fontSize: 20
    },
    wrong: {
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'red',
      width: '10%',
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
      padding: '10dp',
      borderWidth: 3,
      borderColor: "#42adf5",
      borderRadius: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly'
    },
    quizContainer: {
      display: multiChoiceQuestions,
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0
    },
    questionDescription: {
      display: multiChoiceQuestions,
      position: 'absolute',
      top: 40,
      textAlign: 'center'
    },
    testbuttons: {
      display: multiChoiceQuestions,
    },
    multiChoiceQuestions: {
      display: multiChoiceQuestions,
      position: 'absolute',
      bottom: 0
    },
    questionCountHeader: {
      width: '100%',
      height: '5%',
      backgroundColor: '#68bbe3',
      flexDirection: 'row',
      justifyContent: 'space-between',
      display: multiChoiceQuestions,
      position: 'absolute',
      top: 0
    },
    statistics: {
      display: displayStatistics
    }
  });


  return (
    <View style={styles.container}>
      {/* Header component. */}
      <Header text={header} style={styles.header} backButton={backButtonPressed} options={optionsPressed}></Header>

      {/* Options */}
      <View style={styles.options}>
        <Text style={{fontWeight: 'bold'}}>Dark Theme</Text>
        <Text style={{color: 'red', fontWeight: 'bold'}}>Erase Stored Data</Text>
      </View>

      {/* Default home page component. */}
      <View style={styles.homeNav}>
        <Text style={styles.topText}>Select a learning tool...</Text>
        <CustomButton text='Quizzes' onPress={toQuizMenu} />
        <CustomButton text='Tests' onPress={toTestMenu} />
        <CustomButton text='Stats' onPress={toStatsMenu} />
        <CustomButton text='About' onPress={toAboutPage} />
      </View>

      {/* Menu for selecting what quiz you would like to do. */}
      <View style={styles.quizComponent}>
        <Text style={styles.topText}>Select a topic...</Text>
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
      </View>
      <View style={styles.quizContainer}>

        <View style={styles.questionCountHeader}>
          <Text style={styles.correct}> {correct} </Text>
          <Text style={styles.questionCount}> Question {questionCounter}/50</Text>
          <Text style={styles.accuracy}> Accuracy {accuracy}%</Text>
          <Text style={styles.wrong}> {wrong} </Text>
        </View>

        <View style={styles.questionDescription}>
          <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>{question.description}</Text>
        </View>

        <View style={styles.multiChoiceQuestions}>
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
      </View>

      {/* Menu for selecting what test you would like to do. */}
      <View style={styles.testComponent}>
        <Text style={styles.topText}>Select a topic...</Text>
        <CustomButton text='Maths' onPress={function () {

        }}></CustomButton>
        <CustomButton text='Verbal' onPress={function () {

        }}></CustomButton>
        <CustomButton text='Non-Verbal' onPress={function () {

        }}></CustomButton>
      </View>

      {/* Statistics */}
      <View style={styles.statistics}>
        <DotGraph input={[2, 4, 6, 7]}></DotGraph>
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
      </View>
    </View>
  );
}
