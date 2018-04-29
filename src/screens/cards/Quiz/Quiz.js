import React from 'react';
import {Component} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import colors from '../../../utils/colors';
import {clearLocalNotifications, setLocalNotification} from '../../../utils/helpers';
import {ButtonComponent} from '../../../components/button.component';
import {QuizResultComponent} from './components/results.component';
import * as screens from '../../../utils/screens-names';
import {QuizGameComponent} from './components/game.component';
import {QuizNoQuestionsComponent} from './components/no-questions.component';

export class QuizScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `Quiz: ${navigation.state.params.deck.title}`,
        headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
        headerStyle: {
            backgroundColor: colors.light,
            borderBottomColor: colors.dark
        }
    });

    state = {
        selectedQuestion: 0,
        showAnswer: false,
        correctAnswers: 0
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({value}) => this.value = value);
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        });
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        });
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        });
        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        });
    }

    componentWillUnmount() {
        this.animatedValue.removeAllListeners();
    }

    handleClick = () => {
        this.setState({showAnswer: !this.state.showAnswer});
        if (this.value >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start();
        }
    };

    correctAnswers = () => {
        this.setState({
            correctAnswers: this.state.correctAnswers + 1
        });
        this.nextQuestion();
    };

    nextQuestion = () => {
        this.setState({
            selectedQuestion: this.state.selectedQuestion + 1,
            showAnswer: false
        });
        this.animatedValue.setValue(0);
        const {deck} = this.props.navigation.state.params;
        if (deck.questions.length - 1 <= this.state.selectedQuestion) {
            clearLocalNotifications().then(setLocalNotification());
        }
    };

    reset = () => this.setState({selectedQuestion: 0, correctAnswers: 0});

    render = () => {
        const {deck} = this.props.navigation.state.params;
        const result = this.state.correctAnswers / deck.questions.length;
        const frontAnimatedStyle = {
            opacity: this.frontOpacity,
            transform: [{rotateY: this.frontInterpolate}]
        };
        const backAnimatedStyle = {
            opacity: this.backOpacity,
            transform: [{rotateY: this.backInterpolate}]
        };
        return (
            <View style={styles.container}>
                {this.state.selectedQuestion + 1 <= deck.questions.length && (
                    <View style={styles.questionCount}>
                        <Text>
                            {this.state.selectedQuestion + 1}/{deck.questions.length}
                        </Text>
                    </View>
                )}

                <View style={styles.container}>
                    {deck.questions.length === 0 && <QuizNoQuestionsComponent onBack={this.backToDeckScreen}/> }
                    {deck.questions.length > 0 && deck.questions.length <= this.state.selectedQuestion ?
                        (<QuizResultComponent
                            result={result}
                            correctAnswers={this.state.correctAnswers}
                            noQuestions={deck.questions.length}
                            onRestart={this.reset}
                            onBack={this.backToDeckScreen}
                        />) :
                        (<QuizGameComponent
                            deck={deck}
                            selectedQuestion={this.state.selectedQuestion}
                            showAnswer={this.state.showAnswer}
                            frontAnimatedStyle={frontAnimatedStyle}
                            backAnimatedStyle={backAnimatedStyle}
                            handleClick={this.handleClick}
                            correctAnswers={this.correctAnswers}
                            nextQuestion={this.nextQuestion}
                        />)
                    }
                </View>
            </View>
        );
    };

    backToDeckScreen = () => {
        const {deck} = this.props.navigation.state.params;
        this.props.navigation.navigate(screens.DECK_DETAIL, {deck});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light
    },
    questionCount: {
        flex: -1,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 15
    },
    score: {
        fontSize: 25,
        textAlign: 'center',
        padding: 10
    },
    correct: {
        fontSize: 18,
        textAlign: 'center'
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 5,
        color: colors.dark
    },
    message: {
        textAlign: 'center',
        fontSize: 18
    },
    icon: {
        textAlign: 'center',
        fontSize: 50,
        marginTop: 10
    }
});