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
                {this.props.label !== undefined ? <div className="formLabel">{this.props.label}</div> : null}
                <div className="formFieldContainer">
                    <textarea style={{height: "90px"}} className="formField" id={this.props.id} rows="10" cols={this.props.cols} onChange={this.onChange} />
                </div>
            </div>
        )
    }
}
export default TextAreaField;