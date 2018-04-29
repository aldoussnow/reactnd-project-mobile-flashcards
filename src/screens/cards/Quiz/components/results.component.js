import React from 'react';
import colors from '../../../../utils/colors';
import {ButtonComponent} from '../../../../components/button.component';
import {Entypo} from '@expo/vector-icons';
import {StyleSheet, Text, View} from 'react-native';


export function QuizResultComponent({result, correctAnswers, noQuestions, onRestart, onBack}) {
    return (<View>
            <Text style={styles.correct}>
                {`You answered ${correctAnswers} out of ${noQuestions} questions correctly`}.
            </Text>
            <Text style={styles.score}>
                {`Your Score: ${(correctAnswers / noQuestions * 100).toFixed(0)}%`}
            </Text>
            {result < .6 && (
                <View>
                    <Text style={styles.message}>
                        You need some more practice!
                    </Text>
                    <Entypo
                        style={styles.icon}
                        name='emoji-sad'
                        size={100}
                        color={colors.danger}
                    />
                </View>
            )}
            {result > .8 && result < 1 && (
                <View>
                    <Text style={styles.message}>Not bad!</Text>
                    <Entypo
                        style={styles.icon}
                        name='emoji-happy'
                        size={100}
                        color={colors.orange}
                    />
                </View>
            )}

            {result === 1 && (
                <View>
                    <Text style={styles.message}>
                        Well done, you are a master of this material!
                    </Text>
                    <Entypo
                        style={styles.icon}
                        name='emoji-happy'
                        size={100}
                        color={colors.success}
                    />
                </View>
            )}

            <ButtonComponent
                onPress={onRestart}
                buttonText={'Restart quiz'}/>

            <ButtonComponent
                onPress={onBack}
                buttonText={'Back'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    score: {
        fontSize: 25,
        textAlign: 'center',
        padding: 10,
        marginBottom: 15,
        marginRight: 15,
        marginLeft: 15
    },
    correct: {
        marginTop: 15,
        marginBottom: 15,
        marginRight: 15,
        marginLeft: 15,
        fontSize: 18,
        textAlign: 'center'
    },
    message: {
        textAlign: 'center',
        fontSize: 18,
        marginRight: 15,
        marginLeft: 15
    },
    icon: {
        textAlign: 'center',
        fontSize: 100,
        marginTop: 10
    }
});