import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import { Item } from './item';
import './item-list.scss';

export class ItemList extends Component {

    constructor(props) {
        super(props);

        props.initList();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    renderList(item) {
        let items;
        let list;
        
        if (item.list) {
            items = item.list.map((subitem) => {
                return (
                    <li className="item-bullet" key={subitem.id}>{this.renderList.call(this, subitem)}</li>
                );
            });

            list = (
                <ul className="list" key={item.id}>
                    {items}
                </ul>
            );
        }
        
        return (
            <div className="group-list" key={item.id}>
                <div className="header" key={item.id}>
                    <Item
                    key={item.id}
                    id={item.id}
                    open={item.open}
                    header={item.header}
                    title={item.title}
                    icon={item.icon}
                    must={!!item.must}
                    openItem={this.props.openItem}
                    closeItem={this.props.closeItem}
                    />
                </div>
                <Collapse isOpen={item.open}>
                {list}
                </Collapse>
            </div>
        );
    }

    render() {
        return (
            <>
                {this.props.preferences.map(this.renderList.bind(this))}
            </>
        );
    }
}