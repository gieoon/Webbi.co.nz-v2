// Settings for what to show on the webpage
import React, {useState} from 'react';
import Twitter from '../assets/twitter.svg';
import Facebook from '../assets/facebook.svg';
import Linkedin from '../assets/linkedin.svg';
import Instagram from '../assets/instagram.svg';
import Email from '../assets/mail.svg';
import Phone from '../assets/phone.svg';
import Loading from './Loading';
import {HelpCircle} from 'react-feather';

export default function SettingsPopup({
    showing,
    shortId,
    currentSettings,
    setShowing,
}){
    if(!currentSettings) currentSettings = {};

    const [loading, setLoading] = useState(false);

    const submit = () => {
        setLoading(true);
        const out = {};
        const inputs = document.querySelectorAll('.SettingsPopup .content input');
        for(var input of Array.from(inputs)){
            // console.log(input);
            out[`${input.id}`] = input.value;
        }
        const textareas = document.querySelectorAll('.SettingsPopup .content textarea');
        for(var textarea of Array.from(textareas)){
            out[`${textarea.id}`] = textarea.value;
        }
        console.log(out);
        saveWebsiteSettingsToDB(shortId, out).then(code => {
            if(code){
                setLoading(false);
                setShowing(false);
            }
        })
    };

    return(
        <div className={"SettingsPopup"}>
            <div className={"overlay " + (showing ? "show" : "")} onClick={()=>{setShowing(false)}}></div>
            
            <div className={"content " + (showing ? "show" : "")}>
                <div className="content-header">
                    <h2>Page Info</h2>
                </div>
                <div className="content-inner">
                    <div className="content-text-wrapper">
                        <h4>Text on page</h4>
                        {/* Demo of where favicon is displayed on the browser in the help */}
                        {/* <ImgObj id="favicon" value={currentSettings.faviconUrl} placeholder="Favicon" /> */}
                        <FileObj id="faviconImg" value={currentSettings.faviconImg} placeholder="Favicon Image URL" help="The image that appears at the top of your browser, paste an image URL" />
                        <FileObj id="logoImg" value={currentSettings.logoImg} placeholder="Your Logo URL" help="A logo image to represent your brand, paste an image URL" />

                        <InputObj id="title" value={currentSettings.title} placeholder="Title" />
                        <InputObj id="navTitle" value={currentSettings.navTitle} placeholder="Navigator title" />
                        <InputObj id="header" value={currentSettings.header} placeholder="Header" />
                        <TextAreaObj id="description" value={currentSettings.description} placeholder="Description of this page" />
                        <InputObj id="companyName" value={currentSettings.companyName} placeholder="Company name" />
                        <InputObj id="section1Title" value={currentSettings.section1Title} placeholder="Top Section Title" />
                        <TextAreaObj id="section1Description" value={currentSettings.section1Description} placeholder="Top Section Description" />
                        <InputObj id="cta" value={currentSettings.cta} placeholder="Call To Action" help="Convince your customers to perform an action" />
                    </div>
                    <div className="content-selling-wrapper">
                        <h4>Selling points</h4>
                        <InputObj id="whyMeHeader" value={currentSettings.whyMeHeader} placeholder="Title for your selling points" help="Title text to put above your selling points" />
                        <InputObj id="whyMeDescription" value={currentSettings.whyMeDescription} placeholder="Description for your selling points" help="Description of your selling points" />
                        <FileObj id="whyMeImg1" value={currentSettings.whyMeImg1} placeholder="Image URL for selling point" help="Link to an Image URL to describe your selling point" />
                        <InputObj id="whyMeTitle1" value={currentSettings.whyMeTitle1} placeholder="Selling point title" help="What makes you unique?" />
                        <TextAreaObj id="whyMeDescription1" value={currentSettings.whyMeDescription1} placeholder="Description for your selling point" />
                        <FileObj id="whyMeImg2" value={currentSettings.whyMeImg2} placeholder="Image URL for selling point" help="Link to an Image URL to describe your selling point" />
                        <InputObj id="whyMeTitle2" value={currentSettings.whyMeTitle2} placeholder="Selling point title" help="What makes you unique?" />
                        <TextAreaObj id="whyMeDescription2" value={currentSettings.whyMeDescription2} placeholder="Description for your selling point" />
                        <FileObj id="whyMeImg3" value={currentSettings.whyMeImg3} placeholder="Image URL for selling point" help="Link to an Image URL to describe your selling point" />
                        <InputObj id="whyMeTitle3" value={currentSettings.whyMeTitle3} placeholder="Selling point title" help="What makes you unique?" />
                        <TextAreaObj id="whyMeDescription3" value={currentSettings.whyMeDescription3} placeholder="Description for your selling point" />
                        <FileObj id="whyMeImg4" value={currentSettings.whyMeImg4} placeholder="Image URL for selling point" help="Link to an Image URL to describe your selling point" />
                        <InputObj id="whyMeTitle4" value={currentSettings.whyMeTitle4} placeholder="Selling point title" help="What makes you unique?" />
                        <TextAreaObj id="whyMeDescription4" value={currentSettings.whyMeDescription4} placeholder="Description for your selling point" />
                    </div>
                    <div className="content-images-wrapper">
                        <h4>Images (link to URLs)</h4>
                        <FileObj id="backgroundImgUrl1" value={currentSettings.backgroundImgUrl1} placeholder="Image URL" help="First Background Image" />
                        <FileObj id="backgroundImgUrl2" value={currentSettings.backgroundImgUrl1} placeholder="Image URL" help="Second Background Image" />
                        <FileObj id="backgroundImgUrl3" value={currentSettings.backgroundImgUrl1} placeholder="Image URL" help="Third Background Image" />
                    </div>
                    <div className="content-social-wrapper">
                        <h4>Contact Methods</h4>
                        <InputObj id="facebook" value={currentSettings.facebook} placeholder="Facebook page" img={Facebook} social={true}/>
                        <InputObj id="linkedin" value={currentSettings.linkedin} placeholder="LinkedIn company page" img={Linkedin} social={true}/>
                        <InputObj id="twitter" value={currentSettings.twitter} placeholder="Twitter account" img={Twitter} social={true}/>
                        <InputObj id="instagram" value={currentSettings.instagram} placeholder="Instagram account" img={Instagram} social={true} />
                        <InputObj id="email" value={currentSettings.email} placeholder="Your Email" img={Email} social={true} />
                        <InputObj id="phone" value={currentSettings.phone} placeholder="Your Phone Number" img={Phone} social={true}/>
                    </div>
                </div>

                <div className="submit-wrapper">
                    <div className="submit" onClick={()=>{submit()}}>Save</div>
                </div>

                <Loading loading={loading}/>
            </div>
        </div>
    );
}

