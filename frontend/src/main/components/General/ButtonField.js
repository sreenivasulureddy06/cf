import React, { Component } from "react";

class ButtonField extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        this.props.onClick(event);
    }
    render() {
        return(
            <div>
                <input className="formButton" type="button" value={this.props.value} onClick={this.onClick} />
            </div>
        )
    }
}
export default ButtonField;