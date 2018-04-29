import React from 'react';
import {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import colors from '../../../utils/colors';
import {connect} from 'react-redux';
import {receiveDecks} from '../../../store/actions';
import * as api from '../../../utils/api';
import * as screens from '../../../utils/screens-names'
import {DeckListComponent} from './components/list.component';
import {ButtonComponent} from '../../../components/button.component';


class DeckListScreen extends Component {

    render = () => {
        const {decks} = this.props;
        return (<View style={styles.container}>
            <Text style={styles.information}>Deck List</Text>
            {decks.length === 0 ? (
                <View>
                    <Text style={styles.title}>No Decks available, please add a deck!</Text>
                    <ButtonComponent
                        onPress={this.addNewDeck}
                        buttonText={'Add deck'}
                    />
                </View>
            ) : (<FlatList
                data={this.props.decks}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.title}
            />)}

        </View>);
    };

    renderItem = ({item}) => {
        return (
            <DeckListComponent
                key={item.title}
                item={item}
                onPress={() => this.navigateToDeckDetail(item)}/>
        );
    };

    componentDidMount() {
        this.props.fetchDecks();
    }


    addNewDeck = () => this.props.navigation.navigate(screens.ADD_NEW_DECK);

    navigateToDeckDetail = (item) => this.props.navigation.navigate(screens.DECK_DETAIL, {deck: item})

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.primary
    },
    information: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30
    }
});

function mapStateToProps(state) {
    return {
        decks: Object.keys(state).map((key) => ({
            title: state[key].title,
            questions: state[key].questions
        }))
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDecks: () => api.getDecks().then(decks => dispatch(receiveDecks(decks)))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckListScreen)