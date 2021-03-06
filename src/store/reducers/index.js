import {
    RECEIVE_DECKS,
    ADD_DECK,
    ADD_CARD_TO_DECK,
} from '../actions/index';

function reducers (state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            };
        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]: {
                    ...action.deck,
                }
            };
        case ADD_CARD_TO_DECK:
            const { card, deck } = action.payload;
            return {
                ...state,
                [deck]: {
                    ...state[deck],
                    questions: [
                        ...state[deck]['questions'],
                        card,
                    ]
                }
            };
        default:
            return state;
    }
}

export default reducers;