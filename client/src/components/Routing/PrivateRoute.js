import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  profile,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={
        (props) => {
          if (!isAuthenticated && !loading) {
            return <Redirect to='/login' />;
          } else {
            return <Component {...props} />;
          }
        }

        // !isAuthenticated && !loading ? (
        //   <Redirect to='/login' />
        // ) : (
        //   <Component {...props} />
        // )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile.profile,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
