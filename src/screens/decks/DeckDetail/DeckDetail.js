import React from 'react';
import { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../../utils/colors';
import {ButtonComponent} from '../../../components/button.component';
import * as screens from '../../../utils/screens-names'

export default class DeckDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Deck: ${navigation.state.params.deck.title}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor: colors.light,
            borderBottomColor: colors.dark
        }
    });

    constructor(props) {
        super(props);
    }

    render = () => {
        const {deck} = this.props.navigation.state.params;
        return deck ? (
            <View style={styles.container}>
                <Text style={styles.information}>{deck.title}</Text>
                <Text style={styles.cardCount}>{`${deck.questions.length} cards`}</Text>
                <ButtonComponent
                    onPress={this.addCard}
                    buttonText={'Add Card'} />
                <ButtonComponent
                    onPress={this.startQuiz}
                    buttonText={'Start Quiz'} />
            </View>
        ) : <View><Text>Deck was not found!</Text></View>;
    };

    addCard = () => {
        const {title} = this.props.navigation.state.params.deck;
        this.props.navigation.navigate(screens.ADD_NEW_CARD, { title })
    };

    startQuiz = () => {
        const {deck} = this.props.navigation.state.params;
        this.props.navigation.navigate(screens.QUIZ, { deck });
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        flex: 1,
        alignContent: 'center'
    },
    cardCount: {
        color: colors.primary,
        textAlign: 'center',
        marginTop: 20
    },
    information: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30
    }
});