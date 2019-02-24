import React, { Component } from 'react';
import { Item } from './item';
import './item-list.scss';

export class ItemList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    id: 0,
                    icon: 'group',
                    title: 'Must have',
                    must: true,
                    list: [
                        {
                            id: 1,
                            icon: 'settings',
                            title: 'CEO Full time'
                        },
                        {
                            id: 2,
                            icon: 'devices',
                            title: '$1M <= Round < $10M'
                        }
                    ]
                }
            ]
        };
    }

    componentDidMount() {
        this.props.initList();
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
                    open={item.open}
                    header={item.header}
                    title={item.title}
                    icon={item.icon}
                    must={!!item.must}
                    openItem={this.props.openItem}
                    closeItem={this.props.closeItem}
                    />
                </div>
                <>
                {list}
                </>
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