import { Route } from "react-router-dom";

export const PublicRoute = ({
  path,
  component: Component,
  ...componentProps
}) => {
  return (
    <Route path={path} exact>
      <Component {...componentProps} />
    </Route>
  );
};
