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
export default EmailField;