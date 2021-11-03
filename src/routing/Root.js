import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROOT } from "../configs/routeNames";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../assets/styles/antd.less";
import "../assets/styles/styles.scss";
import { TranslateProvider } from 'Translate';

import Pages from "./Pages";

const Root = () => (
    <TranslateProvider>
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path={ROOT} component={Pages} />
      </Switch>
    </Router>
  </Provider>
    </TranslateProvider>
);
export default Root;
