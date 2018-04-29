import {StyleSheet, Text, TextInput, View} from 'react-native';
import colors from '../utils/colors';
import * as React from 'react';


export function InputComponent({onChange, value, placeholder, errorMessage, additionalStyles= {}}) {
    additionalStyles.input = additionalStyles.input || {};
    return (
        <View>
            <TextInput
                onChangeText={onChange}
                style={[styles.input, additionalStyles.input]}
                value={value}
                placeholder={placeholder}
                underlineColorAndroid={colors.dark}/>
            <View>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: colors.dark,
        borderWidth: 1,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMessage: {
        color: colors.danger,
        backgroundColor: colors.transparent,
        marginLeft: 15,
        marginRight: 15
    }
});