import React from 'react';
import {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import colors from '../../../utils/colors';
import {connect} from 'react-redux';
import {addDeck} from '../../../store/actions';
import {InputComponent} from '../../../components/input.component';
import {ButtonComponent} from '../../../components/button.component';
import * as screens from '../../../utils/screens-names'

class AddNewDeckScreen extends Component {

    constructor(props) {
        super(props);
    }

    state = {deckTitle: '', defaultValue: 'Deck title', errorMessage: ''};

    render = () => <View style={styles.container}>
        <Text style={styles.information}>What is the title of your deck?</Text>
        <InputComponent
            onChange={(value) => this.setState({deckTitle: value, errorMessage: ''})}
            value={this.state.deckTitle}
            placeholder={this.state.defaultValue}
            errorMessage={this.state.errorMessage}
            additionalStyles={this.state.errorMessage.length > 0 ? {input: {borderColor: colors.danger}} : {}} />
        <ButtonComponent
            onPress={this.onPress}
            buttonText={'Submit'} />
    </View>;

    onPress = () => {
        if (this.state.deckTitle !== '') {
            const newDeck = {title: this.state.deckTitle, questions: []};
            const {navigate} = this.props.navigation;
            this.props.addDeck(newDeck);
            navigate(screens.DECK_DETAIL, {deck: newDeck});
            this.setState({deckTitle: ''});
        } else {
            this.setState({errorMessage: 'Please fill in a title for your deck, before submitting'});
        }
    };

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        flex: 1
    },
    information: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30
    }
});

function mapDispatchToProps(dispatch) {
    return {
        addDeck: (newDeck) => dispatch(addDeck(newDeck))
    }
}

export default connect(
    undefined,
    mapDispatchToProps
)(AddNewDeckScreen);