import React from 'react';
import { connect } from 'react-redux';

export class DashboardPage extends React.Component {  
  render() {
    return (
      <div>
        Hello World!
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(DashboardPage);
