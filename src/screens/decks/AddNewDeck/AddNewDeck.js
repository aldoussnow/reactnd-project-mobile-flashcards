import React from 'react';
import { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import colors from "../../../utils/colors";

export class AddNewDeckScreen extends Component {

    constructor(props) {
        super(props);
    }

    state = { deckTitle: '', defaultValue: 'Deck title' };

    render = () => <View style={styles.container}>
        <Text style={styles.information}>What is the title of your deck?</Text>
        <TextInput
            style={styles.input}
            placeholder={this.state.defaultValue}
            onChangeText={(text) => this.setState({deckTitle: text})}
            value={this.state.deckTitle}/>
        <TouchableHighlight
            style={styles.button}
            onPress={this.onPress}>
            <Text
                style={styles.buttonText}>
                Submit
            </Text>
        </TouchableHighlight>
    </View>;

    onPress = () => console.log('hallo')
}

const styles = StyleSheet.create({
    container: {},
    information: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30
    },
    input: {
        height: 40,
        borderColor: colors.primary,
        borderWidth: 1,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {
        backgroundColor: colors.primary,
        marginTop: 30,
        marginLeft: '30%',
        marginRight: 15,
        borderRadius: 5,
        padding: 10,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: colors.light,
        textAlign: 'center'
    }
});