import * as React from 'react';
import {View, StyleSheet, Dimensions, StatusBar, KeyboardAvoidingView} from 'react-native';
import DeckListScreen from "./src/screens/decks/DeckList/DeckList";
import colors from "./src/utils/colors";
import {Constants} from 'expo';
import AddNewDeckScreen from "./src/screens/decks/AddNewDeck/AddNewDeck";
import {Platform} from "react-native";
import {TabNavigator, StackNavigator} from 'react-navigation';
import DeckDetailScreen from "./src/screens/decks/DeckDetail/DeckDetail";
import {QuizScreen} from "./src/screens/cards/Quiz/Quiz";
import AddNewCardScreen from "./src/screens/cards/AddNewCard/AddNewCard";
import {store} from "./src/store/configureStore";
import {Provider} from "react-redux";
import {MaterialCommunityIcons, Feather} from '@expo/vector-icons';


const AppStatusBar = () => (
    <View style={{height: Constants.statusBarHeight, backgroundColor: colors.dark}}>
        <StatusBar/>
    </View>
);

const Tabs = TabNavigator({
    DeckList: {
        screen: DeckListScreen,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor}/>,
        },
    },
    AddNewDeck: {
        screen: AddNewDeckScreen,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({tintColor}) => <Feather name='plus-square' size={25} color={tintColor}/>
        },
    }
}, {
    tabBarOptions: {
        activeTintColor: colors.dark,
        inactiveTintColor: colors.dark,
        activeBackgroundColor: colors.light,
        indicatorStyle: {
            borderBottomColor: colors.danger,
            borderBottomWidth: 2,
            backgroundColor: colors.transparent,
        },
        style: {
            paddingTop: Platform.OS === 'ios' ? 0 : 20,
            backgroundColor: colors.light,
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
});

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: null,
        }
    },
    DeckDetail: {
        screen: DeckDetailScreen
    },
    Quiz: {
        screen: QuizScreen
    },
    AddNewCard: {
        screen: AddNewCardScreen,
    }
});

export default class App extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <Provider store={store}>
                <KeyboardAvoidingView style={styles.container} behaviour={'padding'}>
                    <AppStatusBar/>
                    <MainNavigator ref={nav => {
                        this.navigator = nav;
                    }}/>
                </KeyboardAvoidingView>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light
    }
});