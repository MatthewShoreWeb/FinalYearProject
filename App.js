// Todo:
// Test functionality - timer.
// Options functionality - change text size
// Progress tracker improvements.
// Improve code quality and file structure.
// Test resets
// Reformat stylesheets.
// Remove animated splash packagejson
// quiz accuracy

import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

// App components import.
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import NavigationButton from './components/NavigationButton';
import QuizButton from './components/QuizButton';
import SubHeadingSelector from './components/SubHeadingSelector';
import Popup from './components/Popup';
import ColourButton from './components/ColourSchemeButton';
import TestFeedback from './components/TestFeedback';

import lastTestScores from './storage/lastTestScores.json';

import {
  LineChart,
  BarChart
} from "react-native-chart-kit";

// Questions Test Data
import mathsQuiz from './questions/mathsQuiz.json';
import verbalQuiz from './questions/verbalQuiz.json';

import mathTest1 from './questions/tests/mathsTest_1.json';
import mathTest2 from './questions/tests/mathsTest_2.json';

// Change to storage.
let tempRecord = [];
let questionsToGet = '';
let testQuestionNumber = -1;


export default function App() {
  // DISPLAY STATES.
  // State changes for updating components in the app.
  const [header, setHeader] = useState('Home');
  const [splashDisplay, changeSplashDisplay] = useState('flex');
  const [homeDisplay, changeHomeDisplay] = useState('flex');
  const [quizMenuDisplay, changeQuizMenuDisplay] = useState('none');
  const [testMenuDisplay, changeTestMenuDisplay] = useState('none');
  const [aboutDisplay, changeAboutDisplay] = useState('none');
  const [multiChoiceQuestions, changeQuestionDisplay] = useState('none');
  const [displayOptions, changeOptionsDisplay] = useState('none');
  const [displayStatistics, changeStatisticsDisplay] = useState('none');
  const [displayTest, changeTestDisplay] = useState('none');

  const [textSize, changeTextSize] = useState(1);

  useEffect(function () {
    try {
      switch (header.toLowerCase()) {
        case 'maths quiz':
          questionsToGet = 'mathsQuiz';
          break;
        case 'verbal quiz':
          questionsToGet = 'verbalQuiz';
          break;
      }
    } catch (e) { }
  }, [header]);

  //STORAGE.
  // Saves the new style preference to asynchronous storage.
  async function setStylePreferences(inputStyleObject) {
    try {
      let jsonObject = JSON.stringify(inputStyleObject);
      await AsyncStorage.setItem('style', jsonObject);
    } catch (e) { }
  };

  // Retrieves the style preferences from the asynchronous storage.
  const getStylePreferences = async () => {
    try {
      const value = await AsyncStorage.getItem('style');
      if (value !== null) {
        return value;
      }
    } catch (e) { }
  };

  const [colourObject, updateColourObject] = useState({});
  const [colourScheme, updateColourScheme] = useState([]);

  (async function () {
    updateColourObject(await getStylePreferences());
  })()

  useEffect(() => {
    if (typeof colourObject === 'string') {
      let jsonObject = JSON.parse(colourObject);
      updateColourScheme(jsonObject[0].styles);
    }
  }, [colourObject]);

  const [navigationText, updateNavigationText] = useState('white');
  // Updates the stored value for text preferences.
  async function setTextStorage(textColour) {
    try {
      await AsyncStorage.setItem('text', textColour);
    } catch (e) { }
  };

  // Retrieves the text preferences from the asynchronous storage.
  const getTextPreferences = async () => {
    try {
      const value = await AsyncStorage.getItem('text');
      if (value !== null) {
        return value;
      }
    } catch (e) { }
  };

  (async function () {
    updateNavigationText(await getTextPreferences());
  })()

  //Progress tracker storage
  // Saves the new style preference to asynchronous storage.
  async function setTests(testsObject) {
    try {
      let jsonObject = JSON.stringify(testsObject);
      await AsyncStorage.setItem('previousTests', jsonObject);
    } catch (e) { }
  };

  //   setTests( [{
  //     "mathsScores": [
  //       10,
  //       90,
  //       10,
  //       90
  //   ],
  //   "verbalScores": [
  //       76,
  //       59,
  //       78,
  //       60
  //   ],
  //   "nonVerbalScores": [
  //       100,
  //       90,
  //       80,
  //       70
  //   ]
  // }])

  const [chartData, changeChartData] = useState({});
  const [testStore, changeTestData] = useState([]);

  const getPreviousTests = async () => {
    try {
      const value = await AsyncStorage.getItem('previousTests');
      if (value !== null) {
        return value;
      }

    } catch (e) { }
  };

  (async function () {
    changeChartData(await getPreviousTests());
  })()

  useEffect(() => {
    if (typeof chartData === 'string') {
      let jsonObject = JSON.parse(chartData);
      changeTestData(jsonObject[0].mathsScores);
    }
  }, [chartData]);

  // SPASH FUNCTIONALITY
  const fadeAnim = useRef(new Animated.Value(1)).current;
  let splashTime = 1;

  // Will change fadeAnim value to 0 in 3 seconds
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: splashTime
  }).start();

  setTimeout(function () {
    changeSplashDisplay('none');
  }, splashTime);


  // NAVIGATION FUNCTIONALITY.

  // General function for hiding all elements.
  function hideAll() {
    changeQuizMenuDisplay('none');
    changeTestMenuDisplay('none');
    changeAboutDisplay('none');
    changeQuestionDisplay('none');
    changeHomeDisplay('none');
    changeStatisticsDisplay('none');
    changeTestDisplay('none');
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
    setHeader('Progress Tracker');
    hideAll();
    changeStatisticsDisplay('flex');
  };
  // Go to the about page.
  function toAboutPage() {
    setHeader('About');
    hideAll();
    changeAboutDisplay('flex');
  };

  function toTests(testHeader) {
    setHeader(testHeader);
    hideAll();
    changeTestDisplay('flex');
    testStarted();
  };

  // Works out what page to go to when the back button is pressed.
  function backButtonPressed() {
    try {
      if (displayOptions === 'flex') {
        optionsPressed();
      } else if (header.includes(' Test ')) {
        changeBackPopup('flex');
      } else {
        switch (header.toLowerCase()) {
          case 'quizzes':
          case 'tests':
          case 'progress tracker':
          case 'about':
            backToHome();
            break;
          case 'maths quiz':
          case 'verbal quiz':
          case 'non-verbal quiz':
          case 'mistakes':
            toQuizMenu();
            break;
        };
      }
    } catch (e) { }
  };

  // Options functionality - when the user clicks the stack icon in the top right.
  function optionsPressed() {
    try {
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
    } catch (e) { }
  };


  // QUIZ FUNCTIONALITY.

  const [questionColour1, changeColour1] = useState(colourScheme[0]);
  const [questionColour2, changeColour2] = useState(colourScheme[1]);
  const [questionColour3, changeColour3] = useState(colourScheme[2]);
  const [questionColour4, changeColour4] = useState(colourScheme[3]);
  const [questionColour5, changeColour5] = useState(colourScheme[4]);

  function resetColours(colourArray) {
    changeColour1(colourArray[0]);
    changeColour2(colourArray[1]);
    changeColour3(colourArray[2]);
    changeColour4(colourArray[3]);
    changeColour5(colourArray[4]);
  };

  useEffect(() => {
    resetColours(colourScheme);
  }, [colourScheme]);

  // Quiz question generator.
  let loadQuizQuestions = function (type) {
    try {
      let questions;
      switch (type) {
        case 'mathsQuiz':
          questions = mathsQuiz;
          console.log('hi');
          break;
        case 'verbalQuiz':
          questions = verbalQuiz;
          break;
        case 'nonVerbalQuiz':
          break;
      }
      // Generates a random key and accesses it from JSON.
      let keys = Object.keys(questions);
      let randomKey = keys[Math.floor(Math.random() * keys.length)]
      return questions[randomKey];

    } catch (e) { }
  };

  // TEST FUNCTIONALITY.

  let loadTestQuestions = function (test) {
    testQuestionNumber = testQuestionNumber + 1;


    console.log(testQuestionNumber);

    try {
      switch (test) {
        case 'maths test 1':
          return mathTest1[testQuestionNumber];
        case 'maths test 2':
          return mathTest2[testQuestionNumber];
        // case 'nonVerbalQuiz':
        //   break;
      }
    } catch (e) { }
  };

  // Functions for changing the subject of the tests.
  function onLeftPress() {
    try {
      switch (testTopicTitle.toLowerCase()) {
        case 'maths':
          changeTestTopicTitle('Non-Verbal');
          break;
        case 'verbal':
          changeTestTopicTitle('Maths');
          break;
        case 'non-verbal':
          changeTestTopicTitle('Verbal');
          break;
      }
    } catch (e) { }
  };


  function onRightPress() {
    try {
      switch (testTopicTitle.toLowerCase()) {
        case 'maths':
          changeTestTopicTitle('Verbal');
          changeTestData(JSON.parse(chartData)[0].verbalScores);
          changeChartLabels(getLabels(JSON.parse(chartData)[0].verbalScores));
          break;
        case 'verbal':
          changeTestTopicTitle('Non-Verbal');
          changeTestData(JSON.parse(chartData)[0].nonVerbalScores);
          changeChartLabels(getLabels(JSON.parse(chartData)[0].nonVerbalScores));
          break;
        case 'non-verbal':
          changeTestTopicTitle('Maths');
          changeTestData(JSON.parse(chartData)[0].mathsScores);
          changeChartLabels(getLabels(JSON.parse(chartData)[0].mathsScores));
          break;
      }
    } catch (e) { }
  };

  // TODO IMPROVE EFFICIENCY
  function getPreviousScore(testTitle) {
    switch (testTitle.toLowerCase()) {
      case 'maths1':
        return lastTestScores.mathsScores[0];
      case 'maths2':
        return lastTestScores.mathsScores[1];
      case 'maths3':
        return lastTestScores.mathsScores[2];
      case 'maths4':
        return lastTestScores.mathsScores[3];
      case 'verbal1':
        return lastTestScores.verbalScores[0];
      case 'verbal2':
        return lastTestScores.verbalScores[1];
      case 'verbal3':
        return lastTestScores.verbalScores[2];
      case 'verbal4':
        return lastTestScores.verbalScores[3];
      case 'non-verbal1':
        return lastTestScores.nonVerbalScores[0];
      case 'non-verbal2':
        return lastTestScores.nonVerbalScores[1];
      case 'non-verbal3':
        return lastTestScores.nonVerbalScores[2];
      case 'non-verbal4':
        return lastTestScores.nonVerbalScores[3];
    }
  };

  const [question, changeQuestion] = useState([]);
  const [testTopicTitle, changeTestTopicTitle] = useState('Maths');
  const [testFeedbackDisplay, changeTestFeedbackDisplay] = useState('none');
  const [testRecording, updateTestRecording] = useState([]);
  let testData = {
    "score": 22.5,
    "questions": testRecording
  };

  function checkAnswer(question, answer, test) {
    try {
      // For a test we want to move to the next question regarless of if the answer is right.
      if (test) {
        setTimeout(function () {
          resetColours(colourScheme);
          changeQuestion(loadTestQuestions(header.toLowerCase(), true));
          // Only tests have question numbers.
          changeQuestionNumber(questionNumber + 1)
          if (question.correct === answer) {
            tempRecord.push('Question ' + questionNumber + ' was correct!');
          } else {
            tempRecord.push('Question ' + questionNumber + ' was incorrect, you put: ' + answer + '. Answer: ' + question.correct);
          };

          if (questionNumber === 4) {
            updateTestRecording(tempRecord);
            changeTestFeedbackDisplay('flex');
          }
        }, 1000);
      } else {
        // For a quiz we want to move to the next question only if the answer is right.
        if (question.correct === answer) {
          setTimeout(function () {
            resetColours(colourScheme);
            changeQuestion(loadQuizQuestions(questionsToGet));
          }, 1000);
        }
      }
      return question.correct === answer;
    } catch (e) { }
  };

  // Timer state set initially to 1 hour.
  const [timerState, changeTimer] = useState(new Date(3600 * 1000).toISOString().substr(11, 8));
  let timeInterval;

  function testStarted() {
    // Makes the timer tick at the right speed.
    let timerVariable = 3600;
    timeInterval = setInterval(function () {
      changeTimer(new Date(timerVariable-- * 1000).toISOString().substr(11, 8));
      if (timerVariable === 0) {
        testComplete();
      }
    }, 1000);
  };

  // For when a test is exited or completed.
  function testComplete() {
    clearInterval(timeInterval);
    console.log('completed');
    // reset Ui
    setHeader('Tests');
    changeTestFeedbackDisplay('none');
    changeTestDisplay('none');
    changeTestMenuDisplay('flex');
    testQuestionNumber = -1;

    // write to db

    let correctAns = [];
    for (let index = 0; index < tempRecord.length; index++) {
      if (tempRecord[index].toLowerCase().includes('correct!')) {
        correctAns.push('.');
      }
    };
    let testScore = ((correctAns.length / tempRecord.length) * 100);
    let temp = JSON.parse(chartData)[0].mathsScores;
    temp.push(testScore);
    let obh = JSON.parse(chartData);
    obh[0].mathsScores = temp;

    setTests(obh);
    // reset timer and questions.
  };

  const [questionNumber, changeQuestionNumber] = useState(1);
  const [displayBackPopup, changeBackPopup] = useState('none');

  function yesPressBack() {
    changeBackPopup('none');
    testComplete();
    changeQuestionNumber(1);
  };

  function noPressBack() {
    changeBackPopup('none');
  };



  // PROGRESS TRACKER FUNCTIONALITY.

  //Statistics test data.

  const [chartLabels, changeChartLabels] = useState([]);
  useEffect(() => {
    try {
      changeChartLabels(getLabels(JSON.parse(chartData)[0].mathsScores));
    } catch (e) { }
  }, [chartData]);

  function getLabels(param) {
    try {
      let labels = [];
      if (!param) {
        param = testStore
      }
      for (let i = 1; i <= param.length; i++) {
        labels.push('Test' + i);
      }
      return labels;
    } catch (e) { }
  };

  const [lineGraphDisplay, changeLineGraphDisplay] = useState('flex');
  const [barGraphDisplay, changeBarGraphDisplay] = useState('none');

  // Function for going between a line graph and a bar graph.
  function changeGraph() {
    try {
      if (lineGraphDisplay === 'none') {
        changeBarGraphDisplay('none');
        changeLineGraphDisplay('flex');
      } else {
        changeLineGraphDisplay('none');
        changeBarGraphDisplay('flex');
      }
    } catch (e) { }
  };

  // ABOUT PAGE FUCNTIONALITY.
  const [aboutHeader, changeAboutHeader] = useState('General');
  const [aboutText, changeAboutText] = useState(aboutGeneralText);

  // Update the about page for a left arrow press.
  function aboutLeftPress() {
    try {
      switch (aboutHeader.toLowerCase()) {
        case 'general':
          changeAboutHeader('About Progress Tracker');
          changeAboutText(aboutProgressTrackerText);
          break;
        case 'about quizzes':
          changeAboutHeader('General');
          changeAboutText(aboutGeneralText);
          break;
        case 'about tests':
          changeAboutHeader('About Quizzes');
          changeAboutText(aboutQuizText);
          break;
        case 'about progress tracker':
          changeAboutHeader('About Tests');
          changeAboutText(aboutTestText);
          break;
      }
    } catch (e) { }
  };

  // Update the about page for a right arrow press.
  function aboutRightPress() {
    try {
      switch (aboutHeader.toLowerCase()) {
        case 'general':
          changeAboutHeader('About Quizzes');
          changeAboutText(aboutQuizText);
          break;
        case 'about quizzes':
          changeAboutHeader('About Tests');
          changeAboutText(aboutTestText);
          break;
        case 'about tests':
          changeAboutHeader('About Progress Tracker');
          changeAboutText(aboutProgressTrackerText);
          break;
        case 'about progress tracker':
          changeAboutHeader('General');
          changeAboutText(aboutGeneralText);
          break;
      }
    } catch (e) { }
  };

  // Help text.
  const aboutGeneralText = 'Hello, thank you for using this app. This app is designed to help individuals study material found in the 11+ or similar level.';
  const aboutQuizText = 'You can do a quiz in a chosen subject by selecting the quizzes option on the main menu. ' +
    'Quizzes are designed to allow for casual practice at your own pace. The results of quizzes are not recorded however, ' +
    'mistakes you make here will go into a personalised quiz which you can take to practice the questions you have previously got wrong.';
  const aboutTestText = 'You can also do tests by selecting the tests option in the main menu. ' +
    'Tests are a series of 50 set questions which you will recieve marked feedback for.' +
    'The results of tests are displayed on the test selection menu and in the progress tracker.';
  const aboutProgressTrackerText = 'The progress tracker is a tool which allows you to track your performance.' +
    'The results from the tests you have done are displayed here in graphs so you can clearly see how you have been improving.';


  function updateColours(array, string) {
    setStylePreferences([{
      "styles": array
    }]);
    updateNavigationText(string);
    setTextStorage(string);
    resetColours(array);
  };

  const [displayErasePopup, changeErasePopup] = useState('none');

  function eraseDataFunction() {
    changeErasePopup('none');
    setTests([{
      "mathsScores": [],
      "verbalScores": [],
      "nonVerbalScores": []
    }]);

    setStylePreferences([{
      "styles": ['#3A41C6', '#3D3BBB', '#4634A7', '#4C2C96', '#512888']
    }]);

    setTextStorage('white');
    updateNavigationText('white');
    changeTextSize(1);
  };


  function getProgressTrackerText() {
    function getAverage(arrayOfNumbers) {
      let total = 0;
      arrayOfNumbers.forEach(function (value) {
        if (typeof value === 'number') {
          total += value;
        }
      });
      return total / (arrayOfNumbers.length || 1);
    };

    function loadText(average, topic) {
      let text = 'You have scored an average of ' + average + '% in ' + topic + '. '
      if (average === 100) {
        return text + 'Well done! This is a perfect score.';
      } else if (average > 70) {
        return text + 'Well done! This is an excellent score.';
      } else if (average > 60) {
        return text + 'Well done! This is an good score. Keep on studying to to achieve as higher mark as possible!';
      } else if (average >= 50) {
        return text + "You know more than you don't! Keep trying and try to focus on the areas that you are not as good at.";
      } else if (average < 50 && average > 0) {
        return text + 'Keep on trying!.';
      } else if (average === 0) {
        return text + 'Complete some tests to recieve some feedback.'
      }
    };

    try {
      let data = JSON.parse(chartData)[0];

      if (typeof data === 'object') {
        if (testTopicTitle.toLowerCase() === 'maths') {
          return loadText(getAverage(data.mathsScores), 'Maths');
        } else if (testTopicTitle === 'Verbal') {
          return loadText(getAverage(data.verbalScores), 'Verbal');
        } else if (testTopicTitle === 'Non-Verbal') {
          return loadText(getAverage(data.nonVerbalScores), 'Non-Verbal');
        }
      }
    } catch (e) { console.log(e) }
  };

  const [progressTrackerText, changeProgressTrackerText] = useState('');
  useEffect(function () {
    if (typeof chartData === 'string') {
      changeProgressTrackerText(getProgressTrackerText());
    }
  }, [chartData]);

  useEffect(function () {
    changeProgressTrackerText(getProgressTrackerText());
  }, [testTopicTitle]);

  // Stylesheet for splashscreen.
  const splashStyle = StyleSheet.create({
    container: {
      display: splashDisplay,
      width: '100%',
      height: '100%',
      backgroundColor: '#966FD6',
      zIndex: 999,
      opacity: fadeAnim
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 35,
      textAlign: 'center',
      margin: 'auto'
    }
  });

  const optionStyles = StyleSheet.create({
    container: {
      width: '100%',
      height: '90%',
      bottom: 0,
      position: 'absolute',
      display: displayOptions
    },
    subheading: {
      fontFamily: 'Verdana',
      fontSize: 20 * textSize,
      textAlign: 'center',
      marginBottom: '5%'
    },
    colourContainer: {
      marginHorizontal: 'auto',
      width: '90%',
      height: '20%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly'
    },
    eraseDataButton: {
      backgroundColor: '#ff1447',
      height: '10%',
      width: '50%',
      marginHorizontal: '25%',
      borderRadius: 40
    },
    sliderContainer: {
      height: '30%',
      width: '80%',
      marginHorizontal: 'auto'
    },
    slider: {

    },
    eraseText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20 * textSize,
      margin: 'auto'
    }
  });

  // Stylesheet for navigation.
  const navigationStyles = StyleSheet.create({
    home: {
      display: homeDisplay,
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0
    },
    quizzes: {
      display: quizMenuDisplay,
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0
    },
    tests: {
      display: testMenuDisplay
    }
  });

  // Stylesheet for quizzes.
  const quizStyles = StyleSheet.create({
    container: {
      width: '100%',
      height: '50%',
      position: 'absolute',
      bottom: 0
    }
  });

  // Stylesheet for tests.
  const testStyles = StyleSheet.create({
    selection: {
      display: testMenuDisplay,
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0
    },
    testNavButtons: {
      bottom: 0,
      position: 'absolute',
      width: '100%',
      height: '90%'
    },
    questionsContainer: {
      display: displayTest,
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0
    },
    secondaryHeader: {
      width: '100%',
      height: '6%',
      backgroundColor: colourScheme[0],
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    secondaryHeaderText: {
      color: navigationText,
      fontWeight: 'bold',
      fontSize: 25 * textSize,
      paddingHorizontal: 10
    },
    questions: {
      height: '50%',
      width: '100%',
      bottom: 0,
      position: 'absolute'
    }
  });

  // Stylesheet for statistics.
  const statisticsStyles = StyleSheet.create({
    container: {
      display: displayStatistics,
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0
    },
    graphs: {
      justifyContent: 'center',
      marginHorizontal: 'auto',
      marginTop: '15%'
    },
    lineGraph: {
      marginVertical: 8,
      borderRadius: 16,
      display: lineGraphDisplay
    },
    barGraph: {
      display: barGraphDisplay,
      backgroundColor: colourScheme[0]
    },
    buttonContainer: {
      width: '100%',
      height: '7.5%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      color: 'white'
    },
    button: {
      margin: '10%',
      width: 100,
      height: 50,
      backgroundColor: colourScheme[0],
      borderRadius: 16
    },
    summaryContainer: {
      width: '80%',
      height: '30%',
      margin: 'auto'
    },
    summaryText: {
      fontFamily: 'Verdana'
    }
  });

  // Stylesheet for about page.
  const aboutStyles = StyleSheet.create({
    container: {
      display: aboutDisplay,
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0
    },
    text: {
      fontFamily: 'Verdana',
      fontSize: 15 * textSize,
      paddingHorizontal: '7.5%',
      paddingVertical: '5%'
    }
  });

  const questionDescriptionStyles = StyleSheet.create({
    container: {
      height: '40%',
      width: '100%',
      position: 'absolute'
    },
    text: {
      marginHorizontal: 'auto',
      marginTop: '20%',
      fontSize: 20 * textSize,
      width: '80%',
      height: '40%',
      textAlign: 'center'
    }
  });


  const styles = StyleSheet.create({
    test: {
      backgroundColor: 'red',
      width: '20%',
      height: '10%'
    },
    container: {
      fontFamily: 'Monospace',
      fontSize: 100 * textSize,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    topText: {
      fontWeight: 'bold',
      fontSize: 30 * textSize
    },
    options: {
      display: displayOptions,
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0,
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
    }
  });

  const headers = StyleSheet.create({
    header: {
      position: 'absolute',
      top: 0,
      height: '10%',
      width: '100%',
      alignItems: 'center',
      backgroundColor: colourScheme[0],
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomStyle: 'solid',
      borderBottomColor: navigationText,
      borderBottomWidth: 3
    },
    headerText: {
      color: navigationText,
      fontSize: 25 * textSize
    },
    back: {
      color: navigationText,
      fontSize: 60,
      fontWeight: 'bold'
    }
  });


  return (
    <View style={styles.container}>

      <Animated.View style={splashStyle.container}>
        <Text style={splashStyle.text}>Set4Success Tuition</Text>
      </Animated.View>


      {/* Header component. */}
      <View style={headers.header}>
        <Text style={headers.back} onPress={backButtonPressed}> 🠔</Text>
        <Text style={headers.headerText}>{header}</Text>
        <Text style={headers.back} onPress={optionsPressed}>☰ </Text>
      </View>

      {/* Options */}
      <Popup text={'This will erase all stored data including test scores, mistake quizzes and colour preferences. Are you sure you want to do this?'}
        yesPress={eraseDataFunction} noPress={function () {
          changeErasePopup('none');
        }} display={displayErasePopup}></Popup>
      <View style={optionStyles.container}>

        <Text style={optionStyles.subheading}>Select a colour scheme:</Text>
        <View style={optionStyles.colourContainer}>
          {/* Default - purple */}
          <ColourButton colour='#3A41C6' onPress={function () {
            updateColours(['#3A41C6', '#3D3BBB', '#4634A7', '#4C2C96', '#512888'], 'white');
          }} />
          {/* Blue */}
          <ColourButton colour='#0000ff' onPress={function () {
            updateColours(['#0000ff', '#1f1fff', '#4949ff', '#7879ff', '#a3a3ff'], 'white');
          }} />
          {/* Green */}
          <ColourButton colour='#00563E' onPress={function () {
            updateColours(['#00563E', '#006E50', '#008562', '#009D74', '#00B486'], 'white');
          }} />
          {/* Pink */}
          <ColourButton colour='#C63287' onPress={function () {
            updateColours(['#C63287', '#D44C9C', '#E366B1', '#F17FC5', '#FF99DA'], 'black');
          }} />
          {/* Red */}
          <ColourButton colour='#ad1f0a' onPress={function () {
            updateColours(['#ad1f0a', '#c6230f', '#de2514', '#ee1b10', '#ff4d50'], 'white');
          }} />
          {/* Orange */}
          <ColourButton colour='#fd5602' onPress={function () {
            updateColours(['#fd5602', '#fe6e00', '#ff8303', '#ffaf42', '#fedebe'], 'white');
          }} />
          {/* Gold */}
          <ColourButton colour='#ebc807' onPress={function () {
            updateColours(['#ebc807', '#f0ce13', '#ffd400', '#ffdd3c', '#ffea61'], 'black');
          }} />
          {/* Brown */}
          <ColourButton colour='#C19A6B' onPress={function () {
            updateColours(['#C19A6B', '#AA845A', '#946E4A', '#7D5839', '#664228'], 'white');
          }} />
          {/* Silver */}
          <ColourButton colour='#CFCFCF' onPress={function () {
            updateColours(['#CFCFCF', '#BEBEBE', '#ACACAC', '#9B9B9B', '#898989'], 'black');
          }} />
          {/* Black */}
          <ColourButton colour='#000000' onPress={function () {
            updateColours(['#000000', '#090909', '#131313', '#1a1a1a', '#202020'], 'white');
          }} />
        </View>

        <Text style={optionStyles.subheading}>Adjust the text size:</Text>
        <View style={optionStyles.sliderContainer}>
          <Slider
            style={optionStyles.slider}
            minimumValue={0.8}
            maximumValue={1.2}
            minimumTrackTintColor='#3A41C6'
            maximumTrackTintColor='black'
            onSlidingComplete={function (sliderValue) {
              if (sliderValue !== 0) {
                console.log(sliderValue.toFixed(1));
                changeTextSize(sliderValue.toFixed(1));
              }
            }}
          />
        </View>
        <TouchableOpacity style={optionStyles.eraseDataButton} onPress={function () {
          changeErasePopup('flex');
        }}>
          <Text style={optionStyles.eraseText}>Erase Stored Data</Text>
        </TouchableOpacity>
      </View>

      {/* Default home page component. */}
      <View style={navigationStyles.home}>
        <NavigationButton text='Practice Quizzes' explainText='Practice topics at your own pace.' onPress={toQuizMenu} colour={colourScheme[1]} textColour={navigationText} textSize={textSize} />
        <NavigationButton text='Timed Tests' explainText='Take a timed test to test your abilities.' onPress={toTestMenu} colour={colourScheme[2]} textColour={navigationText} textSize={textSize}/>
        <NavigationButton text='Progress Tracker' explainText='Track your past performance and see how you have improved.' onPress={toStatsMenu} colour={colourScheme[3]} textColour={navigationText} textSize={textSize}/>
        <NavigationButton text='About' explainText='Additional information for using the app.' onPress={toAboutPage} colour={colourScheme[4]} textColour={navigationText} textSize={textSize}/>
      </View>

      {/* Menu for selecting what quiz you would like to do. */}
      <View style={navigationStyles.quizzes}>
        <Text style={styles.topText}></Text>
        <NavigationButton text='Maths' explainText='Practice your maths skills!.' colour={colourScheme[1]} textColour={navigationText} textSize={textSize} onPress={function () {
          setHeader('Maths Quiz');
          changeQuizMenuDisplay('none');
          changeQuestionDisplay('flex');
          changeQuestion(loadQuizQuestions('mathsQuiz'));
        }} />
        <NavigationButton text='Verbal' explainText='Practice your verbal reasoning skills!' colour={colourScheme[2]} textColour={navigationText} textSize={textSize} onPress={function () {
          setHeader('Verbal Quiz');
          changeQuizMenuDisplay('none');
          changeQuestionDisplay('flex');
          changeQuestion(loadQuizQuestions('verbalQuiz'));
        }} />
        <NavigationButton text='Non-Verbal' explainText='Practice your non-verbal reasoning skills!' colour={colourScheme[3]} textColour={navigationText} textSize={textSize} onPress={function () {
          setHeader('Non-Verbal Quiz');
        }} />
        <NavigationButton text='Mistakes' explainText='Practice the questions you have been having difficulty with.' colour={colourScheme[4]} textColour={navigationText} textSize={textSize} onPress={function () {
          setHeader('Mistakes');
        }} />
      </View>
      <View style={styles.quizContainer}>

        <View style={questionDescriptionStyles.container}>
          <Text style={questionDescriptionStyles.text}>{question.description}</Text>
        </View>


        {/* <Popup display={displaySkipPopup} text='Are you sure you want to skip the question?' />
        <View onPress={displayPopup} style={styles.test} text='SKIPPP'></View> */}
        <View style={quizStyles.container}>
          <QuizButton text={'A)  ' + question.A} colour={questionColour1} textColour={navigationText} textSize={textSize} onPress={function () {
            checkAnswer(question, 'A') ? changeColour1('#95F985') : changeColour1('#E45045');
          }}></QuizButton>
          <QuizButton text={'B)  ' + question.B} colour={questionColour2} textColour={navigationText} textSize={textSize} onPress={function () {
            checkAnswer(question, 'B') ? changeColour2('#4DED30') : changeColour2('#D74136');
          }}></QuizButton>
          <QuizButton text={'C)  ' + question.C} colour={questionColour3} textColour={navigationText} textSize={textSize} onPress={function () {
            checkAnswer(question, 'C') ? changeColour3('#26D701') : changeColour3('#C93128');
          }}></QuizButton>
          <QuizButton text={'D)  ' + question.D} colour={questionColour4} textColour={navigationText} textSize={textSize} onPress={function () {
            checkAnswer(question, 'D') ? changeColour4('#00C301') : changeColour4('#BC1E19');
          }}></QuizButton>
          <QuizButton text={'E)  ' + question.E} colour={questionColour5} textColour={navigationText} textSize={textSize} onPress={function () {
            checkAnswer(question, 'E') ? changeColour5('#00AB08') : changeColour5('#AE0009');
          }}></QuizButton>
        </View>
      </View>

      {/* Test selection */}
      <View style={testStyles.selection}>
        <SubHeadingSelector text={testTopicTitle} leftPress={onLeftPress} rightPress={onRightPress} colour={colourScheme[0]} textColour={navigationText} textSize={textSize}></SubHeadingSelector>
        <View style={testStyles.testNavButtons}>
          <NavigationButton text={testTopicTitle + ' Test 1'} colour={colourScheme[1]} textColour={navigationText} textSize={textSize} onPress={function () {
            changeQuestion(loadTestQuestions('maths test 1'));
            toTests(testTopicTitle + ' Test 1');
          }} explainText={'Best score: - ' + getPreviousScore(testTopicTitle + '1') + '%.'} />
          <NavigationButton text={testTopicTitle + ' Test 2'} colour={colourScheme[2]} textColour={navigationText} textSize={textSize} onPress={function () {
            changeQuestion(loadTestQuestions('maths test 2'));
            toTests(testTopicTitle + ' Test 2');
          }} explainText={'Best score: - ' + getPreviousScore(testTopicTitle + '2') + '%.'} />
          <NavigationButton text={testTopicTitle + ' Test 3'} colour={colourScheme[3]} textColour={navigationText} textSize={textSize} onPress={function () {
            toTests(testTopicTitle + ' Test 3');
          }} explainText={'Best score: - ' + getPreviousScore(testTopicTitle + '3') + '%.'} />
          <NavigationButton text={testTopicTitle + ' Test 4'} colour={colourScheme[4]} textColour={navigationText} textSize={textSize} onPress={function () {
            toTests(testTopicTitle + ' Test 4');
          }} explainText={'Best score: - ' + getPreviousScore(testTopicTitle + '4') + '%.'} />
        </View>
      </View>

      {/* TODO delete repeated components => more efficient */}

      {/* Test component */}

      <View style={testStyles.questionsContainer}>
        <Popup text='Going back will end your test are you sure you want to do this?' yesPress={yesPressBack} noPress={noPressBack} display={displayBackPopup} />
        <View style={testStyles.secondaryHeader}>
          <Text style={testStyles.secondaryHeaderText}>Question {questionNumber}/50 </Text>
          <Text style={testStyles.secondaryHeaderText}>{timerState}</Text>
        </View>

        <View style={questionDescriptionStyles.container}>
          <Text style={questionDescriptionStyles.text}>{question.description}</Text>
        </View>
        <View style={testStyles.questions}>
          <QuizButton text={'A)  ' + question.A} colour={questionColour1} textColour={navigationText} textSize={textSize} onPress={function () {
            checkAnswer(question, 'A', true) ? changeColour1('#95F985') : changeColour1('#E45045');
          }}></QuizButton>
          <QuizButton text={'B)  ' + question.B} colour={questionColour2} textColour={navigationText} textSize={textSize} onPress={function () {
            checkAnswer(question, 'B', true) ? changeColour2('#4DED30') : changeColour2('#D74136');
          }}></QuizButton>
          <QuizButton text={'C)  ' + question.C} colour={questionColour3} textColour={navigationText} textSize={textSize} onPress={function () {
            checkAnswer(question, 'C', true) ? changeColour3('#26D701') : changeColour3('#C93128');
          }}></QuizButton>
          <QuizButton text={'D)  ' + question.D} colour={questionColour4} textColour={navigationText} textSize={textSize} onPress={function () {
            checkAnswer(question, 'D', true) ? changeColour4('#00C301') : changeColour4('#BC1E19');
          }}></QuizButton>
          <QuizButton text={'E)  ' + question.E} colour={questionColour5} textColour={navigationText} textSize={textSize} onPress={function () {
            checkAnswer(question, 'E', true) ? changeColour5('#00AB08') : changeColour5('#AE0009');
          }}></QuizButton>
        </View>


        <TestFeedback data={testData} display={testFeedbackDisplay} testCompleteFunction={testComplete}></TestFeedback>
      </View>

      {/* Progress Tracker */}
      <View style={statisticsStyles.container}>
        <SubHeadingSelector text={testTopicTitle} leftPress={onLeftPress} rightPress={onRightPress} colour={colourScheme[0]} textColour={navigationText} textSize={textSize}></SubHeadingSelector>
        <View style={statisticsStyles.graphs}>

          {/* View statistics as a line graph. */}
          <View style={statisticsStyles.lineGraph}>
            <LineChart
              data={{
                labels: chartLabels,
                datasets: [
                  {
                    data: testStore
                  }
                ]
              }}
              width={300} // from react-native
              height={220}
              yAxisSuffix='%'
              fromZero={true}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: colourScheme[0],
                backgroundGradientFrom: "#3A41C6",
                backgroundGradientTo: "#3A41C6",
                fillShadowGradient: 'black',
                fillShadowGradientOpacity: 1,
                fromZero: true,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier

            />
          </View>
          {/* View statistics as a bar graph. */}
          <View style={statisticsStyles.barGraph}>
            <BarChart
              data={{
                labels: chartLabels,
                datasets: [
                  {
                    data: testStore
                  }
                ]
              }}
              width={300} // from react-native
              height={220}
              yAxisSuffix='%'
              fillShadowGradient='black'
              fromZero={true}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "red",
                backgroundGradientFrom: "#3A41C6",
                backgroundGradientTo: "#3A41C6",
                barPercentage: 0.8,
                barRadius: 1,
                fillShadowGradient: 'black',
                fillShadowGradientOpacity: 1,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
            />
          </View>
        </View>

        <View style={statisticsStyles.buttonContainer}>
          <View style={statisticsStyles.button}><Text style={{ color: 'white', margin: 'auto', fontFamily: 'Verdana' }} onPress={changeGraph}>Line Graph</Text></View>
          <View style={statisticsStyles.button}><Text style={{ color: 'white', margin: 'auto', fontFamily: 'Verdana' }} onPress={changeGraph}>Bar Graph</Text></View>
        </View>
        <View style={statisticsStyles.summaryContainer}>
          <Text style={statisticsStyles.summaryText}>{progressTrackerText}</Text>
        </View>

      </View>



      {/* Component for the about section. */}
      <View style={aboutStyles.container}>
        <SubHeadingSelector text={aboutHeader} leftPress={aboutLeftPress} rightPress={aboutRightPress} colour={colourScheme[0]} textColour={navigationText} textSize={textSize}></SubHeadingSelector>
        <Text style={aboutStyles.text}>{aboutText}</Text>
      </View>
    </View>
  );
}
