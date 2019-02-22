import React, { Component } from 'react';
import classNames from 'classnames';
import './item-list.scss';

export class ItemList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            header: false,
        }
    }

    componentDidMount() {
        this.setState({open: !!this.props.open });
        this.setState({header: !!this.props.header})
    }

    handleExpand() {
        this.setState({ open: !this.state.open });
    }

    render() {
        let icon = null;
        if (this.state.header) {
            icon = (this.state.open) ? 'add' : 'remove';
        }

        return (
            <div className="item-list">
                <span className="expand material-icons mr-3" onClick={this.handleExpand.bind(this)}>{icon}</span>
                <span className={classNames("icon", "material-icons", " mr-5", {"must": this.state.header})}>{this.props.icon}</span>
                <span className="title">{this.props.title}</span>
                <span className="menu material-icons ml-auto">more_vert</span>
            </div>
        );
    }
}