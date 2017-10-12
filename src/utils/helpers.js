// Here we will utilize the axios library to perform GET/POST requests
import axios from 'axios';


// Exporting an object with methods for retrieving and posting data to our API
const helper = {
  // Returns a promise object we can .then() off inside our Parent component
  getArticles: function() {
    return axios.get("/api/saved");
  },
  // Also returns a promise object we can .then() off inside our Parent component
  // This method takes in an argument for what to post to the database
  saveArticles: function(articleData) {
    return axios.post("/api/saved", articleData);
  },

  deleteArticles: function(chosenArticleID) {
    console.log("made it to helpers axios");
    console.log(chosenArticleID);
  	return axios.delete("/api/saved/" + chosenArticleID);
  }
};

export default helper;