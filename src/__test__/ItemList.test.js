import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import { ItemList, getFiltredList } from '../components/ItemList';

const mockStore = configureStore([]);

describe('ItemList Component', () => {
    let store;
    let provider;

    beforeEach(() => {
        const initialState = {
            items: [{
                "id": 1,
                "label": "List item 1",
                "parent_id": 0
            },
            {
                "id": 2,
                "label": "List item 2",
                "parent_id": 0
            }]
        };

        store = mockStore(initialState);

        store.dispatch = jest.fn();

        provider = renderIntoDocument(
            <Provider store={ store }>
                <ItemList items = { initialState.items } fetchData = { itemsFetchData } />
            </Provider>
        );
    });

    it('Should render with given props', () => {
        const props = provider.props.children.props;
        expect(Object.keys(props)).toEqual(['items', 'fetchData']);
    });

    it('Should dispatch action', () => {
        provider.store.dispatch(itemsFetchData());
        expect(store.dispatch).toHaveBeenCalled();
    });

    it('Selector should return array', () => {
        const props = provider.props.children.props;
        const newState = {
            items: [{
                "id": 1,
                "label": "List item 1",
                "parent_id": 0
            },
            {
                "id": 2,
                "label": "List item 2",
                "parent_id": 0
            },
            {
                "id": 3,
                "label": "List item 3",
                "parent_id": 0
            }]
        }

        expect(getFiltredList(newState).length).toEqual(3);
    });

})
