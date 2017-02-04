import React, {Component} from "react";
import {connect} from 'react-redux'
import {userLoginRequest} from '../actions/authActions'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {hashHistory} from 'react-router';
import '../../less/loginContainer.less';

class signupContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {
            isAuthenticated,
            errorMessage,
            serverError,
        } = nextProps;
        if (isAuthenticated) {
            hashHistory.push('/home');
        }
        console.log('before', this.props.isAuthenticated, 'after', isAuthenticated)
    }

    onconfirmButtonClick = (event) => {

    };

    render() {
        console.log('new render');
        const {errorMessage} = this.props;
        return (
            <div className="loginContainer">
                <div className="loginContainer-loginblock" style={{height: '400px'}}>
                    <h1 className="header">Sign UP</h1>
                    <div className="content">
                        <TextField
                            fullWidth={true}
                            hintText="Username"
                            floatingLabelText="Username"
                            onChange={() => {
                                this.userNameInput.setState({errorText: ""})
                            }}
                            ref={(input) => {
                                this.userNameInput = input;
                            }}
                        />
                        <TextField
                            fullWidth={true}
                            type="email"
                            className="input-field"
                            hintText="Email"
                            floatingLabelText="Email"
                            onChange={() => {
                                this.emailInput.setState({errorText: ""})
                            }}
                            ref={(input) => {
                                this.emailInput = input;
                            }}
                        />
                        <TextField
                            fullWidth={true}
                            type="password"
                            className="input-field"
                            hintText="Password"
                            floatingLabelText="Password"
                            onChange={() => {
                                this.passwordInput.setState({errorText: ""})
                            }}
                            ref={(input) => {
                                this.passwordInput = input;
                            }}
                        />

                        <TextField
                            fullWidth={true}
                            type="password"
                            className="input-field"
                            hintText="ConfirmPassword"
                            floatingLabelText="ConfirmPassword"
                            onChange={() => {
                                this.passwordInput.setState({errorText: ""})
                            }}
                            ref={(input) => {
                                this.passwordInput = input;
                            }}
                        />

                        <RaisedButton onClick={this.onconfirmButtonClick} className="confirmButton"
                                      backgroundColor="rgb(164, 198, 57)"
                                      label="Submit" labelColor="ffffff"
                                      fullWidth={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const auth = state.auth;
    const {
        token, username, isAuthenticated, errorMessage, serverError
    } = auth;
    return {
        token,
        username,
        isAuthenticated,
        errorMessage,
        serverError
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLoginButtonClick(username, password) {
            dispatch(userLoginRequest(
                username,
                password
            ))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(signupContainer);