import React from 'react';
import colors from '../../../../utils/colors';
import {ButtonComponent} from '../../../../components/button.component';
import {StyleSheet, Text, View} from 'react-native';


export function QuizNoQuestionsComponent({onBack}) {
    return (
        <View>
            <View style={styles.shadow}>
                <Text style={styles.information}>
                    Your deck has no questions yet. Please add a question/card to
                    your deck, so you can start the quiz.
                </Text>
            </View>
            <ButtonComponent
                onPress={onBack}
                buttonText={'Go back'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    information: {
        fontSize: 25,
        textAlign: 'center',
        padding: 10,
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
    }
});