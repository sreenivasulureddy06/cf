import React, { Component } from "react";
import * as ApiService from "../utils/ApiService.js";
import * as Enpoints from "../utils/Enpoints.js";
import AppStore from "../stores/ApplicationStore.js";

class DesignsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            designImagesList: []
        }
        this.loadDesignImages = this.loadDesignImages.bind(this);
        this.refreshDesignGrid = this.refreshDesignGrid.bind(this);
    }
    componentDidMount() {
        AppStore.addChangeListener('STORE_LIST_ALL_DESIGN_IMAGES', this.refreshDesignGrid);
        this.loadDesignImages()
    }
    componentWillUnmount() {
        AppStore.removeChangeListener('STORE_LIST_ALL_DESIGN_IMAGES', this.refreshDesignGrid);
    }
    loadDesignImages() {
        ApiService.listAllDesignImage(Enpoints.LIST_ALL_DESIGN_IMAGES);
    }
    refreshDesignGrid() {
        this.setState({designImagesList: AppStore.getAllDesignImages()});
    }
    render() {
        return(
            <div>
                {this.state.designImagesList !== undefined && this.state.designImagesList.length > 0 ? 
                    this.state.designImagesList.map(item => 
                    <div style={{paddingTop: "5px", paddingLeft: "5px"}}><img style={{width: "190px"}} src={item} /></div>
                )
                : null}
            </div>
        )
    }
}
export default DesignsList;