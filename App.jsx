import React, {Fragment} from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import W1A1CueDetail from "./components/Index";
import SignIn from "./components/SignIn";
import Otp from "./components/ValidateOtp";
import Details from "./components/Details";
import Successful from "./components/Successful";
import Unsuccessful from "./components/Unsuccessful";
import Community from "./components/Community";
import Artists from "./components/Artists";
import SampleContextProvider from './contexts/SampleContext';

function App() {
  return (
      <Fragment>
        <Router>
          <Switch>
            <Route path="/:path(|home)"><W1A1CueDetail /></Route>
            <Route path="/signin"><SignIn /></Route>
            <Route path="/validate-otp" component={ Otp } />
            <Route path="/fill-details" component={ Details } />
            <Route path="/success" component={ Successful } />
            <Route path="/unsuccess" component={ Unsuccessful } />
            <Route path='/community' component={ Community } />
            <Route path='/artists' component={ Artists } />
          </Switch>
        </Router>
      </Fragment>
  );
}

export default App;


