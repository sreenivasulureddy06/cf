import React, { Component } from "react";
import { Slide } from 'react-slideshow-image';
import AppStore from "../stores/ApplicationStore.js";
import * as ApiService from "../utils/ApiService.js";
import * as Enpoints from "../utils/Enpoints.js";

const properties = {
	duration: 5000,
	transitionDuration: 500,
	infinite: true,
	indicators: true,
	arrows: true,
	onChange: (oldIndex, newIndex) => {
		console.log(`slide transition from ${oldIndex} to ${newIndex}`);
	}
}
class Home extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	images: undefined
		}
		this.loadPage = this.loadPage.bind(this);
		this.refreshGrid = this.refreshGrid.bind(this);
		this.importAll = this.importAll.bind(this);
	}
	importAll(r) {
		return r.keys().map(r);
	}
	componentDidMount() {
		AppStore.addChangeListener('STORE_LIST_ALL_IMAGES', this.refreshGrid);
		this.loadPage();
	}
	loadPage() {
		ApiService.listAllImage(Enpoints.LIST_ALL_IMAGES);
		
	}
	refreshGrid() {
		this.setState({images: AppStore.getAllImages()});
    }
	render() {
		return (
			<div className="slide-container">
				{this.state.images !== undefined? 
					<Slide {...properties}>
					{this.state.images.map(item => <div className="each-slide">
						<img src={`data:${item.mimeType};base64,${item.data}`} />
					</div>)}
				</Slide>
				: null}
			</div>
		)
	}
}
export default Home;