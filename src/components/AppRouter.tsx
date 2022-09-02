import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { restore, logout } from '../store/slices';
import { RootState } from '../store';
import { Dispatch } from 'redux';
import { IdentityState } from '../types';
import Login from '../views/pages/Login/Login';
import Home from '../views/pages/Home/Home';
import ErrorMessage from './ErrorMessage';
import CookieManager from '../utils/cookies';
import ProtectedRoute from './ProtectedRoute';

// state
export interface State {
  loading: boolean;
}

export interface StateProps {
  identity: IdentityState;
}

export const mapStateToProps = (state: RootState) => {
  return {
    identity: state.auth,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => dispatch(logout({})),
    restoreAuth: (data: JSON) => {
      dispatch(restore({ ...data }));
    },
  };
};

export interface OwnProps {
  //logout: () => void;
  restoreAuth: (data: JSON) => void;
}

/* export const withWrapper = (cmp: ReactElement): JSX.Element => {
  return <ComponentWrapper>{cmp}</ComponentWrapper>;
}; */

type Props = StateProps & OwnProps;

class AppRouter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: true };
  }

  async componentDidMount() {
    try {
      // Restore auth there
      //const data = await Api.checkUser();
      const auth = CookieManager.getAuthCookie();
      if (auth) {
        this.props.restoreAuth(auth);
      } else {
        console.warn('User not authenticated, redirecting to login');
      }
    } catch (e) {
      console.warn('User not authenticated, redirecting to login');
    }

    this.setState({ loading: false });
  }

  render() {
    const { token } = this.props.identity;

    return !this.state.loading ? (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuth={token !== null} redirectLocation="/login">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorMessage title={'Page not found'} />} />
      </Routes>
    ) : (
      ''
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
