import React, { Component } from "react";
import * as ApiService from "../utils/ApiService.js";
import * as Enpoints from "../utils/Enpoints.js";
import AppStore from "../stores/ApplicationStore.js";
import CfGrid from "../components/General/CfGrid.js";

class SubmitRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitRequests: []
        }
        this.loadData = this.loadData.bind(this);
        this.refreshGrid = this.refreshGrid.bind(this);
    }
    componentDidMount() {
        AppStore.addChangeListener('STORE_LIST_ALL_SUBMISSIONS', this.refreshGrid);
        this.loadData();
    }
    componentWillUnmount() {
        AppStore.removeChangeListener('STORE_LIST_ALL_SUBMISSIONS', this.refreshGrid);
    }
    refreshGrid() {
        let data = AppStore.listAllRequest();
        this.setState({submitRequests: data});
    }
    loadData() {
        ApiService.listSubmissions(Enpoints.SUBMIT_REQUEST_LIST);
    }
    render() {
        let headers = [
            {
                label: "Full Name",
                key: "firstName",
                width: "25"
            },
            {
                label: "Phone Number",
                key: "phoneNumber",
                width: "25"
            },
            {
                label: "Email",
                key: "email",
                width: "25"
            },
            {
                label: "Description",
                key: "description",
                width: "25"
            }
        ]
        return(
            <div>
                <CfGrid 
                    title = "List of Submissions"
                    headers = {headers}
                    rowData = {this.state.submitRequests}
                    noDataFound = "No records found"
                />
            </div>
        )
    }
}
export default SubmitRequests;