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
// Creating element, connected to the root element in my html.
const app = document.getElementById('root');
// Creation of a container to hold the elements for each movie.
const container = document.createElement('container');
container.setAttribute('class', 'container');
// For-loop to iterate through the movies in my Json file
for (let i = 0; i < movieList.movies.length; i++) {
    // Replacing spaces in the movie title with '%20' for the API to handle
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

            const image = document.createElement('img');
            image.setAttribute('src', (movie.Poster));
            image.setAttribute('alt', movie.Title);
            image.setAttribute('class', 'image');

            const trailer = document.createElement('iframe');
            trailer.setAttribute('src', ('https://www.youtube.com/embed/' + movieList.movies[i].youtubeID));

            const info = document.createElement('div');
            const plot = document.createElement('p');
            const rating = document.createElement('p');
            const release = document.createElement('p');
            title.textContent = movie.Title;
            plot.textContent = movie.Plot;
            rating.textContent = "IMDb rating: " + movie.imdbRating;
            release.textContent = "This movie was released in " + movie.Year + ".";

            const age = document.createElement('p');
            // Age calculation by if-condition
            age.textContent =
                (movie.Year == (new Date().getFullYear())) ? "This movies is released this year." :
                    "This movie is " + (new Date().getFullYear() - movie.Year) + " years old.";

            info.setAttribute('class', 'info');
            info.appendChild(plot);
            info.appendChild(rating);
            info.appendChild(release);
            info.appendChild(age);

            // Appending elements
            card.appendChild(title);
            card.appendChild(image);
            card.appendChild(trailer);
            card.appendChild(info);
            // Appending card element to the container
            container.appendChild(card);
            app.appendChild(container);
        })
        // If there is any errors, they are caught here
        .catch(function (err) {
            console.log('error in movie ' + i + ': ' + err);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error detected: ' + err;
            app.appendChild(errorMessage);
        })
}