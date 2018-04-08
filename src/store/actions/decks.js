import {ADD_CARD_TO_DECK, ADD_DECK, RECEIVE_DECKS} from "./types";

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

export function addCardToDeck (card, deck) {
    return {
        type: ADD_CARD_TO_DECK,
        payload: {
            card,
            deck,
        }
    }
}