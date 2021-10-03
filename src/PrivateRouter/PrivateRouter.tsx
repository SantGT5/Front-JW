
import { Route, Redirect } from "react-router-dom";


function PrivateRoute(props: any) {

    const storedUser = localStorage.getItem("loggedInUser");

    const loggedInUser = JSON.parse(storedUser || '""');

  const propsClone = { ...props };
  const { component } = propsClone;
  const Component = component;
  delete propsClone.component;

  return (
    <Route
      {...propsClone}
      render={(routeProps) => {
        if (loggedInUser.token) {
          console.log("Component -> ", "Component");
          return <Component {...routeProps} {...propsClone} />;
        } else {
          console.log("Redirect -> ", "Redirect");
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }
      }}
    />
  );
}

export default PrivateRoute;
