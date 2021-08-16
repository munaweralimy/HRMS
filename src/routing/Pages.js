import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RoutingList from './config/RoutingList';
import { checkPermission, isLoggedIn } from './config/utils';
import Dashboard from '../app/pages/Dashboard';
import QualityAssurance from '../app/pages/QualityAssurance';
import Marketing from '../app/pages/Marketing';
import Registry from '../app/pages/Registry';
import HumanResource from '../app/pages/HumanResource';
import NoPage from '../app/modules/Login/NoPage';

// Pages
import Login from '../app/pages/Login';

const compList = {
  Dashboard,
  QualityAssurance,
  Marketing,
  Registry,
  HumanResource
}

const Pages = () => {

  const routeComponents = RoutingList.map(({title, component, path, permission}, key) =>
  <Route exact path={path} key={key} render={(props) => {
      if (isLoggedIn()) {
          const MyComponent = compList[title];
          if (!permission) {
            return <MyComponent Comp={component} {...props} />
          } else {
            if (checkPermission(permission)) {
              return <MyComponent Comp={component} {...props} />
            } else {
              return <Redirect to='/404' />
            }
          }
      } else {
        return <Redirect to='/' />
      }
    }} />);

  return (
    <Switch>
      <Route exact path="/" render={(props) => <Login Comp={'Login'} {...props} />} />
      <Route exact path="/login" render={(props) => <Login Comp={'Login'} {...props} />} />
      <Route exact path="/forgot-password" render={(props) => <Login Comp={'ForgotPassword'} {...props} />} />
      {routeComponents}
      <Route component={NoPage} />
    </Switch>
  );
};

export default Pages;
