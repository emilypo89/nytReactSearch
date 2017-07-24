// * **Main** - contains the main-container div that holds the main layout and navigation. This component should also be able to hold sub-components Search and Saved

import React from "react";
import Search from "./Search"
import Saved from "./Saved"


class Main extends React.Component {
	constructor() {
		super();

		this.state = {
			children: 0
		}
	}



	render(){
		return(
			<div className="container">
				<div className="jumbotron">
  				<h1>New York Times Article Search</h1>
  				<p>Search for articles from the New York Times and save the articles you'd like to keep.</p>
				</div>
				<Search/>
				<Saved />
			</div>
		);
	}
};

export default Main;