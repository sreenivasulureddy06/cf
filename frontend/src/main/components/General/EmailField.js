import React, { Component } from "react";

class EmailField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        if(event.target.value !== undefined && event.target.value !== "" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
            this.setState({error: "Invalid email id"});
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
                        <tr style={{color: "red"}}>
                            <td>
                                {this.state.error}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default EmailField;