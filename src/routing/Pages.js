import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RoutingList from './config/RoutingList';
import { checkPermission, isLoggedIn } from './config/utils';
import Dashboard from '../app/pages/Dashboard';
import HumanResource from '../app/pages/HumanResource';
import NoPage from '../app/modules/Login/NoPage';
import { useIsOnline } from 'react-use-is-online';
import { Result, Button, Row, Col } from 'antd';
// Pages
import Login from '../app/pages/Login';

const compList = {
  Dashboard,
  HumanResource
}

const Pages = () => {
  const { isOnline, isOffline, error } = useIsOnline();
  const routeComponents = RoutingList.map(({ title, component, path, permission }, key) =>
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
    <>
      {isOnline && (
        <Switch>
          <Route exact path="/" render={(props) => <Login Comp={'Login'} {...props} />} />
          <Route exact path="/login" render={(props) => <Login Comp={'Login'} {...props} />} />
          <Route exact path="/forgot-password" render={(props) => <Login Comp={'ForgotPassword'} {...props} />} />
          <Route exact path="/update-password" render={(props) => <Login Comp={'OPTPCode'} {...props} />} />
          {routeComponents}
          <Route component={NoPage} />
        </Switch>
      )}
      {isOffline && (
        <Row justify="center" align="middle" style={{ height: '100vh' }} className="offline">
          <Col span={8}>
            <Result
              status="error"
              title="You appear to be offline"
              subTitle="We're unable to load this page because it looks like your device isn't connected to the internet right now. Check your connection then try again."
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Pages;
