import React from 'react';
import { connect } from 'react-redux';

export class HelloPage extends React.Component {
  render () {
    return (
      <div>
        Hello~~~~
      </div>
    );
  }
}

export default connect()(HelloPage);
