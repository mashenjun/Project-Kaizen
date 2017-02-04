import React, {Component} from "react";
import {connect} from 'react-redux'
import {userSignupRequest} from '../actions/authActions'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {hashHistory} from 'react-router';
import '../../less/loginContainer.less';

class signupContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {

    }

    validateEmail = (email) =>{
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    onconfirmButtonClick = (event) => {
        const username = this.userNameInput.input.value;
        const password = this.passwordInput.input.value;
        const email = this.emailInput.input.value;
        const confirmpassword = this.confirmpasswordInput.input.value;

        if (!username || !password || !email || !confirmpassword) {
            if (!username) {
                this.userNameInput.setState({errorText: "The username can not be empty"})
            }
            if (!password) {
                this.passwordInput.setState({errorText: "The password can not be empty"})
            }
            if (!confirmpassword) {
                this.confirmpasswordInput.setState({errorText: "The password can not be empty"})
            }
            if (!email) {
                this.emailInput.setState({errorText: "The email can not be empty"})
            }
        } else if (!this.validateEmail(email)) {
            this.emailInput.setState({errorText: "This is not a valid email"})
        } else if (password != confirmpassword) {
            this.confirmpasswordInput.setState({errorText: "The password must be same as the last one "})
        } else {
            this.props.onSignupButtonClick(username, email, password);
        }

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
                            hintText="Password Confirm"
                            floatingLabelText="Password Confirm"
                            onChange={() => {
                                this.confirmpasswordInput.setState({errorText: ""})
                            }}
                            ref={(input) => {
                                this.confirmpasswordInput = input;
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
        onSignupButtonClick(username, email, password) {
            dispatch(userSignupRequest(
                username,
                email,
                password
            ))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(signupContainer);