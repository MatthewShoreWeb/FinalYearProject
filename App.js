// Todo:
// Test functionality - feedback, timer, storage.
// Options functionality.
// Progress tracker improvements.
// Improve code quality and file structure.
// Progress tracker components?
// Test resets
// Reformat stylesheets.

import React, { useState } from 'react';

// App components import.
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import testQuestions from './questions/testQuestions.json';

// Change to storage.
let tempRecord = [];


export default function App() {

  //SETTINGS FUNCTIONALITY. This will need to be updated to work with persistent storage.
  const [colourScheme, updateColourScheme] = useState(['#3A41C6', '#3D3BBB', '#4634A7', '#4C2C96', '#512888']);
  const [navigationText, updateNavigationText] = useState('white');


  // DISPLAY STATES.
  // State changes for updating components in the app.
  const [header, setHeader] = useState('Home');
  // const [headerDisplay, changeHeaderDisplay] = useState('none');
  // const [splashDisplay, changeSplashDisplay] = useState('flex');
  const [homeDisplay, changeHomeDisplay] = useState('flex');
  const [quizMenuDisplay, changeQuizMenuDisplay] = useState('none');
  const [testMenuDisplay, changeTestMenuDisplay] = useState('none');
  const [aboutDisplay, changeAboutDisplay] = useState('none');
  const [multiChoiceQuestions, changeQuestionDisplay] = useState('none');
  const [displayOptions, changeOptionsDisplay] = useState('none');
  const [displayStatistics, changeStatisticsDisplay] = useState('none');
  const [displayTest, changeTestDisplay] = useState('none');

  // SPASH GOES HERE

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
        testComplete(false, true);
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

  function resetColours() {
    changeColour1(colourScheme[0]);
    changeColour2(colourScheme[1]);
    changeColour3(colourScheme[2]);
    changeColour4(colourScheme[3]);
    changeColour5(colourScheme[4]);
  };

  // Quiz question generator.
  let loadQuestions = function () {
    try {
      // Generates a random key and accesses it from JSON.
      let keys = Object.keys(testQuestions);
      let randomKey = keys[Math.floor(Math.random() * keys.length)]
      return testQuestions[randomKey];
    } catch (e) { }
  };

  // TEST FUNCTIONALITY.

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
          changeChartData([65, 69, 80, 87, 58, 41]);
          changeChartLabels(getLabels([65, 69, 80, 87, 58, 41]));
          break;
        case 'verbal':
          changeTestTopicTitle('Non-Verbal');
          changeChartData([25, 40, 70, 80]);
          changeChartLabels(getLabels([25, 40, 70, 80]));
          break;
        case 'non-verbal':
          changeTestTopicTitle('Maths');
          changeChartData([40, 50, 80]);
          changeChartLabels(getLabels([40, 50, 80]));
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

  const [question, changeQuestion] = useState(loadQuestions());
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
          resetColours();
          changeQuestion(loadQuestions());
          // Only tests have question numbers.
          changeQuestionNumber(questionNumber + 1)
          if (question.correct === answer) {
            tempRecord.push('Question ' + questionNumber + ' was correct!');
          } else {
            tempRecord.push('Question ' + questionNumber + ' was incorrect, you put: ' + answer + '. Answer: ' + question.correct);
          };

          if (questionNumber === 4) {
            console.log(tempRecord)
            updateTestRecording(tempRecord);
            changeTestFeedbackDisplay('flex');
          }
        }, 1000);
      } else {
        // For a quiz we want to move to the next question only if the answer is right.
        if (question.correct === answer) {
          setTimeout(function () {
            resetColours();
            changeQuestion(loadQuestions());
          }, 1000);
        }
      }
      return question.correct === answer;
    } catch (e) { }
  };

  // For when a test is exited or completed.
  function testComplete() {
    // reset Ui
    setHeader('Tests');
    changeTestFeedbackDisplay('none');
    changeTestDisplay('none');
    changeTestMenuDisplay('flex');

    // write to db
    // reset timer and questions.
  };

  const [questionNumber, changeQuestionNumber] = useState(1);
  const [displayBackPopup, changeBackPopup] = useState('none');
  let wipeTimer = false;

  function yesPressBack() {
    changeBackPopup('none');
    toTestMenu();
    changeQuestionNumber(1);
  };

  function noPressBack() {
    changeBackPopup('none');
  };


  // Timer state set initially to 1 hour.
  const [timerState, changeTimer] = useState(new Date(3600 * 1000).toISOString().substr(11, 8));

  function testStarted() {
    // Makes the timer tick at the right speed.
    let timerVariable = 3600;
    let timeInterval = setInterval(function () {
      timerVariable--;
      changeTimer(new Date(timerVariable * 1000).toISOString().substr(11, 8));

      if (timerVariable === 0) {
        testComplete(true);
      }
    }, 1000);
  };


  // PROGRESS TRACKER FUNCTIONALITY.

  //Statistics test data.
  const [chartData, changeChartData] = useState([65, 69, 80, 87, 58, 41]);
  const [chartLabels, changeChartLabels] = useState(getLabels());
  function getLabels(param) {
    let labels = [];
    if (!param) {
      param = chartData
    }
    for (let i = 1; i <= param.length; i++) {
      labels.push('Test' + i);
    }
    return labels;
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


  // Stylesheet for splashscreen.
  const splashStyle = StyleSheet.create({
    container: {
      display: 'none',
      width: '100%',
      height: '100%',
      backgroundColor: '#1528bd'
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 40,
      textAlign: 'center'
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
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center',
      marginBottom: '5%'
    },
    colourContainer: {
      width: '100%',
      height: '10%',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    eraseDataButton: {
      backgroundColor: '#ff1447',
      height: '10%',
      width: '50%',
      marginHorizontal: '25%',
      borderRadius: 40
    },
    eraseText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
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
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
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
      marginVertical: 8,
      borderRadius: 16,
      display: barGraphDisplay,
      backgroundColor: colourScheme[0]
    },
    buttonContainer: {
      width: '100%',
      height: '50%',
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
      fontSize: 20,
      fontWeight: 'bold',
      paddingHorizontal: '7.5%'
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
      fontSize: 100,
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
      margin: 'auto'
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
      borderBottomColor: 'white',
      borderBottomWidth: 3
    },
    headerText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25
    },
    back: {
      color: 'white',
      fontSize: 60,
      fontWeight: 'bold'
    }
  });


  return (
    <View style={styles.container}>

      <View style={splashStyle.container} >
        <Text style={splashStyle.text}>Set4SuccessTuition</Text>
      </View>

      {/* Header component. */}
      <View style={headers.header}>
        <Text style={headers.back} onPress={backButtonPressed}> 🠔</Text>
        <Text style={headers.headerText}>{header}</Text>
        <Text style={headers.back} onPress={optionsPressed}>☰ </Text>
      </View>

      {/* Options */}
      <View style={optionStyles.container}>
        <Text style={optionStyles.subheading}>Colour Scheme</Text>
        <View style={optionStyles.colourContainer}>
          <ColourButton colour='#fcba03' onPress={function () {
            updateColourScheme(['#ebc807', '#f0ce13', '#ffd400', '#ffdd3c', '#ffea61']);
          }}/>
          <ColourButton colour='#0388fc' onPress={function () {
            updateColourScheme(['blue', colourScheme[1], colourScheme[2], colourScheme[3], colourScheme[4]]);
          }}/>
          <ColourButton colour='#03fc39' onPress={function () {
            updateColourScheme(['green', colourScheme[1], colourScheme[2], colourScheme[3], colourScheme[4]]);
          }}/>
          <ColourButton colour='pink' onPress={function () {
            updateColourScheme(['pink', colourScheme[1], colourScheme[2], colourScheme[3], colourScheme[4]]);
          }}/>
          <ColourButton colour='black' onPress={function () {
            updateColourScheme(['black', colourScheme[1], colourScheme[2], colourScheme[3], colourScheme[4]]);
          }}/>
        </View>

        <TouchableOpacity style={optionStyles.eraseDataButton}>
          <Text style={optionStyles.eraseText}>Erase Stored Data</Text>
        </TouchableOpacity>
      </View>

      {/* Default home page component. */}
      <View style={navigationStyles.home}>
        <NavigationButton text='Practice Quizzes' explainText='Practice topics at your own pace.' onPress={toQuizMenu} colour={colourScheme[1]} />
        <NavigationButton text='Timed Tests' explainText='Take a timed test to test your abilities.' onPress={toTestMenu} colour={colourScheme[2]} />
        <NavigationButton text='Progress Tracker' explainText='Track your past performance and see how you have improved.' onPress={toStatsMenu} colour={colourScheme[3]} />
        <NavigationButton text='About' explainText='Additional information for using the app.' onPress={toAboutPage} colour={colourScheme[4]} />
      </View>

      {/* Menu for selecting what quiz you would like to do. */}
      <View style={navigationStyles.quizzes}>
        <Text style={styles.topText}></Text>
        <NavigationButton text='Maths' explainText='Lorem ipsum dolor sit amet, consectetur.' colour={colourScheme[1]} onPress={function () {
          setHeader('Maths Quiz');
          changeQuizMenuDisplay('none');
          changeQuestionDisplay('flex');
        }} />
        <NavigationButton text='Verbal' explainText='Lorem ipsum dolor sit amet, consectetur.' colour={colourScheme[2]} onPress={function () {
          setHeader('Verbal Quiz');
        }} />
        <NavigationButton text='Non-Verbal' explainText='Lorem ipsum dolor sit amet, consectetur' colour={colourScheme[3]} onPress={function () {
          setHeader('Non-Verbal Quiz');
        }} />
        <NavigationButton text='Mistakes' explainText='Practice the questions you have been having difficulty with.' colour={colourScheme[4]} onPress={function () {
          setHeader('Mistakes');
        }} />
      </View>
      <View style={styles.quizContainer}>

        <View style={styles.questionDescription}>
          <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>{question.description}</Text>
        </View>


        {/* <Popup display={displaySkipPopup} text='Are you sure you want to skip the question?' />
        <View onPress={displayPopup} style={styles.test} text='SKIPPP'></View> */}
        <View style={quizStyles.container}>
          <QuizButton text={'A)  ' + question.A} colour={questionColour1} onPress={function () {
            checkAnswer(question, 'A') ? changeColour1('#95F985') : changeColour1('#E45045');
          }}></QuizButton>
          <QuizButton text={'B)  ' + question.B} colour={questionColour2} onPress={function () {
            checkAnswer(question, 'B') ? changeColour2('#4DED30') : changeColour2('#D74136');
          }}></QuizButton>
          <QuizButton text={'C)  ' + question.C} colour={questionColour3} onPress={function () {
            checkAnswer(question, 'C') ? changeColour3('#26D701') : changeColour3('#C93128');
          }}></QuizButton>
          <QuizButton text={'D)  ' + question.D} colour={questionColour4} onPress={function () {
            checkAnswer(question, 'D') ? changeColour4('#00C301') : changeColour4('#BC1E19');
          }}></QuizButton>
          <QuizButton text={'E)  ' + question.E} colour={questionColour5} onPress={function () {
            checkAnswer(question, 'E') ? changeColour5('#00AB08') : changeColour5('#AE0009');
          }}></QuizButton>
        </View>
      </View>
     
      {/* Test selection */}
      <View style={testStyles.selection}>
        <SubHeadingSelector text={testTopicTitle} leftPress={onLeftPress} rightPress={onRightPress}></SubHeadingSelector>
        <View style={testStyles.testNavButtons}>
          <NavigationButton text={testTopicTitle + ' Test 1'} colour={colourScheme[1]} onPress={function () {
            toTests(testTopicTitle + ' Test 1');
          }} explainText={'Best score: - ' + getPreviousScore(testTopicTitle + '1') + '%.'} />
          <NavigationButton text={testTopicTitle + ' Test 2'} colour={colourScheme[2]} onPress={function () {
            toTests(testTopicTitle + ' Test 2');
          }} explainText={'Best score: - ' + getPreviousScore(testTopicTitle + '2') + '%.'} />
          <NavigationButton text={testTopicTitle + ' Test 3'} colour={colourScheme[3]} onPress={function () {
            toTests(testTopicTitle + ' Test 3');
          }} explainText={'Best score: - ' + getPreviousScore(testTopicTitle + '3') + '%.'} />
          <NavigationButton text={testTopicTitle + ' Test 4'} colour={colourScheme[4]} onPress={function () {
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

        <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>{question.description}</Text>
        <View style={testStyles.questions}>
          <QuizButton text={'A)  ' + question.A} colour={questionColour1} onPress={function () {
            checkAnswer(question, 'A', true) ? changeColour1('#95F985') : changeColour1('#E45045');
          }}></QuizButton>
          <QuizButton text={'B)  ' + question.B} colour={questionColour2} onPress={function () {
            checkAnswer(question, 'B', true) ? changeColour2('#4DED30') : changeColour2('#D74136');
          }}></QuizButton>
          <QuizButton text={'C)  ' + question.C} colour={questionColour3} onPress={function () {
            checkAnswer(question, 'C', true) ? changeColour3('#26D701') : changeColour3('#C93128');
          }}></QuizButton>
          <QuizButton text={'D)  ' + question.D} colour={questionColour4} onPress={function () {
            checkAnswer(question, 'D', true) ? changeColour4('#00C301') : changeColour4('#BC1E19');
          }}></QuizButton>
          <QuizButton text={'E)  ' + question.E} colour={questionColour5} onPress={function () {
            checkAnswer(question, 'E', true) ? changeColour5('#00AB08') : changeColour5('#AE0009');
          }}></QuizButton>
        </View>


        <TestFeedback data={testData} display={testFeedbackDisplay} testCompleteFunction={testComplete}></TestFeedback>
      </View>

      {/* Progress Tracker */}
      <View style={statisticsStyles.container}>
        <SubHeadingSelector text={testTopicTitle} leftPress={onLeftPress} rightPress={onRightPress}></SubHeadingSelector>
        <View style={statisticsStyles.graphs}>

          {/* View statistics as a line graph. */}
          <View style={statisticsStyles.lineGraph}>
            <LineChart
              data={{
                labels: chartLabels,
                datasets: [
                  {
                    data: chartData
                  }
                ]
              }}
              width={300} // from react-native
              height={220}
              yAxisSuffix='%'
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: colourScheme[0],
                backgroundGradientFrom: "#3A41C6",
                backgroundGradientTo: "#3A41C6",
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
                labels: ['Test #1', 'Test #2', 'Test #3'],
                datasets: [
                  {
                    data: chartData
                  }
                ]
              }}
              width={300} // from react-native
              height={220}
              yAxisSuffix='%'
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: colourScheme[0],
                backgroundGradientFrom: "#3A41C6",
                backgroundGradientTo: "#3A41C6",
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
        </View>



        <View style={statisticsStyles.buttonContainer}>
          <View style={statisticsStyles.button}><Text style={{ color: 'white', margin: 'auto', fontWeight: 'bold' }} onPress={changeGraph}>Line Graph</Text></View>
          <View style={statisticsStyles.button}><Text style={{ color: 'white', margin: 'auto', fontWeight: 'bold' }} onPress={changeGraph}>Bar Graph</Text></View>
        </View>
      </View>

      {/* Component for the about section. */}
      {/* 'u2002' is the code for a bullet point, it is required to form an unordered list. */}
      <View style={aboutStyles.container}>
        <SubHeadingSelector text={aboutHeader} leftPress={aboutLeftPress} rightPress={aboutRightPress}></SubHeadingSelector>
        <Text style={aboutStyles.text}>{aboutText}</Text>
      </View>
    </View>
  );
}
