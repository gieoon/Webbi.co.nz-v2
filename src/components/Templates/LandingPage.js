import React, { useState, useEffect } from 'react';
import './LandingPage.scss';
import emailImg from '../../assets/mail.svg';
import phoneImg from '../../assets/phone.svg';
import facebookImg from '../../assets/facebook.svg';
import twitterImg from '../../assets/twitter.svg';
import linkedinImg from '../../assets/linkedin.svg';
import instagramImg from '../../assets/instagram.svg';
import webbi from '../../assets/logo_254.png';
import EditableHeader from '../../editables/EditableHeader';
import EditableFooter from '../../editables/EditableFooter';
import ContentList from '../ContentList';
import EmptySheetData from '../EmptySheetData';

import {WEBBI_ADDRESS} from '../../constants';
import {convertDriveURL} from '../../utils/commonFunctions';
import '../../dist/bootstrap-creative.scss';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../dist/css/bootstrap.min.css';

export default function LandingPage({
    sheetData,
    websiteContent,
}){
    console.log('Basic template: ', sheetData, websiteContent);
    
    useEffect(()=>{
        specialScript();
    }, []);

    useEffect(()=>{
        document.title = websiteContent.title;
        console.log("websitecontent: ", websiteContent)
    }, [websiteContent]);

    useEffect(()=>{

    }, [sheetData])

    // const get = (key) => {
    //     return data.Content[key]?.content;
    // }
    // const getStyle = (key) => {
    //     return data.Content[key]?.style;
    // }

    return(
        <div className="LandingPage">
            
            <nav id="mainNav" className="navbar navbar-expand-lg navbar-light fixed-top py-3">
                <div className="container">
                    <a id="P_pageName" className="navbar-brand js-scroll-trigger" href="#page-top" style={{pointerEvents:"initial"}}>
                        {websiteContent.navTitle}
                    </a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto my-2 my-lg-0">
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" href="#about" style={{pointerEvents: "initial"}}>About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" href="#services" style={{pointerEvents: "initial"}}>Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" href="#portfolio" style={{pointerEvents: "initial"}}>Portfolio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" href="#contact" style={{pointerEvents: "initial"}}>Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="masthead" 
                style={{backgroundImage: `url(${convertDriveURL(websiteContent.backgroundImgUrl1 || "")})`}}
            >
                <div className="container h-100">
                    <div id="title-area" className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-10 align-self-end">
                            <h1 id="P_headerName" className="text-uppercase text-white font-weight-bold">
                                {websiteContent.header}
                            </h1>
                            <hr className="divider my-4" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p id="P_titleDescription" className="text-white-75 font-weight-light mb-5">
                                {websiteContent.description}
                            </p>
                            <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about" style={{pointerEvents: "initial"}}>
                                {/* Find out more */}
                                {websiteContent.cta}
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <section id="about" className="page-section bg-primary" >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 id="P_section1Header" className="text-white mt-0">
                                {websiteContent.section1Title}
                            </h2>
                            <hr className="divider light my-4" />
                            <p id="P_section1Description" className="text-white-50 mb-4">
                                {websiteContent.section1Description}
                            </p>
                            {/* <a className="btn btn-light btn-xl js-scroll-trigger" href="#services" style={{pointerEvents:"initial"}}>
                                Get Started!
                            </a> */}
                        </div>
                    </div>
                </div>
                <SheetContent sheetData={sheetData} />
            </section>

            <section className="page-section" id="services">
                <div className="container">
                    <h2 className="text-center mt-0">
                        {websiteContent.whyMeHeader}
                    </h2>
                    <hr className="divider my-4" />
                    <div className="col-lg-8 align-self-baseline text-center" style={{margin:"auto"}}>
                        <p className="text-black-75 font-weight-light mb-5 text-center">
                            {websiteContent.whyMeDescription}
                        </p>
                    </div>
                    
                    <div className="row">
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <img src={convertDriveURL(websiteContent.whyMeImg1)} alt="" />
                                <h3>{websiteContent.whyMeTitle1}</h3>
                                <p>{websiteContent.whyMeDescription1}</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <img src={convertDriveURL(websiteContent.whyMeImg2)} alt="" />
                                <h3>{websiteContent.whyMeTitle2}</h3>
                                <p>{websiteContent.whyMeDescription2}</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <img src={convertDriveURL(websiteContent.whyMeImg3)} alt="" />
                                <h3>{websiteContent.whyMeTitle3}</h3>
                                <p>{websiteContent.whyMeDescription3}</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <img src={convertDriveURL(websiteContent.whyMeImg4)} alt="" />
                                <h3>{websiteContent.whyMeTitle4}</h3>
                                <p>{websiteContent.whyMeDescription4}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* <div id="portfolio"> */}
                {/* <ContentList contents={sheetData}  /> */}
                
            {/* </div> */}

            <footer className="bg-light py-5">
                <div className="container" id="contact">
                    <h5 style={{textAlign: "center",marginBottom:"1rem"}}>{websiteContent.cta}</h5>
                    <div style={{display:"flex",justifyContent:"center",flexDirection:"row",marginBottom:".75rem"}}>
                        <div>
                            <a href={"mailto:" + websiteContent.email} >
                                <img src={emailImg} alt="" />
                                <span>{websiteContent.email}</span>
                            </a>
                        </div>
                        <div style={{width: "1.6rem"}}></div>
                        <div>
                            <img src={phoneImg} alt=""/>
                            <span>{websiteContent.phone}</span>
                        </div>
                        <div style={{width:"3rem"}}></div>
                        <div style={{display:"flex",justifyContent:"center",flexDirection:"row"}}>
                            {websiteContent.facebook && <Social imgSrc={facebookImg} url={websiteContent.facebook} />}
                            {websiteContent.linkedin && <Social imgSrc={linkedinImg} url={websiteContent.linkedin} />}
                            {websiteContent.twitter && <Social imgSrc={twitterImg} url={websiteContent.twitter} />}
                            {websiteContent.instagram && <Social imgSrc={instagramImg} url={websiteContent.instagram} />}
                        </div>
                    </div>
                    <div id="P_footerCompanyName" className="small text-center text-muted">
                        Copyright &copy; {new Date().getFullYear()} - {websiteContent.companyName}
                    </div>
                    <div id="P_webbiCredit" className="small text-center text-muted" style={{marginTop:".5rem"}}>
                        This website was built using <a href={WEBBI_ADDRESS} target="_blank" rel="noopener noreferer">Webbi</a>
                    </div>
                </div>

            </footer>
        </div>
    )
}

