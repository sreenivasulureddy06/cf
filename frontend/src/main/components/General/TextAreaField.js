import React, { Component } from "react";

class TextAreaField extends Component {
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
                        {this.props.label !== undefined ? 
                            <tr className="formLabel">
                                <td>
                                    {this.props.label} {this.props.required === true ? <span className="required-text ">*</span>:null}
                                </td>
                            </tr> : null}
                        <tr className="formFieldContainer">
                            <td>
                                <textarea style={{height: "90px"}} className="formField" id={this.props.id} rows="10" cols={this.props.cols} value={this.props.value} onChange={this.onChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default TextAreaField;