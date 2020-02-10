import React, { Component } from "react";

class TextField extends Component {
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
                            <td>
                                <input id={this.props.id} className="formField" type="text" value={this.props.value} onChange={this.onChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        )
    }
}
export default TextField;