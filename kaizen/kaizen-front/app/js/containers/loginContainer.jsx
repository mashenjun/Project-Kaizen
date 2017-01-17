import React, {Component} from "react";
import {connect} from 'react-redux'
import '../../less/loginContainer.less';
import {userLoginRequest} from '../actions/authActions'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class loginContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {
            isAuthenticated,
            errorMessage
        } = nextProps;
        this.userNameInput.setState({errorText: errorMessage.username ? errorMessage.username : ""});
        this.passwordInput.setState({errorText: errorMessage.password ? errorMessage.password : ""})
        console.log('before', this.props.isAuthenticated, 'after', isAuthenticated)
    }

    onLoginButtonClick = (event) => {
        const username = this.userNameInput.input.value;
        const password = this.passwordInput.input.value;
        if (!username || !password) {
            if (!username) {
                this.userNameInput.setState({errorText: "The username can not be empty"})
            }
            if (!password) {
                this.passwordInput.setState({errorText: "The password can not be empty"})
            }
        } else {
            this.props.onLoginButtonClick(username, password);
        }
    };

    render() {
        console.log('new render');
        const {errorMessage} = this.props;
        return (
            <div className="loginContainer">
                <div className="loginContainer-loginblock">
                    <h1 className="header">Kaizen CMS system</h1>
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
                        <RaisedButton onClick={this.onLoginButtonClick} className="loginButton" primary={true}
                                      label="Let me in"
                                      fullWidth={true}/>
                        <RaisedButton onClick={this.onLoginButtonClick} className="loginButton"
                                      label="Sign up"
                                      secondary = {true}
                                      fullWidth={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const auth = state.auth;
    const {token, username, isAuthenticated, errorMessage} = auth;
    return {
        token,
        username,
        isAuthenticated,
        errorMessage
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
)(loginContainer);