import React, { Component } from "react";
import * as ApiService from "../utils/ApiService.js";
import * as Enpoints from "../utils/Enpoints.js";
import AppStore from "../stores/ApplicationStore.js";
import Pagination from "../components/General/Pagination";

class Bags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            designImagesList: undefined,
            pagination: {
                pageSize: 2,
                pageNumber: 1,
                totalCount: 1,
                noOfColumn: 3
            }
        }
        this.loadDesignImages = this.loadDesignImages.bind(this);
        this.refreshDesignGrid = this.refreshDesignGrid.bind(this);
        this.onChangePagination = this.onChangePagination.bind(this);
    }
    componentDidMount() {
        AppStore.addChangeListener('STORE_LIST_ALL_DESIGN_IMAGES', this.refreshDesignGrid);
        this.loadDesignImages();
    }
    componentWillUnmount() {
        AppStore.removeListener('STORE_LIST_ALL_DESIGN_IMAGES', this.refreshDesignGrid);
    }
    loadDesignImages() {
        let request = {
            pagination: this.state.pagination
		}
		let postData = JSON.stringify(request);
        ApiService.listAllDesignImage(Enpoints.LIST_ALL_DESIGN_IMAGES, postData);
    }
    refreshDesignGrid() {
        let data = AppStore.getAllDesignImages();
        this.setState({designImagesList: data.images});
        this.setState({pagination: data.pagination});
    }
    onChangePagination(tempPagination){
        this.setState({pagination: tempPagination});
        this.loadDesignImages();
    }
    render() {
        return(
            <div>
                <div>
                    {this.state.designImagesList !== undefined && this.state.designImagesList.length > 0 ? 
                        this.state.designImagesList.map(item=> <div style={{margin: "5px", float: "left"}}>
                            <img style={{height: "250px", width: "265px"}} src={`data:${item.mimeType};base64,${item.data}`} />
                        </div>)
                    : null}
                </div>
                <Pagination 
                    pagination={this.state.pagination}
                    onChangePagination={this.onChangePagination}
                />
            </div>
        )
    }
}
export default Bags;