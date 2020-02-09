import React, { Component } from "react";

class Kids extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div className="contactInfo">
                <ul>
                    <li>
                        Kuchu for any kind of sarees
                            <p className="serviceP">- Krosha</p>
                            <p className="serviceP">- Normal</p>
                            <p className="serviceP">- Baby</p>
                    </li>
                    <li>
                        Stitching all kind of blouses
                        <p className="serviceP">- Normal</p>
                        <p className="serviceP">- Design</p>
                        <p className="serviceP">- Baby</p>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Kids;