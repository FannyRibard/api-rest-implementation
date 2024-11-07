const express = require('express');
const mongoose = require('mongoose');
const contactRouter = require('./routes/contact.routes');
const { StatusCodes } = require('http-status-codes');

// Launch express
const app = express();
const port = 3000;

// Connection to the local DB
mongoose.connect('mongodb://localhost/carnet-adresses');

// Allow the use of JSON request
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.get('/', (req, res) => {
    res.send('ok');
})

// For all paths that begin by "/contacts", we use the Contact router in ./routes/contact.routes
app.use('/contacts', contactRouter);

app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).send('Page not found');
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
})

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
})