const Social = ({
    imgSrc, url
}) => {
    return(
        <div>
            <a href={url} target="_blank" rel="noopener noreferer">
                <img src={imgSrc} alt="" />
            </a>
        </div>
    )
}

const SheetContent = ({sheetData}) => {
    return(
        <>
        { sheetData.length 
            ? <div className="container-fluid p-0">
                <div className="row no-gutters">
                    {
                        sheetData.map((data) => (
                            <div className="col-lg-4 col-sm-6">
                                <a className="portfolio-box" href="" style={{pointerEvents:"initial"}}>
                                    <img className="img-fluid" src={convertDriveURL(data.imgUrl)} alt={data.title} />
                                    <div className="portfolio-box-caption">
                                        <div className="project-name">
                                            {data.title}
                                        </div>
                                        <div className="project-category text-white-50">
                                            {data.description}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    }
                </div>
            </div>
        : <EmptySheetData /> 
        }
        </>
    )
}

const specialScript=()=>{
    const btn = document.querySelector('.navbar-toggler');
    btn.onclick = () => {
        btn.classList.toggle('collapsed');
        btn.setAttribute("aria-expanded", btn.classList.contains("collapsed").toString())
        document.querySelector('#navbarResponsive').classList.toggle('show')
    }

    var navbarCollapse = function() {
        console.log(document.getElementById("mainNav").clientHeight)
        if (window.scrollY > 100) {
            document.getElementById("mainNav").classList.add("navbar-scrolled");
        } else {
            document.getElementById("mainNav").classList.remove("navbar-scrolled");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    window.onscroll = () => navbarCollapse();
}
/*!
    * Start Bootstrap - Creative v6.0.3 (https://startbootstrap.com/themes/creative)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
    */
/*
const specificScript = () => {
    
   (function($) {
        "use strict"; // Start of use strict
    
        // Smooth scrolling using jQuery easing
        var scrollTriggers = document.querySelectorAll('a.js-scroll-trigger[href*="#"]:not([href="#"])');
        scrollTriggers.forEach(el => {
            el.onclick = () => {
                if (window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && window.location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                    $('html, body').animate({
                        scrollTop: (target.offset().top - 72)
                    }, 1000, "easeInOutExpo");
                    return false;
                    }
                }
            }
        })
    
        // Closes responsive menu when a scroll trigger link is clicked
        var triggers = document.querySelectorAll('.js-scroll-trigger');
        triggers.forEach((el) => {
            el.onclick = () => {
                document.querySelector('.navbar-collapse').collapse('hide')
            }
        })
    
        // Activate scrollspy to add active class to navbar items on scroll
        // document.getElementsByTagName('body').scrollspy({
        //     target: '#mainNav',
        //     offset: 75
        // });
    
        // Collapse Navbar
        var navbarCollapse = function() {
            if (document.getElementById("mainNav").offsetTop > 100) {
                document.getElementById("mainNav").classList.add("navbar-scrolled");
            } else {
                document.getElementById("mainNav").classList.remove("navbar-scrolled");
            }
        };
        // Collapse now if page is not at top
        navbarCollapse();
        // Collapse the navbar when page is scrolled
        window.onscroll = () => {navbarCollapse()};
    
    })(); // End of use strict
}
*/

/*
<div className="Basic">

    <EditableHeader />
    <ContentList contents={data}  />
    <EditableFooter />

</div>
*/

/*
            <h2 id='C_TOP_HEADER' style={getStyle('C_TOP_HEADER')}>{get('C_TOP_HEADER')}</h2>
            <div>
                <p id="C_SECTION_1" style={getStyle('C_SECTION_1')}>{get('C_SECTION_1')}</p>
            </div>
            <div>
                <p id="C_SECTION_2" style={getStyle('C_SECTION_2')}>{get('C_SECTION_2')}</p>
            </div>
            <div>
                <p id="C_SECTION_3" style={getStyle('C_SECTION_3')}>{get('C_SECTION_3')}</p>
            </div>
            <div >
                <div id="C_FOOTER" style={getStyle('C_FOOTER')}>
                    <div id="C_EMAIL" style={getStyle('C_EMAIL')}>
                        <Mail />
                        <a href={`mailto:${get('C_EMAIL')}`}> {get('C_EMAIL')}</a>
                    </div>
                    <div id="C_MOBILE_NUMBER" style={getStyle('C_MOBILE_NUMBER')}>
                        <Phone />
                        <span> {get('C_MOBILE_NUMBER')}</span>
                    </div>
                    <div id="C_FACEBOOK" style={getStyle('C_FACEBOOK')}>
                        <span>{get('C_FACEBOOK')}</span>
                        <Facebook />
                    </div>
                    <div id="C_LINKEDIN" style={getStyle('C_LINKEDIN')}>
                        <span>{get('C_LINKEDIN')}</span>
                        <Linkedin />
                    </div>
                    <div id="C_INSTAGRAM" style={getStyle('C_INSTAGRAM')}>
                        <span>{get('C_INSTAGRAM')}</span>
                        <Instagram />
                    </div>
                    <div id="C_TWITTER" style={getStyle('C_TWITTER')}>
                        <span>{get('C_TWITTER')}</span>
                        <Twitter />
                    </div>
                </div>
                <div id="footer">
                    <img src={webbi} alt="" />
                    <span>{get('C_FOOTER')}</span>
                </div>
            </div>

*/