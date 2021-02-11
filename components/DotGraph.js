import React from 'react';
import { StyleSheet, View } from 'react-native';

function addDataToGraph(data) {
    let calculatePosition = function () {
        return {height: '10%', width: '10%', backgroundColor: 'red'}
    }

    data.forEach(element => {
        React.createElement(View, {});
    });
}

export default function DotGraph({input}) {

    addDataToGraph(input);
    return (
        <View style={styles.dotGraph} >
           
        </View>
    )
}

const styles = StyleSheet.create({
    dotGraph: {
        width: '80%',
        height: '50%',
        backgroundColor: 'lightgrey'
    },
    data: {
        width: '10%',
        height: '10%',
        backgroundColor: 'blue'
    }
})