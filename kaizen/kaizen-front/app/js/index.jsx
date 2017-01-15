import React from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux'
import DevTools from './containers/DevTools';
import configureStore from './store/configureStore'
// import AwesomeComponent from './components/AwesomeComponent';
import AppContainer from './containers/appContainer'
import loginContainer from './containers/loginContainer'

let store = configureStore();

render(
  <Provider store={store}>
    <div>
	    <Router history={hashHistory} >
		  	<Route path="/" component={AppContainer}>
		        <IndexRedirect to="login" />
		    		<Route path="login" component={loginContainer} />
		       {/* <Route path="/mainPage" component={AwesomeComponent} /> */}
		 			</Route>
	    </Router>
	    <DevTools/>
    </div>
  </Provider>,
  document.getElementById('app')
);