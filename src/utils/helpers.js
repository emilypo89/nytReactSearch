// Here we will utilize the axios library to perform GET/POST requests
import axios from 'axios';

var nytAPI = "084695a4f40f4643b10304a7232b2b08";

// Exporting an object with methods for retrieving and posting data to our API
const helper = {

	  // This function serves our purpose of running the query to geolocate.
  runQuery: function(topic, beginYear, endYear) {

    console.log(topic);

    // Figure out the geolocation
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + topic + "&begin_date=" + beginYear + "0101" + "&end_date=" + endYear + "1231";
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.results[0]) {
        return response.data.results[0].formatted;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },
	
  // Returns a promise object we can .then() off inside our Parent component
  getArticles: function() {
    return axios.get("/api/saved");
  },
  // Also returns a promise object we can .then() off inside our Parent component
  // This method takes in an argument for what to post to the database
  saveArticles: function(articleData) {
    return axios.post("/api/saved", articleData);
  }
};

export default helper;