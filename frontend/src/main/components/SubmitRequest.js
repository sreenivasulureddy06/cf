import React, { Component } from "react";
import TextField from "../components/General/TextField.js";
import TextAreaField from "../components/General/TextAreaField.js";
import Button from "../components/General/ButtonField.js";
import EmailField from "../components/General/EmailField.js";
import PhoneField from "../components/General/PhoneField.js";
import * as ApiService from "../utils/ApiService.js";
import * as EndPoints from "../utils/Enpoints.js";

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
        let body = {
            firstName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.emailId,
            description: this.state.description
        }
        if(this.state.fullName !== "" && this.state.phoneNumber !== "" && this.state.emailId !== "" && this.state.description !== "") {
            ApiService.submitRequest(EndPoints.SUBMIT_REQUEST, JSON.stringify(body));
        } else {
            alert("Please enter mandatory fields");
        }
        
    }
    render() {
        return(
            <div>
                <table>
                    <tbody>
                        <thead className="appLabel">Submit Request</thead>
                        <hr></hr>
                        <tr style={{borderTop: "1px solid #145cd6"}}>
                        </tr>
                        <tr>
                            <td>
                                <TextField 
                                    id="submit_full_name"
                                    required = {true}
                                    label = "Full Name"
                                    onChange={(event)=>this.setState({fullName: event.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <PhoneField 
                                    id="submit_phone_number"
                                    label="Phone Number"
                                    required={true}
                                    onChange={(event)=>this.setState({phoneNumber: event.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EmailField
                                    id="submit_emaild_id" 
                                    label="Email"
                                    required={true}
                                    onChange={(event)=>this.setState({emailId: event.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextAreaField
                                    id="submit_description"
                                    rows="10"
                                    cols="20"
                                    label="Request Description"
                                    required={true}
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