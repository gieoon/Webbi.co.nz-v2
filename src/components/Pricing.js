import React from 'react';

export default function Pricing({

}){
    return (
        <div className="Pricing">
            {/* <h2>Grow your business. Create a digital presence.</h2> */}
            <h2 className="pricing-header"><span>Grow</span><span>Your</span><span>Business</span></h2>

            <p>Set up your website cost efficiently. Update your content without consulting anyone.</p>

            <div className="Wrapper">
                <PricingCard pricingType="Basic" bulletPoints={["Website from a template", "One-off fee", "Easy updates via Google Sheets", "Connect to a custom domain"]} price="$50 USD" />
                <PricingCard pricingType="Custom" bulletPoints={["Talk to sales about your custom design", "You can instantly update the website yourself", "No ongoing costs"]} price="Contact Sales" />
            </div>

            <div>
                <p>Have questions? 
                    <a href="mailto:jun.a.kagaya@gmail.com" alt="" rel="noopener noreferrer">Ask</a>
                </p>
            </div>
        </div>
    )
}

const PricingCard = ({
    pricingType,
    bulletPoints,
    price,
}) => {
       return(
           <div className="PricingCard">
               <h2>{pricingType}</h2>
               <p className="price">{price}</p>
               <ul>
                   {
                       bulletPoints.map((point, index) => (
                            <li key={"bulletpoint-" + index}>{point}</li>
                       ))
                   }
               </ul>
           </div>
       )
}