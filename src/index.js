// ./src/index.js
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { Monei } = require('@monei-js/node-sdk');
const monei = new Monei('pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [
    { title: 'Hello, world (again)!' }
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));


app.get('/create-payment', async (req, res) => {
    const hostname =  req.hostname;
    var orderId = Math.trunc(Math.random() * Math.pow(10,14));
    var payment = await monei.payments.create({
        amount: 110,
        currency: 'EUR',
        orderId: orderId.toString(),
        description: 'Test Shop - #'+orderId.toString(),
        customer: {
            email: 'john.doe@microapps.com'
        },
        callbackUrl: `https://${hostname}`,
        completeUrl: `https://${hostname}`,
        cancelUrl: `https://${hostname}`
    });
    res.send(payment);
});


// defining an endpoint to return all ads
app.get('/', (req, res) => {
    res.send(ads);
});

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});