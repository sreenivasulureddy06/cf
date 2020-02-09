import React, { Component } from "react";
import { Slide } from 'react-slideshow-image';
import AppStore from "../stores/ApplicationStore.js";
import * as ApiService from "../utils/ApiService.js";
import * as Enpoints from "../utils/Enpoints.js";

/*function importAll(r) {
	return r.keys().map(r);
  }
  
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));*/
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
        	imagesList: []
		}
		this.loadPage = this.loadPage.bind(this);
		this.refreshGrid = this.refreshGrid.bind(this);
	}
	componentDidMount() {
		AppStore.addChangeListener('STORE_LIST_ALL_IMAGES', this.refreshGrid);
		this.loadPage();
	}
	loadPage() {
		ApiService.listAllImage(Enpoints.LIST_ALL_IMAGES);
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
	render() {
		return (
			<div className="slide-container">
				<Slide {...properties}>
					{this.state.imagesList.map(item => <div className="each-slide">
						<img src={item} />
					</div>)}
				</Slide>
			</div>
		)
	}
}
export default Home;