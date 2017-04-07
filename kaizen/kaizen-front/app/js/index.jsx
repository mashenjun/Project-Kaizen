import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import {Provider} from 'react-redux'
import DevTools from './containers/DevTools';
import configureStore from './store/configureStore';
import AppContainer from './containers/appContainer';
import loginContainer from './containers/loginContainer';
import signupContainer from './containers/signupContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import mainpageContainer from './containers/mainPageContainer'
import uploaderContainer from './containers/uploaderContainer'
import aboutContainer from './containers/aboutContainer'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

let store = configureStore();

render(
    <Provider store={store}>
        <MuiThemeProvider>
            <div>
                <Router history={hashHistory}>
                    <Route path="login" component={loginContainer}/>
                    <Route path="signup" component={signupContainer}/>
                    <Route path="/" component={AppContainer}>
                        <IndexRedirect to="home"/>
                         <Route path="/home" component={mainpageContainer} />
                         <Route path="/updetail/:uploaderid" component={uploaderContainer} />
                         <Route path="/about" component={aboutContainer} />
                    </Route>
                </Router>
                <DevTools/>
            </div>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);