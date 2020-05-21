import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { itemsFetchData } from '../actions/items';

export class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData('http://5af1eee530f9490014ead8c4.mockapi.io/items');
    }

    render() {
        const renderList = (list) => {
            return (
                <ul>
                    {list.map((item) => (
                        <li key={item.id}>
                            {item.label}
                            {item.children ? renderList(item.children) : null}
                        </li>)
                    )}
                </ul>
            )
        }

        return renderList(this.props.items);
    }
}

ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
};

export const getFiltredList = createSelector(
    state => state.items,
    items => items.filter(item => {
        item.children = [];
        for (let child of items) {
            if (item.id === child.parent_id) {
                item.children.push(child);
            }
        }
        if (item.parent_id === 0) {
            if (item.children.length === 0) {
                delete item.children
            }
            return item;
        }
    })
)

const mapStateToProps = (state) => {
    return {
        items: getFiltredList(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
