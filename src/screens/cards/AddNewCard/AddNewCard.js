import React from 'react';
import {Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../../utils/colors';
import {addCardToDeck, addDeck} from '../../../store/actions';
import {connect} from 'react-redux';
import {ConfirmModalComponent} from '../../../components/confirm-modal.component';
import {ButtonComponent} from '../../../components/button.component';
import {InputComponent} from '../../../components/input.component';

class AddNewCardScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Deck: ${navigation.state.params.title}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor: colors.light,
            borderBottomColor: colors.dark
        }
    });

    state = {
        question: '',
        answer: '',
        errorMessages: {
            question:'',
            answer:''
        },
        modalVisible: false
    };

    constructor(props) {
        super(props);
    }

    render = () => {
        const {question, errorMessages, answer, modalVisible} = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.information}>Please add a card</Text>
                <InputComponent
                    onChange={(question) => this.handleChange(question, 'question')}
                    value={question}
                    placeholder={'Add Question'}
                    errorMessage={errorMessages.question}
                    additionalStyles={errorMessages.question.length > 0 ? {input: {borderColor: colors.danger}} : {}}
                />
                <InputComponent
                    onChange={(answer) => this.handleChange(answer, 'answer')}
                    value={answer}
                    placeholder={'Add answer'}
                    errorMessage={errorMessages.answer}
                    additionalStyles={errorMessages.answer.length > 0 ? {input: {borderColor: colors.danger}} : {}}
                />
                <ButtonComponent
                    onPress={this.onPress}
                    buttonText={'Submit'}/>
                <ConfirmModalComponent
                    isVisible={modalVisible}
                    infoText={'Do you want to start to play or add another card'}
                    onPressConfirm={this.onConfirmModal}
                    confirmText={'Start to play'}
                    onPressCancel={this.onCancelModal}
                    cancelText={'Add another card'} />
            </View>
        );
    };

    onPress = ()=> {
        const {answer, question} = this.state;
        if (answer.length > 0 && question.length > 0) {
            this.props.addCard({question, answer}, this.props.navigation.state.params.title);
            this.setState({modalVisible: true, answer: '', question: ''});
        } else {
            this.setState({
                errorMessages: {
                    question: question.length === 0 ? 'Please fill out the question before submitting' : '',
                    answer: answer.length === 0 ? 'Please fill out the answer before submitting' : ''
                }
            })
        }
    };

    handleChange = (val, type) => {
        let state = {};
        switch (type) {
            case 'question':
                state = {
                    question: val,
                    errorMessages: {
                        question: '',
                        answer: this.state.errorMessages.answer
                    }
                };
            break;
            case 'answer':
                state = {
                    answer: val,
                    errorMessages: {
                        question: this.state.errorMessages.question,
                        answer: ''
                    }
                };
                break;
        }
        this.setState(state);
    };

    onConfirmModal = () => {
        const {navigate} = this.props.navigation;
        this.setState({
            modalVisible: false
        });
        navigate('DeckList');
    };

    onCancelModal = () => {
        this.setState({
            modalVisible: false,
            answer: '',
            question: '',
            errorMessages: {
                question:'',
                answer:''
            }
        });
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light
    },
    information: {
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30
    }
});

function mapDispatchToProps(dispatch) {
    return {
        addCard: (newCard, deckTitle) => dispatch(addCardToDeck(newCard, deckTitle))
    }
}

export default connect(
    undefined,
    mapDispatchToProps
)(AddNewCardScreen);

