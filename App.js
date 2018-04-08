import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import {DeckListScreen} from "./src/screens/decks/DeckList/DeckList";
import colors from "./src/utils/colors";
import { Constants } from 'expo';
import {AddNewDeckScreen} from "./src/screens/decks/AddNewDeck/AddNewDeck";

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

const FirstRoute = () => <DeckListScreen/>;
const SecondRoute = () => <AddNewDeckScreen/>;

export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'decks', title: 'Decks' },
            { key: 'newDeck', title: 'New Decks' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => <TabBar
        {...props}
        style={styles.tabs}
        labelStyle={styles.label}
    />;

    _renderScene = SceneMap({
        decks: FirstRoute,
        newDeck: SecondRoute,
    });

    render() {
        return (
            <TabViewAnimated
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
            />
        );
    }
}

const styles = StyleSheet.create({
    tabs: {
        backgroundColor: colors.light,
        marginTop: Constants.statusBarHeight,
        borderBottomWidth: 0
    },
    label: {
        color: colors.primary
    }
});