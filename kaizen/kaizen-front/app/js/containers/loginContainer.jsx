import React, {Component} from "react";
import '../../less/loginContainer.less';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class loginContainer extends Component {
    render() {
        return (
            <div className="loginContainer">
                <div className="loginContainer-loginblock">
                    <h1 className="header">Kaizen CMS system</h1>
                    <div className="content">
                        <TextField
                            fullWidth = {true}
                            hintText="Username"
                            floatingLabelText="Enter Your User Name"
                        />
                        <TextField
                            fullWidth = {true}
                            className="input-field"
                            hintText="Password"
                            floatingLabelText="Enter Your Password"
                        />
                        <RaisedButton className="loginButton" primary={true} label="Let me in"
                                      fullWidth={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default loginContainer;