import React, { Component } from "react";

class PasswordField extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        this.props.onChange(event);
    }
    render() {
        return(
            <div>
                {this.props.label !== undefined ? <div className="formLabel">{this.props.label}</div> : null}
                <div className="formFieldContainer">
                    <input className="formField" type="password" value={this.props.value} onChange={this.onChange} />
                </div>
            </div>
        )
    }
}
export default PasswordField;