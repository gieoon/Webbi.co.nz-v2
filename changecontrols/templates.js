const db = require('./index.js');

// Create templates
db.collection('Constants')
    .doc('Templates')
    .set({
        templates: {
            LANDING_PAGE: {
                name: 'Landing Page',
                description: 'Create a page to showcase your new product',
                columns: ['Name', 'Image link', 'Description', 'Date', 'Additional content'],
            },
            CREATIVE: { 
                name: 'Creative',
                description: 'Showcase your creativity.',
                columns: ['Name','Image link','Description','Date', 'Additional content']
            },
            // PORTFOLIO: {
            //     name: 'Portfolio',
            //     callback: "",
            //     description: "Perfect for showing your product or something you've created",
            //     columns: ['Name','Image link','Description','Date', 'Price', 'Location', 'Additional content'],
            // },
            // CV: {
            //     name: 'CV/Resume',
            //     callback: "",
            //     description: "Create your CV/Resume as a website",
            //     columns: ['Name','Image link','Description','Date', 'Price', 'Location', 'Additional content'],
            // },
            // BLOG: {
            //     name: 'Blog',
            //     callback: "",
            //     description: "Create a blog with various posts and entries ordered by date",
            //     columns: ['Name','Image link','Description','Date', 'Price', 'Location', 'Additional content'],
            // },
            // HEALTH_AND_BEAUTY: {
            //     name: 'Health & Beauty Website',
            //     callback: "",
            //     description: "Perfect for displaying your health & beauty products",
            //     columns: ['Name','Image link','Description','Date', 'Price', 'Location', 'Additional content'],
            // },
            // JOB_LISTING: {
            //     name: 'Job Listing Website',
            //     callback: "",
            //     description: "Show off a list of Excel documents",
            //     columns: ['Name','Image link','Description','Date', 'Price', 'Location', 'Additional content'],
            // },
            // NEWS: {
            //     name: "News Website",
            //     callback: "",
            //     description: "Show a variety of articles that you have aggregated",
            //     columns: ['Name','Image link','Description','Date', 'Price', 'Location', 'Additional content'],
            // },
            // REAL_ESTATE: {
            //     name: 'Real Estate Website',
            //     callback: "",
            //     description: "Show beautiful listings simply and easily",
            //     columns: ['Name','Image link','Description','Date', 'Price', 'Location', 'Additional content'],
            // },
            // MUSICIAN: {
            //     name: 'Artist/Musician Website',
            //     callback: "",
            //     description: "Create a website to display your content",
            //     columns: ['Name','Image link','Description','Date', 'Price', 'Location', 'Additional content'],
            // },
            // CUSTOM: {
            //     name: 'Custom',
            //     callback: "",
            //     description: "Talk to us and let us know what you need, our in-house designers will make something that fits your needs.",
            //     columns: [],
            // }
        }
    })
    .then(()=>{
        console.log('Templates created successfully');
    })
    .catch(err => {console.error("Error creating templates: ", err)});