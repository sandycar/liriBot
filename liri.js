var axios = require("axios")
require("dotenv").config();
// var x = process.env.SPOTIFY_ID
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
// console.log(x)

// `concert-this`
// `spotify-this-song`
// `movie-this`
// `do-what-it-says`

var command = process.argv[2]
var subCommand = process.argv.slice(3).join(" ")
// if(subCommand) {
// var subCommand = process.argv.slice(3).join(” “)
// } else {
// var subCommand = undefined 
// }
// console.log(command)
// console.log(subCommand)


if (command == "concert-this") {
    concertInfo(subCommand);
    console.log("You selected concert-this")
} else if (command == "spotify-this-song") {
    console.log("You selected spotify-this-song")
    spotifyInfo(subCommand);
    // spotifyInfo(song);
} else if(command == "movie-this"){
	console.log("You selected movie-this: ")
	movieInfo(subCommand)

}
 else {
    console.log("Enter one of these choices: concert-this, spotify-this-song, movie-this, or do-what-it-says")
}

function concertInfo(artist) {
    // var artist = "incubus"
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response) {
            // console.log(response);
            var info = response.data[1]
            var venue = info.venue.name
            console.log(info)
            console.log(venue)
        })
        .catch(function(error) {
            console.log(error);
        });
}
/* Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")
   */

function spotifyInfo(song) {
    // song = song || "the sign";
    if (!song) {
        song = "the sign";
    }

	spotify.search({ type: 'track', query: song, limit:1 }, function(err, data) {
        if (err) {
    		return console.log('Error occurred: ' + err);
  		}
 
		console.log(data.tracks.items[0].artists[0].name); 
		console.log(data.tracks.items[0].name); 
		console.log(data.tracks.items[0].album.name); 
		console.log(data.tracks.items[0].external_urls.spotify); //previewurl gave me a null, so I'm using eternal_url.spotify instead 
	});
    
}

function movieInfo(movie){
	axios.get("https://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy")
        .then(function(response) {
            // console.log(response);
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);


            // var info = response.data[1]
            // var venue = info.venue
            // console.log(info)
            // console.log(venue)
        })
        .catch(function(error) {
            console.log(error);
        });
	// console.log("function for name of movie")
	// https://www.omdbapi.com/?t=the+revenant&y=&plot=short&apikey=trilogy
	// "https://www.omdbapi.com/?t="+title+"&y=&plot=short&apikey=trilogy"
}


// } else if (subCommand==I need to create a variable for the user input here)
// create a function to find an artist in bandsintown
// create a function to find a movie with OMBD
/*
1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
*/