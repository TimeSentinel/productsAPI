/* ---------------------------------------
backend/dbSetup/productAPItest.ts
PROJECT: productsAPI;

(c) 2025 Lance Stubblefield 
--------------------------------------- */

const express = require("express");
const app = express()
const port = 3001
const productQueries = require("./ProductQueries.tsx")

app.use(express.json())
app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});


// -------------------------------------------- GET --------------------------------------------

// --------------- PRODUCTS ---------------
app.get('/products', (req, res) => {
    productQueries.listProducts()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})
// --------------- CATEGORIES ---------------
app.get('/categories', (req, res) => {
    productQueries.listCategories()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

// --------------- SUBCATEGORIES ---------------
app.get('/subcats', (req, res) => {
    productQueries.listSubcats()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})


// #############################################################################################



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})