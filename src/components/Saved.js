// * **Saved** - displays the Saved Articles that were searched and stored in the database
import React from 'react';
import axios from 'axios';
import helpers from "../utils/helpers";
import './style.css';

class Saved extends React.Component {
	// saved the saved articles in the state of the component
	constructor(){
		super();
		this.state = {
			savedArticles: []
		}
	}

// when the component renders the saved articles are pulled from the database and saved in the state
	componentDidMount() {
		axios.get('/api/saved').then(response => {
			console.log("response.data");
			console.log(response.data);
			this.setState({
				savedArticles: response.data
			});
		});
		console.log("this.state.savedArticles");
		console.log(this.state.savedArticles)
	}

// button to delete an article
	deleteButton = (event, index) => {
		console.log(this.state.savedArticles);
		event.preventDefault();
		console.log("index in delete button function: ");
		console.log(index);
		var chosenArticle = this.state.savedArticles[index];
		console.log(chosenArticle);
		var chosenArticleID = this.state.savedArticles[index]._id;
		console.log(chosenArticleID);
		helpers.deleteArticles(chosenArticleID)
        .then(function() {
          console.log("Deleted from MongoDB");
        });
	}
// rendering the saved article component
	render() {
		return (
		<div className="panel panel-default">
		  <div className="panel-heading">
		    <h3 className="panel-title">Saved Articles</h3>
		  </div>
		     <div className="panel-body">
          {this.state.savedArticles.map((obj, index) =>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title" key={index._id}>{obj.headline}</h3>
              </div>
              <div className="panel-body" id="savedArticleBody">
                <p key={index._id}>{obj.pubDate}
                <br/> 
                {obj.byline}
                <br/>
                <a href={obj.url}>{obj.url}</a></p>
                <button type="button" onClick={(event) => this.deleteButton(event, index)}>Delete Article</button>
              </div>
            </div>)}
          </div>

		</div>	
		);
	}
}

export default Saved;