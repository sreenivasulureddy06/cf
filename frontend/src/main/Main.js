import React, { Component } from "react";
import Home from "../main/components/Home.js";
import Bags from "../main/components/Bags.js";
import Kids from "../main/components/Kids.js";
import Contact from "../main/components/Contact.js";
import Upload from "../main/components/UploadImages.js";
import Login from "../main/components/Login.js";
import SubmitRequest from "../main/components/SubmitRequest.js";
import AppLogo from "../main/images/applogo.png";
import DesignList from "../main/components/DesignsList.js";
import Submits from "../main/components/SubmitRequests.js";
//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from 'react-responsive-carousel';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let enableUploadImages = false;
        if(sessionStorage.getItem("loginSuccess") === "Yes") {
            enableUploadImages = true;
        }
        return(
            <Router>
                <div className="menuContainer">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img style={{height: "36px", width: "200px"}} src={AppLogo} />
                                </td>
                                <td className="headertd">
                                    <Link to="/">Home</Link>
                                </td>
                                <td className="headertd">
                                    <Link to="/products">Designs</Link>
                                </td>
                                <td className="headertd">
                                    <Link to="/services">Services</Link>
                                </td>
                                <td className="headertd">
                                    <Link to="/contact">Contact</Link>
                                </td>
                                {enableUploadImages && (
                                    <td className="headertd">
                                        <Link to="/upload">Images</Link>
                                    </td>
                                )}
                                {enableUploadImages && (
                                    <td className="headertd">
                                        <Link to="/requestlist">Submissions</Link>
                                    </td>
                                )}
                                <td className="headertd">
                                    <Link to="/login">Login</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div style={{width: "15.5%", float: "left", borderRight: "2px solid #ccc"}}>
                        <DesignList />
                    </div>
                    <div style={{width: "66%", float: "left", paddingLeft: "10px"}} className="routeContainer">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/products" component={Bags} />
                            <Route path="/services" component={Kids} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/upload" component={Upload} />
                            <Route path="/login" component={Login} />
                            <Route path="/requestlist" component={Submits} />
                        </Switch>
                    </div>
                    <div style={{width: "15%", float: "left", borderLeft: "2px solid #ccc"}}>
                        <SubmitRequest 
                        />
                    </div>
                </div>
            </Router>
        )
    }
}
export default Main;