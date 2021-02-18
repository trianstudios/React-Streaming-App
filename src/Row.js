import React, {useState, useEffect, Fragment} from 'react';
import "./Row.css";
import $ from 'jquery';
import axios from './axios';
import helpers from "./helpers";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';
import ErrorModal from "./ErrorModal";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }){

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    };

    const [modalTitle, setModalTitle] = useState("");

    const [modalMessage, setModalMessage] = useState("");

    const [showModal, setModalVisibility] = useState(false);

    const [movies, setMovies] = useState([]);

    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {

        // if [], run once when the row loads, and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();

    }, [fetchUrl]);

    function closeOpen(elID){

        var posters = document.querySelectorAll('.row_poster_large');

        posters.forEach(function (item, index) {

            var posterInfo = $(item).find('.poster__info').get(0);

            if($(item).attr('id') === elID){

                if($(posterInfo).hasClass('hidden')) {

                    $(posterInfo).removeClass('hidden').css({width: '400px', padding: '0px 20px'});
                    setTimeout(function () {
                        $(posterInfo).find('.poster__info__container').removeClass('hidden');
                    }, 330);

                }else{


                    $(posterInfo).find('.poster__info__container').addClass('hidden');
                    $(posterInfo).addClass('hidden').css({width: '0px', padding: '0px'});

                }

            }else{

                $(posterInfo).addClass('hidden').css({width: '0px', padding: '0px'});
                $(posterInfo).find('.poster__info__container').addClass('hidden');

            }

        });

    }

    function showDetails(e) {

        e.preventDefault();

        var parent = e.target.parentElement;

        if(parent !== undefined && parent !== null) {

            closeOpen(parent.id);

        }

    }

    const toggleLoading = (el, btnText, loading) => {

        if(loading){
            $(el).empty().append(
                '<div class="spinner"><div></div><div></div><div></div><div></div></div>'
            );
        }else{
            $(el).empty().text(btnText);
        }

    }
    
    const showTrailer = (e, movie) => {

        var button = e.target;

        var btnText = button.innerText;

        toggleLoading(button, btnText, true);

        if(trailerUrl){

            setTrailerUrl('');

        }else{

            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                    setTimeout(function(){
                        toggleLoading(button, btnText, false);
                    }, 500);
                }).catch((error) => {
                    // setModalTitle("Error Occurred");
                    // setModalMessage(error.message);
                    // setModalVisibility(true);
                    setTimeout(function(){
                        toggleLoading(button, btnText, false);
                    }, 500);
                });

        }

    }

    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <Fragment>
                        { isLargeRow ?
                            <div
                                key={movie.id}
                                id={movie.id}
                                className="row_poster_large">
                                <img
                                    onClick={showDetails}
                                    src={`${base_url}${ isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                    alt={movie.name}
                                />
                                <div className="animateWidth poster__info hidden">
                                    <div className="poster__info__container hidden">
                                        <h1 className="poster__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                                        <div>
                                            <ul className="info__details_list">
                                                <li className="info__details_list_item">
                                                    <span className="font-normal">Release Date</span><br/>
                                                    <span className="font-bold">{ movie.first_air_date }</span>
                                                </li>
                                                <li className="info__details_list_item">
                                                    <span className="font-normal">Origin Country</span><br/>
                                                    <span className="font-bold">{ movie.origin_country[0] }</span>
                                                </li>
                                                <li className="info__details_list_item">
                                                    <span className="font-normal">Language</span><br/>
                                                    <span className="font-bold">{ movie.original_language }</span>
                                                </li>

                                            </ul>
                                        </div>
                                        <p className="poster__description">{helpers.truncate(movie?.overview, 200)}</p>
                                        <div className=" m-t-20">
                                            <button className="button black__button capsule-outline">
                                                <i className="lni lni-play"></i>
                                                <span className="m-r-15 m-l-10">Play</span>
                                            </button>
                                            <button
                                                onClick={(e) => showTrailer(e, movie)}
                                                className="button black__button capsule-outline">
                                                <span className="m-r-15 m-l-10">Trailer</span>
                                            </button>
                                            <button className="circle-button black__button circle-outline">
                                                <i className="lni lni-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="row__poster">
                                <img
                                    key={movie.id}
                                    className=""
                                    src={`${base_url}${ isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                    alt={movie.name}
                                />
                                <h5 className="poster__small__title font-medium">{movie?.title || movie?.name || movie?.original_name}</h5>
                            </div>
                        }
                    </Fragment>
                ))}
            </div>
            <ErrorModal title={modalTitle} message={modalMessage} show={showModal} />
            { trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );

}

export default Row