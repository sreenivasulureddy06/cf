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
		//ApiService.listAllImage(Enpoints.LIST_ALL_IMAGES);
		let images = this.importAll(require.context('../../../public/appimage', true, /\.(png|jpe?g|svg)$/));
		this.setState({images: images});
	}
	refreshGrid() {
        this.loadPage();
    }
	render() {
		return (
			<div className="slide-container">
				{this.state.images !== undefined? 
					<Slide {...properties}>
					{Object.keys(this.state.images).map((keyname, keyindex)=> <div className="each-slide">
						<img src={this.state.images[keyindex]} />
					</div>)}
				</Slide>
				: null}
			</div>
		)
	}
}
export default Home;