import React, { Component } from "react";
import * as ApiService from "../utils/ApiService.js";
import * as Enpoints from "../utils/Enpoints.js";
import AppStore from "../stores/ApplicationStore.js";

class Bags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            designs: undefined
        }
        this.loadDesignImages = this.loadDesignImages.bind(this);
        this.refreshDesignGrid = this.refreshDesignGrid.bind(this);
        this.importAll = this.importAll.bind(this);
    }
    importAll(r) {
        return r.keys().map(r);
    } 
    componentDidMount() {
        AppStore.addChangeListener('STORE_LIST_ALL_DESIGN_IMAGES', this.refreshDesignGrid);
        this.loadDesignImages();
    }
    componentWillUnmount() {
        AppStore.removeListener('STORE_LIST_ALL_DESIGN_IMAGES', this.refreshDesignGrid);
    }
    loadDesignImages() {
        //ApiService.listAllDesignImage(Enpoints.LIST_ALL_DESIGN_IMAGES);
        let designs = this.importAll(require.context('../../../public/designs', true, /\.(png|jpe?g|svg)$/));
        this.setState({designs: designs});
    }
    refreshDesignGrid() {
        this.setState({designImagesList: AppStore.getAllDesignImages()});
    }
    render() {
        return(
            <div>
                {this.state.designs !== undefined && this.state.designs.length > 0 ? 
                    Object.keys(this.state.designs).map((keyname, keyindex)=> <div style={{margin: "5px", float: "left"}}>
                        <td><img style={{height: "250px", width: "400px"}} src={this.state.designs[keyindex]} /></td>
                    </div>)
                : null}
            </div>
        )
    }
}
export default Bags;