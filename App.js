import * as React from 'react';
import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import {DeckListScreen} from "./src/screens/decks/DeckList/DeckList";
import colors from "./src/utils/colors";
import {Constants} from 'expo';
import {AddNewDeckScreen} from "./src/screens/decks/AddNewDeck/AddNewDeck";
import * as Platform from "react-native";
import { TabNavigator, StackNavigator } from 'react-navigation';
import {DeckDetailScreen} from "./src/screens/decks/DeckDetail/DeckDetail";
import {QuizScreen} from "./src/screens/cards/Quiz/Quiz";
import {AddNewCardScreen} from "./src/screens/cards/AddNewCard/AddNewCard";

const AppStatusBar = () => (
    <View style={{height: Constants.statusBarHeight}}>
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
        activeTintColor: colors.light,
        inactiveTintColor: colors.light,
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
        screen: DeckDetailScreen,
        navigationOptions: {
            headerStyle: {
                paddingTop: 0,
            }
        }
    },
    Quiz: {
        screen: QuizScreen,
    },
    AddNewCard: {
        screen: AddNewCardScreen,
    },
});

export default class App extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <AppStatusBar/>
                <MainNavigator ref={nav => {
                    this.navigator = nav;
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});