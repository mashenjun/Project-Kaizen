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
        console.log('Sign up receive next props')
       if(nextProps.signupSuccess){
           hashHistory.push('/login');
       }else if(nextProps.errorMessage){
           this.userNameInput.setState({errorText: nextProps.errorMessage.username ? "The username must be unique" : ""});
       }
    }

    validateEmail = (email) =>{
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };


    backloginButtonClick = (event)=>{
      hashHistory.push('/login');
    };

    onconfirmButtonClick = (event) => {
        const username = this.userNameInput.input.value;
        const password = this.passwordInput.input.value;
        const email = this.emailInput.input.value;
        const confirmpassword = this.confirmpasswordInput.input.value;
        if (!username || !password || !email || !confirmpassword) {
            if (!username) {
                this.userNameInput.setState({errorText: "请输入用户名！"})
            }
            if (!password) {
                this.passwordInput.setState({errorText: "请输入密码！"})
            }
            if (!confirmpassword) {
                this.confirmpasswordInput.setState({errorText: "请输入密码！"})
            }
            if (!email) {
                this.emailInput.setState({errorText: "请输入邮箱！"})
            }
        } else if (!this.validateEmail(email)) {
            this.emailInput.setState({errorText: "邮箱不正确！"})
        } else if (password != confirmpassword) {
            this.confirmpasswordInput.setState({errorText: "确认密码不一致！"})
        } else {
            this.props.onSignupButtonClick(username, email, password);
        }

    };

    render() {
        console.log('new render for signup');
        const {errorMessage} = this.props;
        return (
            <div className="loginContainer">
                <div className="loginContainer-loginblock" style={{height: '450px'}}>
                    <h1 style={{fontSize:'1.3em'}}>新用户注册</h1>
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
                            type="email"
                            className="input-field"
                            hintText="邮箱"
                            floatingLabelText="邮箱"
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
                            hintText="创建密码"
                            floatingLabelText="密码"
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
                            hintText="确认密码"
                            floatingLabelText="确认密码"
                            onChange={() => {
                                this.confirmpasswordInput.setState({errorText: ""})
                            }}
                            ref={(input) => {
                                this.confirmpasswordInput = input;
                            }}
                        />
                        <span style={{fontSize: '0.9rem'}}>注册时默认已阅读 <a> 本网站隐私政策</a></span>
                        <RaisedButton onClick={this.onconfirmButtonClick} className="confirmButton"
                                      backgroundColor="rgb(164, 198, 57)"
                                      label="提交" labelColor="ffffff"
                                      fullWidth={true}/>
                        <RaisedButton onClick={this.backloginButtonClick} className="backButton"
                                      backgroundColor="3b5998"
                                      label="返回" labelColor="ffffff"
                                      fullWidth={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const {
        signupSuccess, errorMessage, serverError
    } =  state.signup;
    return {
        signupSuccess,
        errorMessage,
        serverError,
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