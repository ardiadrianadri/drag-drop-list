import React, { Component } from 'react';
import { ItemList } from '../components/item-list';

export class ListConfigItems extends Component {
    render() {
        return (
            <>
                <ItemList open={true} icon="group" title="Must have" header="true"/>
            </>
        );
    }
}