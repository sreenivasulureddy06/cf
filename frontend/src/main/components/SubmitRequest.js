import React, { Component } from "react";
import TextField from "../components/General/TextField.js";
import TextAreaField from "../components/General/TextAreaField.js";
import Button from "../components/General/ButtonField.js";
import EmailField from "../components/General/EmailField.js";
import PhoneField from "../components/General/PhoneField.js";

class SubmitRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            fullName: "",
            emailId: "",
            phoneNumber: ""
        }
        this.submitAction = this.submitAction.bind(this);
    }
    submitAction() {
    }
    render() {
        return(
            <div>
                <table>
                    <tbody>
                        <thead className="appLabel">Submit Request</thead>
                        <hr></hr>
                        <tr style={{borderTop: "1px solid #145cd6"}}>
                            <td className="appLabel">
                                Full Name
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextField 
                                    onChange={(event)=>this.setState({fullName: event.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="appLabel">
                                Phone Number
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <PhoneField 
                                    id="submit_phone_number"
                                    onChange={(event)=>this.setState({phoneNumber: event.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="appLabel">
                                Email
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EmailField
                                    id="submit_emaild_id" 
                                    onChange={(event)=>this.setState({emailId: event.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="appLabel">
                                Request Description
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextAreaField
                                    id="submit_description"
                                    rows="10"
                                    cols="20"
                                    onChange={(event)=>this.setState({description: event.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <Button 
                                    value="Submit"
                                    onClick={this.submitAction}
                                />
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
                
            </div>
        )
    }
}
export default SubmitRequest;