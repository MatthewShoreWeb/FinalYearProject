import React, { useState } from 'react';

// App components import.
import { StyleSheet, Text, View } from 'react-native';
import NavigationButton from './components/NavigationButton';
import QuizButton from './components/QuizButton';
import DotGraph from './components/DotGraph';
import TestTopicSelector from './components/TestTopicSelector';

// Questions Test Data
import testQuestions from './questions/testQuestions.json';


export default function App() {
  // State changes for updating components in the app.
  const [header, setHeader] = useState('Home');
  const [headerDisplay, changeHeaderDisplay] = useState('none');
  const [splashDisplay, changeSplashDisplay] = useState('flex');
  const [homeDisplay, changeHomeDisplay] = useState('flex');
  const [quizMenuDisplay, changeQuizMenuDisplay] = useState('none');
  const [testMenuDisplay, changeTestMenuDisplay] = useState('none');
  const [aboutDisplay, changeAboutDisplay] = useState('none');
  const [multiChoiceQuestions, changeQuestionDisplay] = useState('none');
  const [displayOptions, changeOptionsDisplay] = useState('none');
  const [displayStatistics, changeStatisticsDisplay] = useState('none');


  // setTimeout(function () {
  //   changeSplashDisplay('none');
  //   changeHomeDisplay('flex');
  //   changeHeaderDisplay('flex');
  // }, 3000);

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

  // Works out what page to go to when the back button is pressed.
  function backButtonPressed() {
    try {
      if (displayOptions === 'flex') {
        optionsPressed();
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

  // Options functionality - when the user clicks the gear icon in the top right.
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

  const [questionColour1, changeColour1] = useState('#3A41C6');
  const [questionColour2, changeColour2] = useState('#3D3BBB');
  const [questionColour3, changeColour3] = useState('#4634A7');
  const [questionColour4, changeColour4] = useState('#4C2C96');
  const [questionColour5, changeColour5] = useState('#512888');

  function resetColours () {
      changeColour1('#3A41C6');
      changeColour2('#3D3BBB');
      changeColour3('#4634A7');
      changeColour4('#4C2C96');
      changeColour5('#512888');
  };

  // Quiz/Test Functionality.
  let loadQuestions = function () {
    try {
      // Generates a random key and accesses it from JSON.
      let keys = Object.keys(testQuestions);
      let randomKey = keys[Math.floor(Math.random() * keys.length)]
      return testQuestions[randomKey];
    } catch (e) { }
  };

  const [question, changeQuestion] = useState(loadQuestions());

  let [questionCounter, changeCounter] = useState(1);
  let [accuracy, changeAccuracy] = useState(0);
  let [accuracyColour, changeColour] = useState('red');
  let [correct, changeCorrect] = useState(0);
  let [wrong, changeWrong] = useState(0);

  // Calculates the user's accuracy during a test.
  function calculateAccuracy() {
    try {
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
      };

      if (accuracy > 100) {
        accuracy = 100;
      } else if (accuracy < 0) {
        accuracy = 0;
      };

      if (accuracy > 70) {
        changeColour('green');
      } else if (accuracy > 40) {
        changeColour('orange');
      } else {
        changeColour('red');
      }
      return accuracy;
    } catch (e) { }
  };

  function checkAnswer(question, answer) {
    try {
      if (question.correct === answer) {
        changeCorrect(correct + 1);
        changeCounter(questionCounter + 1);
        setTimeout(function () {
          resetColours();
          changeQuestion(loadQuestions());
        }, 1500);        
      } else {
        changeWrong(wrong + 1);
      }
      changeAccuracy(calculateAccuracy());
      return question.correct === answer;
    } catch (e) { }
  };

  const [testTopicTitle, changeTestTopicTitle] = useState('Maths');

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
    } catch (e) {}
  };

  function onRightPress() {
    try {
      switch (testTopicTitle.toLowerCase()) {
        case 'maths':
          changeTestTopicTitle('Verbal');
          break;
        case 'verbal':
          changeTestTopicTitle('Non-Verbal');
          break;
        case 'non-verbal':
          changeTestTopicTitle('Maths');
          break;
      }
    } catch (e) {}
  };


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
  });

  // Stylesheet for tests.
  const testStyles = StyleSheet.create({
    selection: {
      display: testMenuDisplay,
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0
    }
  });

  // Stylesheet for statistics.
  const statisticsStyles = StyleSheet.create({
    container: {
      display: displayStatistics
    }
  });

  // Stylesheet for about page.
  const aboutStyles = StyleSheet.create({
    container: {
      display: aboutDisplay,
      fontFamily: 'openSans',
      margin: '20%',
      fontSize: 20
    },
    text: {
      padding: '10%',
      borderWidth: 3,
      borderColor: "#42adf5",
      borderRadius: 10,
    }
  });


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
    questionCount: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white',
    },
    accuracy: {
      color: accuracyColour,
      fontWeight: 'bold',
      fontSize: 20
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
    }
  });

  const headers = StyleSheet.create({
    header: {
      position: 'absolute',
      top: 0,
      height: '10%',
      width: '100%',
      alignItems: 'center',
      backgroundColor: '#3A41C6',
      flexDirection: 'row',
      justifyContent: 'space-between'
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
      <View style={styles.options}>
        <Text style={{ fontWeight: 'bold' }}>Dark Theme</Text>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Erase Stored Data</Text>
      </View>

      {/* Default home page component. */}
      <View style={navigationStyles.home}>
        <NavigationButton text='Practice Quizzes' explainText='Practice topics at your own pace.' onPress={toQuizMenu} colour={'#3D3BBB'} />
        <NavigationButton text='Timed Tests' explainText='Take a timed test to test your abilities.' onPress={toTestMenu} colour={'#4634A7'} />
        <NavigationButton text='Progress Tracker' explainText='Track your past performance and see how you have improved.' onPress={toStatsMenu} colour={'#4C2C96'} />
        <NavigationButton text='About' explainText='Additional information for using the app.' onPress={toAboutPage} colour={'#512888'} />
      </View>

      {/* Menu for selecting what quiz you would like to do. */}
      <View style={navigationStyles.quizzes}>
        <Text style={styles.topText}></Text>
        <NavigationButton text='Maths' explainText='Lorem ipsum dolor sit amet, consectetur.' colour={'#3D3BBB'} onPress={function () {
          setHeader('Maths Quiz');
          changeQuizMenuDisplay('none');
          changeQuestionDisplay('flex');
        }} />
        <NavigationButton text='Verbal' explainText='Lorem ipsum dolor sit amet, consectetur.' colour={'#4634A7'} onPress={function () {
          setHeader('Verbal Quiz');
        }} />
        <NavigationButton text='Non-Verbal' explainText='Lorem ipsum dolor sit amet, consectetur' colour={'#4C2C96'} onPress={function () {
          setHeader('Non-Verbal Quiz');
        }} />
        <NavigationButton text='Mistakes' explainText='Practice the questions you have been having difficulty with.' colour={'#512888'} onPress={function () {
          setHeader('Mistakes');
        }} />
      </View>
      <View style={styles.quizContainer}>

        {/* <View style={styles.questionCountHeader}>
          <Text style={styles.correct}> {correct} </Text>
          <Text style={styles.questionCount}> Question {questionCounter}/50</Text>
          <Text style={styles.accuracy}> Accuracy {accuracy}%</Text>
          <Text style={styles.wrong}> {wrong} </Text>
        </View> */}

        <View style={styles.questionDescription}>
          <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>{question.description}</Text>
        </View>

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
        <TestTopicSelector text={testTopicTitle} leftPress={onLeftPress} rightPress={onRightPress}></TestTopicSelector>
        <NavigationButton text={testTopicTitle + ' Test 1'} colour={'#3D3BBB'} />
        <NavigationButton text={testTopicTitle + ' Test 2'} colour={'#4634A7'} />
        <NavigationButton text={testTopicTitle + ' Test 3'} colour={'#4C2C96'} />
        <NavigationButton text={testTopicTitle + ' Test 4'} colour={'#512888'} />
      </View>

      {/* Statistics */}
      <View style={statisticsStyles.container}>
        <DotGraph input={[2, 4, 6, 7]}></DotGraph>
      </View>


      {/* Component for the about section. */}
      {/* 'u2002' is the code for a bullet point, it is required to form an unordered list. */}
      <View style={aboutStyles.container}>
        <Text style={aboutStyles.text}>
          Thank you for using our app. This app has several features you can use: {'\n'}
          <Text>{'\u2022'} You can do a quiz which will contain a random selection of questions to practice.</Text> {'\n'}
          <Text>{'\u2022'} You can also take tests on certain topics to test your knowledge. </Text> {'\n'}
          <Text>{'\u2022'} You can see the results of the tests you do in the statistics page. </Text> {'\n'}
        </Text>
      </View>
    </View>
  );
}
