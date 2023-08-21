import { Navigate } from 'react-router-dom';

import { IPrivateRouteProps } from './PrivateRoute.props';

const PrivateRoute = ({ children, authToken }: IPrivateRouteProps) => {
  if (!authToken) {
    return <Navigate to='/auth' />
  }

  return children;
}

export default PrivateRoute;
