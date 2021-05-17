import { Route, Redirect } from "react-router-dom";

import { AppRoutes } from "./appRoutes";

export const RestrictedRoute = ({
  path,
  component: Component,
  userIsLoggedIn,
  ...componentProps
}) => {
  if (userIsLoggedIn) {
    return (
      <Route>
        <Redirect to={AppRoutes.userVisuals.link()} />
      </Route>
    );
  }

  return (
    <Route path={path}>
      <Component {...componentProps} />
    </Route>
  );
};
