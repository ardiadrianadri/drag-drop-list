import React, { Component } from 'react';
import classNames from 'classnames';
import './item.scss';

export class Item extends Component {

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
        this.setState({ open: !this.state.open }, () => {
            if (this.state.open) {
                this.props.openItem(this.props.id);
            } else {
                this.props.closeItem(this.props.id);
            }
        });
    }

    handleKeyExpand (event) {
        if (event.keyCode === 13) {
            this.handleExpand();
        }
    }

    render() {
        let icon = null;
        if (this.state.header) {
            icon = (this.state.open) ? 'remove' : 'add';
        }

        return (
            <div className="item">
                <span className="expand material-icons mr-3" onClick={this.handleExpand.bind(this)} onKeyUp={this.handleKeyExpand.bind(this)} tabIndex="0" >{icon}</span>
                <span className={classNames("icon", "material-icons", " mr-5", {"must": this.props.must})}>{this.props.icon}</span>
                <span className="title">{this.props.title}</span>
                <span className="menu material-icons ml-auto" tabIndex="0">more_vert</span>
            </div>
        );
    }
}