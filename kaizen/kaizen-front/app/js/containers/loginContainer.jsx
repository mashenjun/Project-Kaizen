import React, {Component} from "react";
import { connect } from 'react-redux'
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
            isAuthenticated
        } = nextProps;
        console.log('before',this.props.isAuthenticated, 'after',isAuthenticated)
    }

    onLoginButtonClick = (event)=>{
      console.log('click');
      this.props.onLoginButtonClick('admin','1234')
    };

    render() {
        return (
            <div className="loginContainer">
                <div className="loginContainer-loginblock">
                    <h1 className="header">Kaizen CMS system</h1>
                    <div className="content">
                        <TextField
                            fullWidth={true}
                            hintText="Username"
                            floatingLabelText="Username"
                        />
                        <TextField
                            fullWidth={true}
                            type="password"
                            className="input-field"
                            hintText="Password"
                            floatingLabelText="Password"
                        />
                        <RaisedButton onClick={this.onLoginButtonClick} className="loginButton" primary={true} label="Let me in"
                                      fullWidth={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const auth = state.auth;
    const {token, username, isAuthenticated, errorMesage} = auth;
    return {
        token,
        username,
        isAuthenticated,
        errorMesage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLoginButtonClick(username,password) {
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