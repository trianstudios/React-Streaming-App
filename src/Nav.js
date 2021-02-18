import React, {Component} from 'react';
import './Nav.css';
import $ from 'jquery';

function Nav() {

    const openMenu = function(e){
        $('#nav-icon4').toggleClass('open');
    }

    return (
        <div className="navigation_bar">
            <div className="">
                <img src="logo192.png" className="small__logo" alt="logo"/>
            </div>
            <div
                onClick={(e) => openMenu(e)}
                id="nav-icon4">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default Nav;