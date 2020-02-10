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
                <table>
                    <tbody>
                        {this.props.label !== undefined && (<tr>
                                <td className="formLabel">{this.props.label}
                                    {this.props.required === true ? <span className="required-text">*</span> : null}
                                    </td>
                                </tr>)}
                        <tr className="formFieldContainer">
                            <input className="formField" type="password" value={this.props.value} onChange={this.onChange} />
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default PasswordField;