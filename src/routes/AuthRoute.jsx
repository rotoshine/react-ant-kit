import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


const AuthRoute = ({ component, ...props }) => {
  if(!props.currentUser.isLoggedIn) {
    return <Redirect to="/auth/login" />
  }

  return <Route {...props} component={component} />
};

function mapStateToProps (state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(AuthRoute);
