import { ComponentType, FC, ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type TProps = {
  component: ComponentType<ReactNode>;
  isAuthenticated: boolean;
} & RouteProps;

export const PrivateRoute: FC<TProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
