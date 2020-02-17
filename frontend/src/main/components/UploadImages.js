import React, { Component } from "react";
import File from "../components/General/FileComponent.js";
import trash from "../images/trash-icon.png";
import * as ApiService from "../utils/ApiService.js";
import * as Enpoints from "../utils/Enpoints.js";
import AppStore from "../stores/ApplicationStore.js";

var baseURL = "http://www.clothsfactory.in";
var local = "http://localhost:9001";
baseURL = local;

let homeFileNames = {};
let designsFileNames = {};

class UploadImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeImages: undefined,
            designs: undefined
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.submitDeleteion = this.submitDeleteion.bind(this);
        this.refreshGrid = this.refreshGrid.bind(this);
        this.callBackUploadImages = this.callBackUploadImages.bind(this);
        this.callBackDeleteImages = this.callBackDeleteImages.bind(this);
        this.onDesignFileChange = this.onDesignFileChange.bind(this);
        this.refreshDesignGrid = this.refreshDesignGrid.bind(this);
        this.loadDesignImages = this.loadDesignImages.bind(this);
        this.callBackUploadDesignImages = this.callBackUploadDesignImages.bind(this);
        this.callBackDeleteDesignImages = this.callBackDeleteDesignImages.bind(this);
        this.deleteDesignImage = this.deleteDesignImage.bind(this);
        this.importAllDesigns = this.importAllDesigns.bind(this);
        this.importAll = this.importAll.bind(this);
    }
    importAllDesigns(r) {
        let keys = r.keys();
        for(var i=0;i<keys.length;i++) {
            designsFileNames[i]=keys[i];
        }
        return keys.map(r);
    }
    importAll(r) {
        let keys = r.keys();
        for(var i=0;i<keys.length;i++) {
            homeFileNames[i]=keys[i];
        }
        return keys.map(r);
    }
    componentDidMount() {
        AppStore.addChangeListener('STORE_LIST_ALL_IMAGES', this.refreshGrid);
        AppStore.addChangeListener('STORE_UPLOAD_IMAGES', this.callBackUploadImages);
        AppStore.addChangeListener('STORE_DELETE_IMAGES', this.callBackDeleteImages);
        AppStore.addChangeListener('STORE_LIST_ALL_DESIGN_IMAGES', this.refreshDesignGrid);
        AppStore.addChangeListener('STORE_UPLOAD_DESIGN_IMAGES', this.callBackUploadDesignImages);
        AppStore.addChangeListener('STORE_DELETE_DESIGN_IMAGES', this.callBackDeleteDesignImages);
        this.loadPage();
        this.loadDesignImages()
    }
    componentWillUnmount() {
        AppStore.removeChangeListener('STORE_LIST_ALL_IMAGES', this.refreshGrid);
        AppStore.removeChangeListener('STORE_UPLOAD_IMAGES', this.callBackUploadImages);
        AppStore.removeChangeListener('STORE_DELETE_IMAGES', this.callBackDeleteImages);
        AppStore.removeChangeListener('STORE_LIST_ALL_DESIGN_IMAGES', this.refreshDesignGrid);
        AppStore.removeChangeListener('STORE_UPLOAD_DESIGN_IMAGES', this.callBackUploadDesignImages);
        AppStore.removeChangeListener('STORE_DELETE_DESIGN_IMAGES', this.callBackDeleteDesignImages);
    }
    deleteImage(selected) {
        selected = homeFileNames[selected];
        let index = selected.lastIndexOf("/");
        let fileName = selected.substr(index+1, selected.length);
        let fielnames = [];
        fielnames.push(fileName);
        let request = {
            "images": fielnames
        }
        this.submitDeleteion(request);
    }
    deleteDesignImage(selected) {
        selected = designsFileNames[selected];
        let index = selected.lastIndexOf("/");
        let fileName = selected.substr(index+1, selected.length);
        let fielnames = [];
        fielnames.push(fileName);
        let request = {
            "images": fielnames
        }
        let postData = JSON.stringify(request);
        ApiService.deleteDesignImages(Enpoints.DELETE_DESIGN_IMAGES, postData);
    }
    submitDeleteion(request) {
        let postData = JSON.stringify(request);
        ApiService.deleteImages(Enpoints.DELETE_IMAGES, postData);
    }
    onFileChange(files) {
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }
        ApiService.uploadImages(Enpoints.UPLOAD_IMAGES, data);
    }
    loadPage() {
        //let data = ApiService.listAllImage(Enpoints.LIST_ALL_IMAGES);
        let homeImages = this.importAll(require.context('../../../public/appimage', true, /\.(png|jpe?g|svg)$/));
        this.setState({homeImages: homeImages});
    }
    loadDesignImages() {
        //ApiService.listAllDesignImage(Enpoints.LIST_ALL_DESIGN_IMAGES);
        let designs = this.importAllDesigns(require.context('../../../public/designs', true, /\.(png|jpe?g|svg)$/));
        this.setState({designs: designs});
    }
    refreshGrid() {
        this.setState({imagesList: AppStore.getAllImages()});
    }
    refreshDesignGrid() {
        this.setState({designImagesList: AppStore.getAllDesignImages()});
    }
    callBackUploadImages() {
        this.loadPage();
        window.location.reload();
    }
    callBackDeleteImages() {
        this.loadPage();
        window.location.reload();
    }
    callBackUploadDesignImages() {
        this.loadDesignImages();
    }
    callBackDeleteDesignImages() {
        this.loadDesignImages();
    }
    onDesignFileChange(files) {
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }
        ApiService.uploadDesignImages(Enpoints.UPLOAD_DESIGN_IMAGES, data);
    }
    render() {
        return(
            <div style={{padding: "4px", width: "100%"}}>
                <div style={{padding: "4px", width: "45%", float: "left"}}>
                    <div style={{width: "200px"}}>
                        <File 
                            onChange={this.onFileChange}
                            label="Upload Home File"
                        />
                    </div>
                    {this.state.homeImages !== undefined && this.state.homeImages.length > 0 ? 
                        <div style={{paddingTop: "5px"}}>
                            <table>
                                {Object.keys(this.state.homeImages).map((keyname, keyindex)=> <tr style={{marginTop: "2px"}}>
                                        <td><img style={{height: "100px", width: "200px"}} src={this.state.homeImages[keyindex]} /></td>
                                        <td onClick={(event)=>{event = this.deleteImage(keyindex)}}><img style={{height: "40px", width: "40px"}} src={trash} /></td>
                                    </tr>)}
                            </table>
                        </div>
                    : null}
                </div>
                <div style={{padding: "4px", width: "45%", float: "left"}}>
                    <div style={{width: "200px"}}>
                        <File 
                            onChange={this.onDesignFileChange}
                            label="Upload Design File"
                        />
                    </div>
                    {this.state.designs !== undefined && this.state.designs.length > 0 ? 
                        <div style={{paddingTop: "5px"}}>
                            <table>
                                {Object.keys(this.state.designs).map((keyname, keyindex)=> <tr style={{marginTop: "2px"}}>
                                        <td><img style={{height: "100px", width: "200px"}} src={this.state.designs[keyindex]} /></td>
                                        <td onClick={(event)=>{event = this.deleteDesignImage(keyindex)}}><img style={{height: "40px", width: "40px"}} src={trash} /></td>
                                    </tr>)}
                            </table>
                        </div>
                    : null}
                </div>
            </div>
        )
    }
}
export default UploadImages;