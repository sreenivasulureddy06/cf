import React, { Component } from "react";
import TextField from "../components/General/TextField.js";
import PasswordField from "../components/General/PasswordField.js";
import ButtonField from "../components/General/ButtonField.js";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
        this.changeUserName = this.changeUserName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }
    changeUserName(event) {
        this.setState({userName: event.target.value});
    }
    changePassword(event) {
        this.setState({password: event.target.value});
    }
    loginSubmit() {
        if(this.state.userName === "Sravanthi" && this.state.password === "Password@1") {
            alert("Login Success")
            sessionStorage.setItem("loginSuccess", "Yes");
            window.location.reload();
        } else {
            alert("Loging failed");
            sessionStorage.setItem("loginSuccess", "No");
        }
    }
    render() {
        return(
            <div align="center">
                <table>
                    <tbody>
                        <tr>
                            <td align="center" className="loginHeader">Login</td>
                        </tr>
                        <tr>
                            <td>
                                <TextField
                                    label="User Name"
                                    onChange={this.changeUserName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <PasswordField
                                    label="Password"
                                    onChange={this.changePassword}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign: "center", paddingTop: "5px"}}>
                                <ButtonField 
                                    value="Login"
                                    onClick={this.loginSubmit}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Login;