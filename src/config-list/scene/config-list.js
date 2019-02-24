import React, { Component } from 'react';
import ListConfigItems from '../containers/list-config-items';

export class ConfigList extends Component {

    render () {
        return (
            <div className="config-list">
                <ListConfigItems />
            </div>
        );
    }
}