import React from 'react';
import './Responsive.css';
import './App.css';
import Row from './Row';
import Banner from "./Banner";
import requests from "./requests";
import Nav from "./Nav";

function App() {
  return (
    <div className="app">
        <div className="left__container">
            <div className="nav__icon">
                <img src="logo512.png" className="logo" alt=""/>
                <h1 className="nav__title font-black">Trian Stream</h1>
                <p className="nav__tagline font-medium">Kick back n Chill</p>
                <hr className="divider"/>
                <ul className="nav__links">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Services</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                </ul>
                <hr className="divider-50"/>
                <ul className="nav__links__social">
                    <li>
                        <a href="#">
                            <i className="lni lni-instagram-filled icon"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="lni lni-youtube icon"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="lni lni-dribbble icon"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="lni lni-github-original icon"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer">
                <p>Copyright &copy; <a href="https://www.trianstudios.com" target="_blank">Trian Studios</a>. All rights reserved.</p>
            </div>
        </div>
      <div className="right__container">
          <Nav />
          <Banner />
          <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      </div>
    </div>
  );
}

export default App;
