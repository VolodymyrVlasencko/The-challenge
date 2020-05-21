import combineReducers from '../reducers';
import { items } from '../reducers/items'

describe('Reducer works correct', () => {

    it('Should return state', () => {
        const provider = items(undefined, {});
        const initialState = [];
        expect(provider).toEqual(initialState)
    })

})
