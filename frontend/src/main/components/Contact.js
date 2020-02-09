import React, { Component } from "react";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div className="contactInfo">
                <p>Reach out us by email or phone, if you have any requirments</p>
                <p>Email: <span style={{color: "#145cd6"}}>srbangaru9@gmail.com</span></p>
                <p>Phone: <span style={{color: "#145cd6"}}>+91-7676696542</span></p>
            </div>
        )
    }
}
export default Contact;