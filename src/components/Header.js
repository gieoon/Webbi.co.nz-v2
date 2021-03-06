import React, {useState, useEffect} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import logo from '../assets/logo_254.png';
import HamburgerMenu from 'react-hamburger-menu';
import {Send, Phone} from 'react-feather';

export default function Header(){
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    let { url } = useRouteMatch();

    const handleHamburgerClicked = (e) => {
        // console.log('Hamburger clicked: ', document.getElementById('logo').opacity);
        if(!hamburgerOpen){
            document.getElementById('logo').style.opacity = 0;
            document.getElementById('header-contact-wrapper').style.opacity = 0;
        } else {
            document.getElementById('logo').style.opacity = 1;
            document.getElementById('header-contact-wrapper').style.opacity = 1;
        }
        setHamburgerOpen(!hamburgerOpen);
        
    }

    useEffect(()=>{
        // console.log(window.innerWidth);
        if(window.innerWidth < 620){
            setIsMobile(true);
            
        }
    }, []);

    return(
        <nav className="Header">
            <div className="Header-wrapper">
                <div>
                    <img id="logo" className="logo" src={logo} alt="Webbi's logo" />
                </div>
                {
                    isMobile
                    ? <div className="minicontact" id="header-contact-wrapper">
                        <div className="row">
                            <a href="mailto:jun.a.kagaya@gmail.com">
                                <Send size={22}/>
                                <small>hello@webbi.co.nz</small>
                            </a>
                        </div>
                        <div className="row">
                            <Phone size={22}/>
                            <small>(+64) 022-091-0069</small>
                        </div>
                    </div>
                    : <></>
                }
                { isMobile
                    ? <div className="hamburger-wrapper">
                        <HamburgerMenu
                            isOpen={hamburgerOpen}
                            menuClicked={handleHamburgerClicked.bind(this)}
                            width={28}
                            height={22}
                            strokeWidth={1}
                            rotate={0}
                            color='#F55826'
                            borderRadius={0}
                            animationDuration={0.5}
                        />
                    </div>

                    : <div className="Links-wrapper">
                        <div><a href={"/"}>Home</a></div>
                        <div><a href={url+"#ourwork"}>Work</a></div>
                        <div><a href={url+"#about"}>About</a></div>
                        <div><a href={url+"#faq"}>FAQ</a></div>
                        <div><a href={url+"#contact"}>Contact</a></div>
                    </div>
                }
            </div>
            {/* Overlay menu */}
            <div className={"hamburger-overlay " + (hamburgerOpen ? "show" : "")}>
                <div className="overlay-links-wrapper">
                    <div><a href={"/"}>Home</a></div>
                    <div><a href="#ourwork" onClick={()=>{handleHamburgerClicked()}}>Work</a></div>
                    <div><a href="#about" onClick={()=>{handleHamburgerClicked()}}>About</a></div>
                    <div><a href="#faq" onClick={()=>{handleHamburgerClicked()}}>FAQ</a></div>
                    <div><a href="#contact" onClick={()=>{handleHamburgerClicked()}}>Contact</a></div>
                </div>
            </div>
        </nav>
    )
}
