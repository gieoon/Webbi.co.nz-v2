var admin = require('firebase-admin');

var serviceAccount = require("../server/db/sheets2website-1598313088115-firebase-adminsdk-qimn1-58d0982397.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sheets2website-1598313088115.firebaseio.com"
});

const db = admin.firestore();

// Create templates
db.collection('Constants')
    .doc('Templates')
    .set({
        templates: [
            { 
                name: 'Basic',
                callback: "",
                description: 'A basic template to serve your needs and get comfortable with Webbi.'
            },
            {
                name: 'Portfolio',
                callback: "",
                description: "Perfect for showing your product or something you've created",
            },
            {
                name: 'Blog',
                callback: "",
                description: "Create a blog with various posts and entries ordered by date",
            },
            {
                name: 'Job Listing Website',
                callback: "",
                description: "Show off a list of Excel documents"
            },
            {
                name: "News Website",
                callback: "",
                description: "Show a variety of articles that you have aggregated"
            },
            {
                name: 'Real Estate Website',
                callback: "",
                description: "Show beautiful listings simply and easily",
            },
            {
                name: 'Custom',
                callback: "",
                description: "Talk to us and let us know what you need, our in-houe designers will make something that fits your needs."
            }
        ]
    })
    .then(()=>{
        console.log('Templates created successfully');
    })
    .catch(err => {console.error("Error creating templates: ", err)});