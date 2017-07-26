// * **Search** - queries the NYT API for articles. Displays API search results from another possible **Query** component and **Results** component. Gives the user the ability to save an article to their Saved Articles.
import React from 'react';
import axios from 'axios';



class Search extends React.Component {
	constructor() {
		super();

		this.state ={
			topic: "",
			beginYear: "",
			endYear: ""
		}
	}

  // This function will respond to the user input
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }


  // When a user submits...
  handleSubmit = event => {
    event.preventDefault()
    console.log('handleSumbit called')
    this.props.makeRequest(
      this.state.topic,
      this.state.beginYear,
      this.state.endYear
    )
  }


	render() {
		return(
			<div>
			<div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Search</h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <h4 className="">
                <strong>Topic</strong>
              </h4>
              <input
                value={this.state.topic}
                type="text"
                className="form-control"
                id="topic"
                onChange={this.handleChange}
                required
              />
              <h4 className="">
                <strong>Start Year</strong>
              </h4>
              <input
                value={this.state.beginYear}
                type="text"
                className="form-control"
                id="beginYear"
                onChange={this.handleChange}
                required
              />
              <h4 className="">
                <strong>End Year</strong>
              </h4>
              <input
                value={this.state.endYear}
                type="text"
                className="form-control"
                id="endYear"
                onChange={this.handleChange}
                required
              />
              <br />
              <button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div>
      {this.props.searchResults.map((obj, index) =>
        
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title" key={index}>{obj.headline.main}</h3>
          </div>
          <div className="panel-body">
            <p key={index}>{obj.pub_date}</p>
            <p key={index}>{obj.byline.original}</p>
          </div>
        </div>)}
      </div>
      
		</div>	

		);
	}
}

export default Search;