import React, {Component} from "react";
import {connect} from 'react-redux'
import '../../less/loginContainer.less';
import {userLoginRequest} from '../actions/authActions'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { hashHistory } from 'react-router';

class loginContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {
            isAuthenticated,
            errorMessage,
            serverError,
        } = nextProps;
        if(isAuthenticated){
            hashHistory.push('/home');
        }
        this.userNameInput.setState({errorText: errorMessage.username ? errorMessage.username[0] : ""});
        this.passwordInput.setState({errorText: errorMessage.password ? errorMessage.password[0] : ""});
        console.log('before', this.props.isAuthenticated, 'after', isAuthenticated)
    }

    onEnterPress = (event) => {
        this.onLoginButtonClick(event);
    }

    onLoginButtonClick = (event) => {
        const username = this.userNameInput.input.value;
        const password = this.passwordInput.input.value;
        if (!username || !password) {
            if (!username) {
                this.userNameInput.setState({errorText: "请输入用户名！"})
            }
            if (!password) {
                this.passwordInput.setState({errorText: "请输入密码！"})
            }
        } else {
            this.props.onLoginButtonClick(username, password);
        }
    };

    onSignupButtonClick =(event) => {
        hashHistory.push('/signup');
    };

    render() {
        console.log('new render for login');
        const {errorMessage} = this.props;
        return (
            <div className="loginContainer">
                <div className="loginContainer-loginblock">
                    <h1 className="header">有幼游</h1>
                    <div className="content">
                        <TextField
                            fullWidth={true}
                            hintText="用户名"
                            floatingLabelText="用户名"
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
                            hintText="密码"
                            floatingLabelText="密码"
                            onChange={() => {
                                this.passwordInput.setState({errorText: ""})
                            }}
                            ref={(input) => {
                                this.passwordInput = input;
                            }}
                        />
                        <RaisedButton onClick={this.onLoginButtonClick} onKeyPress={this.onEnterPress} className="loginButton" primary={true}
                                      label="登入"
                                      fullWidth={true}/>
                        <RaisedButton onClick={this.onSignupButtonClick} className="signupButton"
                                      label="注册"
                                      secondary={true}
                                      fullWidth={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const auth = state.auth;
    const {token, username, isAuthenticated, errorMessage,serverError
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
)(loginContainer);