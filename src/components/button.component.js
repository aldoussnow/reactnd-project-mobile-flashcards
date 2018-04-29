import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../utils/colors';
import * as React from 'react';


export function ButtonComponent({onPress, buttonText, additionalStyles = {}}) {
    additionalStyles.button = additionalStyles.button || {};
    additionalStyles.text = additionalStyles.text || {};
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, additionalStyles.button]}>
            <Text style={[styles.buttonText, additionalStyles.text]}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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