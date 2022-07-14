import React, {useState, useEffect} from "react";
import "./Banner.css";
import categories, { getMovies } from './../../api';

const Banner = () => {

    const [movie, setMovie] = useState({});

    const fetchRandomMovie = async (_path) => {
        try{
            const netflixOriginalsCategory = categories.find(
                (category) => category.name = "netflixOriginals"
            );
            const data = await getMovies(netflixOriginalsCategory.path);
            const movies = data?.results;
            const randomIndex = Math.floor(Math.random() * movies.length)
            setMovie(movies[randomIndex]);
        }catch (error) {
            console.log("Banner fetchRandomMovie error: ", error)
        }
    };

    useEffect(() => {
        fetchRandomMovie();
    }, [])

    function truncate(str, n) {
        return str?.length > n ?str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header 
            className="banner-container"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                roundPosition: "center-center",
            }}
            >
            <div className="banner-content">
                <h1 className="banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <button className="banner-button">Assistir</button>
                <button className="banner-button">Minha Lista</button>
                <div className="banner-description">
                    <h2>{truncate(movie.overview, 150)}</h2>
                </div>
            </div>
        </header>
    );
};

export default Banner;