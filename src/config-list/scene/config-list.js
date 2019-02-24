import React, { Component } from 'react';
import ListConfigItems from '../containers/list-config-items';
import { Loading } from '../components/loading';

export class ConfigList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }
  
  loadingHandler(loading) {
    this.setState({ loading: loading } );
  }
  render() {
    const loadingImage = (this.state.loading) ? <Loading /> : null;
    return (
      <>
        {loadingImage}
        <div className="config-list">
          <ListConfigItems eventLoading={this.loadingHandler.bind(this)}/>
        </div>
      </>
    );
  }
}
