import React, { useState, useEffect } from 'react';
import "./Banner.css";
import axios from "./axios";
import requests from "./requests";
import helpers from "./helpers";
import Nav from "./Nav";

function Banner(){

    const [movie, setMovie] = useState([]);

    useEffect(() => {

        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]
            );
            return request;
        }

        fetchData();

    }, []);

    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center top"
        }}>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner__description">{helpers.truncate(movie?.overview, 300)}</h1>
            </div>
            <div className="banner__overlay"></div>
        </header>
    );
}

export default Banner;