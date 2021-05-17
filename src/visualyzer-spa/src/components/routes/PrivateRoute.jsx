import { Route, Redirect } from "react-router-dom";

import { AppRoutes } from "./appRoutes";

export const PrivateRoute = ({
  path,
  component: Component,
  userIsLoggedIn,
  ...componentProps
}) => {
  if (userIsLoggedIn) {
    return (
      <Route path={path} exact>
        <Component {...componentProps} />
      </Route>
    );
  }

  return (
    <Route>
      <Redirect to={AppRoutes.login.link()} exact />
    </Route>
  );
};
