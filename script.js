//API KEY
let url = 'https://www.omdbapi.com/?apikey=a99024af&t=';
// Proxy URL
let proxy = 'https://cors-anywhere.herokuapp.com/';

// JSon data
let movieList = {
    "movies": [
        {
            "title": "2012",
            "youtubeID": "ce0N3TEcFw0"
        },
        {
            "title": "The Day After Tomorrow",
            "youtubeID": "Ku_IseK3xTc"
        },
        {
            "title": "Armageddon",
            "youtubeID": "kg_jH47u480"
        },
        {
            "title": "Volcano",
            "youtubeID": "MDN18yHEv2I"
        },
        {
            "title": "Deep Impact",
            "youtubeID": "XfcoWexWCzc"
        },
        {
            "title": "28 Weeks Later",
            "youtubeID": "cbpjH4XCG3c"
        }
    ]
};



// Creating script element for the YouTube API and applying source link
/*
var yt = document.createElement('script');
yt.src = "https://www.youtube.com/iframe_api";
var firstScript = document.getElementsByTagName('script')[0];
firstScript.parentNode.insertBefore(yt, firstScript);
*/
const app = document.getElementById('root');
// Creation of a container to hold the elements for each movie. This container is connected to the div element with id="root" in my html file.
const container = document.createElement('container');
container.setAttribute('class', 'container');


// For-loop to iterate through the movies in my Json file
for (let i = 0; i < movieList.movies.length; i++) {
    // Replacing spaces in the title with '%20' for the API to handle
    fetch(proxy + url + movieList.movies[i].title.replace(/( )/g, "%20"))
        .then(response => {
            return response.json();
        })
        .then(movie => {
            // Creating a card element for the movie
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            // Creating elements to hold information about the movie
            const title = document.createElement('h3');
            title.setAttribute('class', 'title');
            const plot = document.createElement('p');
            const rating = document.createElement('p');
            const release = document.createElement('p');
            const age = document.createElement('p');
            const image = document.createElement('img');
            image.setAttribute('class', 'image');
            const trailer = document.createElement('iframe');
            //trailer.setAttribute('width', '420');
            //trailer.setAttribute('height', '315');


            // Assigning value to the elements created above
            title.textContent = movie.Title;
            plot.textContent = movie.Plot;
            rating.textContent = "IMDb rating: " + movie.imdbRating;
            release.textContent = "This movie was released in " + movie.Year + ".";
            // One-line if condition with local method for calculation of age for the movie - KAN FORBEDRES? condition kan være selve udregningen, og så droppe metode
            age.textContent = calculateAge(movie.Year) ? "This movie is released this year." :
                "This movie is " + (new Date().getFullYear() - movie.Year) + " years old.";
            // Giving attributes to image and trailer
            image.setAttribute('src', (movie.Poster));
            image.setAttribute('alt', movie.Title);

            trailer.setAttribute('src', ('https://www.youtube.com/embed/' + movieList.movies[i].youtubeID));

            const info = document.createElement('div');
            info.setAttribute('class', 'info');
            info.appendChild(plot);
            info.appendChild(rating);
            info.appendChild(release);
            info.appendChild(age);
            // Appending each element to the card element
            card.appendChild(title);
            //card.appendChild(plot);
            //card.appendChild(rating);
            //card.appendChild(release);
            //card.appendChild(age);
            card.appendChild(image);
            card.appendChild(trailer);
            card.appendChild(info);
            // Appending card element to the container
            container.appendChild(card);
            //container.appendChild(info);
            app.appendChild(container);



        })
        // If there is any errors, they are caught here
        .catch(function (err) {
            console.log('error in movie ' + i + ': ' + err);
        })
}






// YouTube code from Torrill, handling the trailer
/*
var player;
function onYouTubeIframeAPIReady() {
    for (let i = 0; i < movieList.movies.length; i++) {
        player = new YT.Player('player' + i, {
            height: '400',
            width: '600',
            videoId: movieList.movies[i].youtubeID,
            playerVars: {'autoplay': 0},
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}*/

function calculateAge(year) {
    let today = new Date().getFullYear();
    let age = today - year;
    if (age != year) {
        return false;
    } else {
        return true;
    }
}