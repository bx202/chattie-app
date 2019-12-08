import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Chat from '../containers/Chat';

const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.node.isRequired,
};

const AppRouter = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/chat" />} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/chat" component={Chat} isLoggedIn={isLoggedIn} />
      </Switch>
    </BrowserRouter>
  );
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps)(AppRouter);
