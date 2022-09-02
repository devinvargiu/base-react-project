import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export interface OwnProps {
  isAuth: boolean;
  redirectLocation: string;
  children: JSX.Element;
}

type Props = OwnProps;

const ProtectedRoute = (props: Props) => {
  const { isAuth, redirectLocation, children } = props;
  const location = useLocation();

  if (!isAuth) {
    return (
      <Navigate
        to={{
          pathname: redirectLocation,
        }}
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
