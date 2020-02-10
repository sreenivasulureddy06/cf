import React, { Component } from "react";

class PhoneField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        let phoneRegx = /^\+?([0-9]{2})\)?([0-9]{4})?([0-9]{4})$/;
        if(event.target.value !== undefined && event.target.value !== "" && !event.target.value.match(phoneRegx)) {
            this.setState({error: "Invalid phone number"});
        } else {
            this.setState({error: ""});
            this.props.onChange(event);
        }
    }
    render() {
        return(
            <div>
                <table>
                    <tbody>
                        {this.props.label !== undefined ? 
                            <tr className="formLabel">
                                <td>
                                    {this.props.label} {this.props.required === true ? <span className="required-text ">*</span>:null}
                                </td>
                            </tr> : null}
                        <tr className="formFieldContainer">
                            <td>
                                <input id={this.props.id} className="formField" type="text" value={this.props.value} onChange={this.onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{color: "red"}}>
                                {this.state.error}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default PhoneField;