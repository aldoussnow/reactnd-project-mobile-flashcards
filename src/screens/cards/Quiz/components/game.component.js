import React from 'react';
import colors from '../../../../utils/colors';
import {ButtonComponent} from '../../../../components/button.component';
import {StyleSheet, Text, View, Animated} from 'react-native';


export function QuizGameComponent({deck, selectedQuestion, showAnswer, frontAnimatedStyle, backAnimatedStyle, handleClick, correctAnswers, nextQuestion}) {
    return (
        deck.questions
            .filter((question, i) => i === selectedQuestion)
            .map((question, i) => (
                <View key={'question' + i}>
                    {!showAnswer ? (
                        <Animated.View style={[frontAnimatedStyle, styles.shadow]}>
                            <Text style={styles.information}>{question.question}</Text>
                            <ButtonComponent
                                onPress={handleClick}
                                buttonText={'Show answer'}
                                additionalStyles={{button: {marginLeft: 5, backgroundColor: colors.transparent}, text: {color: colors.dark}}}/>
                        </Animated.View>
                    ) : (
                        <Animated.View style={[backAnimatedStyle, styles.flipCardBack]}>
                            <Text style={styles.information}>{question.answer}</Text>
                            <ButtonComponent
                                onPress={handleClick}
                                buttonText={'Show question'}
                                additionalStyles={{button: {marginLeft: 5, backgroundColor: colors.transparent}, text: {color: colors.dark}}}/>
                        </Animated.View>
                    )}
                    <ButtonComponent
                        onPress={correctAnswers}
                        buttonText={'Correct'}
                        additionalStyles={{button: {backgroundColor: colors.success}}}
                    />
                    <ButtonComponent
                        onPress={nextQuestion}
                        buttonText={'Incorrect'}
                        additionalStyles={{button: {backgroundColor: colors.danger}}}
                    />
                </View>
            ))

    );
}

const styles = StyleSheet.create({
    information: {
        fontSize: 25,
        textAlign: 'center',
        color: colors.dark
    },
    shadow: {
        borderColor: colors.dark,
        borderWidth: 1,
        elevation: 2,
        minHeight: 200,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginLeft: '10%',
        marginBottom: 10,
        borderRadius: 2,
        backgroundColor: colors.white
    },
    flipCardBack: {
        borderRadius: 2,
        borderColor: colors.dark,
        borderWidth: 1,
        elevation: 2,
        minHeight: 200,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginLeft: '10%',
        marginBottom: 10,
        backgroundColor: colors.light
    }
});