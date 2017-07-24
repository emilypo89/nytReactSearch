// * **Search** - queries the NYT API for articles. Displays API search results from another possible **Query** component and **Results** component. Gives the user the ability to save an article to their Saved Articles.
import React from 'react';

class Search extends React.Component {
	constructor() {
		super();
	}

	render() {
		return(
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
                // value={this.state.term}
                type="text"
                className="form-control"
                id="term"
                // onChange={this.handleChange}
                required
              />
              <h4 className="">
                <strong>Start Year</strong>
              </h4>
              <input
                // value={this.state.term}
                type="text"
                className="form-control"
                id="term"
                // onChange={this.handleChange}
                required
              />
              <h4 className="">
                <strong>End Year</strong>
              </h4>
              <input
                // value={this.state.term}
                type="text"
                className="form-control"
                id="term"
                // onChange={this.handleChange}
                required
              />
              <br />
              <button className="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

		);
	}
}

export default Search;