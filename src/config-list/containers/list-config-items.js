import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ItemList } from '../components/item-list';
import { fetchRootPreferences, fetchOpenItem, closeItemAction, dragStartAction } from '../../actions';

class ListConfigItems extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loading !==  this.props.loading) {
            this.props.eventLoading(newProps.loading);
        }
    }

    render() {
        return (
            <>
                <ItemList
                    preferences={this.props.preferences}
                    initList={this.props.initList}
                    openItem={this.props.openItem}
                    closeItem={this.props.closeItem}
                    dragOver={this.props.dragOver}
                />
            </>
        );
    }
}

function mapStateToProps (state) {
    return {
        preferences: state.listPreferences.preferences,
        loading: state.listPreferences.loading,
        error: state.listPreferences.error
    };
}

function mapDispatchToProps (dispatch) {
    return {
        initList: () => { dispatch(fetchRootPreferences()); },
        openItem: (elementId) => { dispatch(fetchOpenItem(elementId)); },
        closeItem: (elementId) => { dispatch(closeItemAction(elementId)); },
        dragOver: (elementId) => { dispatch(dragStartAction(elementId)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListConfigItems);