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
                {this.props.label !== undefined ? <div className="formLabel">{this.props.label}</div> : null}
                <div className="formFieldContainer">
                    <input id={this.props.id} className="formField" type="text" value={this.props.value} onChange={this.onChange} />
                </div>
                <div style={{float: "left", color: "red"}}>
                    {this.state.error}
                </div>
            </div>
        )
    }
}
export default PhoneField;