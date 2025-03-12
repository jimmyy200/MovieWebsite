const api_key = "api_key=1201a6dde19d9c28d35c8366a5542d19";
const base_url = "https://api.themoviedb.org/3";
const api_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api_key;
const img_url = "https://image.tmdb.org/t/p/w500";
const searchURL = base_url + "/search/movie?" + api_key;

fetchMovies(api_url);

function fetchMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data);
        showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML= ""

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src='${img_url+poster_path}' alt="img" class="poster">
            
            <div class="description">
                ${title}: ${overview}
                <br>
                Rating: ${vote_average}
            </div>
        `
        main.appendChild(movieEl);
    })
}

searchBox.addEventListener('submit', (e) =>{
    e.preventDefault();
    const searchMovie = search.value;

    if(searchMovie){
        fetchMovies(searchURL + '&query=' + searchMovie);
    }
})