import React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../utils/colors';

export function ConfirmModalComponent({isVisible, infoText, onPressConfirm, confirmText, onPressCancel, cancelText}) {
    return (
        <Modal style={styles.modal} isVisible={isVisible}>
            <Text style={styles.information}>{infoText}</Text>
            <TouchableOpacity
                onPress={onPressConfirm}
                style={styles.button}>
                <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPressCancel}
                style={styles.button}>
                <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: colors.light
    },
    information: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30
    },
    button: {
        backgroundColor: colors.primary,
        marginTop: 30,
        marginRight: 15,
        marginBottom: 30,
        borderRadius: 5,
        padding: 10,
        width: '40%',
        marginLeft: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: colors.light
    }
});