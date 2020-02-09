import React, { Component } from "react";
import File from "../components/General/FileComponent.js";
import trash from "../images/trash-icon.png";
import * as ApiService from "../utils/ApiService.js";
import * as Enpoints from "../utils/Enpoints.js";
import AppStore from "../stores/ApplicationStore.js";

var baseURL = "http://www.clothsfactory.in";
var local = "http://localhost:9001";
baseURL = local;

class UploadImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesList: []
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.submitDeleteion = this.submitDeleteion.bind(this);
        this.refreshGrid = this.refreshGrid.bind(this);
        this.callBackUploadImages = this.callBackUploadImages.bind(this);
        this.callBackDeleteImages = this.callBackDeleteImages.bind(this);
    }
    componentDidMount() {
        AppStore.addChangeListener('STORE_LIST_ALL_IMAGES', this.refreshGrid);
        AppStore.addChangeListener('STORE_UPLOAD_IMAGES', this.callBackUploadImages);
        AppStore.addChangeListener('STORE_DELETE_IMAGES', this.callBackDeleteImages);
        this.loadPage();
    }
    deleteImage(selected) {
        let index = selected.lastIndexOf("/");
        let fileName = selected.substr(index+1, selected.length);
        let fielnames = [];
        fielnames.push(fileName);
        let request = {
            "images": fielnames
        }
        this.submitDeleteion(request);
    }
    async submitDeleteion(request) {
        let postData = JSON.stringify(request);
        ApiService.deleteImages(Enpoints.DELETE_IMAGES, postData);
        /*let currentThis = this;
        fetch(baseURL+"/delete/images", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: postData
            }).then(function (res) {
                currentThis.loadPage();
            }, function (e) {
                alert("Error submitting form!"+ e);
        });*/
    }
    onFileChange(files) {
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }
        ApiService.uploadImages(Enpoints.UPLOAD_IMAGES, data);
        /*let currentThis = this;
        fetch(baseURL+"/upload/images", {
            mode: 'no-cors',
            method: "POST",
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
                Accept: "application/json"
            },
            body: data
            }).then(function (res) {
                currentThis.loadPage();
            }, function (e) {
                alert("Error submitting form!"+ e);
        });*/
    }
    loadPage() {
        let data = ApiService.listAllImage(Enpoints.LIST_ALL_IMAGES);
		/*const response = await fetch(baseURL+'/list/images', {
			method: "GET",
			headers: {
				"Accept": "application/json"
			}
		});
		let data = await response.json();
		this.setState({imagesList: data.images});*/
    }
    refreshGrid() {
        this.setState({imagesList: AppStore.getAllImages()});
    }
    callBackUploadImages() {
        this.loadPage();
    }
    callBackDeleteImages() {
        this.loadPage();
    }
    render() {
        return(
            <div style={{padding: "4px", width: "115px", cursor: "pointer"}}>
                <div>
                    <File 
                        onChange={this.onFileChange}
                        label="Upload File"
                    />
                </div>
                {this.state.imagesList !== undefined && this.state.imagesList.length > 0 ? 
                    <div style={{paddingTop: "5px"}}>
                        <table>
                            {this.state.imagesList.map(item => <tr style={{marginTop: "2px"}}>
                                    <td><img style={{height: "100px", width: "200px"}} src={item} /></td>
                                    <td onClick={(event)=>{event = this.deleteImage(item)}}><img style={{height: "40px", width: "40px"}} src={trash} /></td>
                                </tr>)}
                        </table>
                    </div>
                : null}
            </div>
        )
    }
}
export default UploadImages;