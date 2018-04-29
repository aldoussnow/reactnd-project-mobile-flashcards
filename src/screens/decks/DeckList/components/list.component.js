import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../../utils/colors';


export function DeckListComponent({item, onPress}) {
    return item && item.questions ? (<View style={styles.renderItem}>
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.cardCount}>{`${item.questions.length} cards`}</Text>
            <View style={styles.border}/>
        </TouchableOpacity>
    </View>) : <View></View>;
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.primary
    },
    cardCount: {
        color: colors.primary,
        textAlign: 'center',
        marginTop: 20
    },
    border: {
        marginTop: 20,
        backgroundColor: colors.primary,
        height: 1,
        width: '100%'
    },
    renderItem: {
        paddingTop: 20,
        paddingBottom: 20
    }
});