const InputObj = ({
    id,
    value,
    placeholder,
    img,
    social,
    help
}) => {
    // console.log(value);
    return(
        <div className={"inputObj " + (social ? "social" : "")}>
            {img && <img src={img} alt="" />}
            {!social && <HelpIcon placeholder={help || placeholder} />}
            <input id={id} defaultValue={value || ""} placeholder={placeholder} />
        </div>
    )
}

const FileObj = ({
    id,
    value,
    placeholder,
    help,
}) => {
    return(
        <div className="fileObj">
            <p className="description">{help}</p>
            {/* <input  type="file" /> */}
            <input id={id} type="text" defaultValue={value || ""} placeholder={placeholder} />
        </div>
    )
}

const TextAreaObj = ({
    id, value, placeholder, img, social, help
}) => {
    return(
        <div className={"textareaObj " + (social ? "social" : "")}>
            {img && <img src={img} alt="" />}
            {!social && <HelpIcon placeholder={help || placeholder} />}
            <textarea id={id} defaultValue={value || ""} placeholder={placeholder} />
        </div>
    )
}

const HelpIcon = ({
    placeholder
}) => {
    const [hovered, setHovered] = useState(false);

    return(
        <div className="settings-wrapper">
            <div className="settings-help">
                <HelpCircle size={18} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>{setHovered(false)}} />
            </div>
            <div className={"settings-description " + (hovered ? "show" : "")}>
                <label>{placeholder}</label>
            </div>
        </div>
    );
}

const saveWebsiteSettingsToDB = (shortId, data) => {
    if(!global.db) return;
    return global.db.collection('WebsiteContent')
        .doc(shortId)
        .set(data, {merge: true})
        .then(()=>{
            console.log('Success saving website content');
            return 1;
        })
        .catch(err => {
            console.error("Error saving website content: ", err);
            return 0;
        });
}
