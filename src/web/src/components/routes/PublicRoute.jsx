import { Route } from "react-router-dom";

export const PublicRoute = ({ path, render: renderProp }) => {
  return (
    <Route exact path={path} render={(routeProps) => renderProp(routeProps)} />
  );
};
