import { AsyncStorage } from 'react-native'

export function getDecks () {
    return new Promise((resolve, reject) => {
        return AsyncStorage.getAllKeys((error, keys) =>
            AsyncStorage.multiGet(keys, (error, stores)=> {
                if (error) {
                    reject(error);
                }
                resolve(stores.map((result, i, store)=> ({key: store[i][0], value: stores[i][1]})));
            })
        );
    });
}

export function getDeck (key) {
    return AsyncStorage.getItem(key);
}

export function saveDeckTitle (title) {
    return AsyncStorage.setItem(title, JSON.stringify({title}));
}

export function addCardToDeck (title, card) {
    return new Promise((resolve, reject) => {
        getDecks(title).then((cards) => {
            return saveDeckTitle([...cards, card])
        }, (error)=> reject(error))
            .then(()=> resolve());
    })
}