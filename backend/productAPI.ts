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
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});


// -------------------------------------------- GET --------------------------------------------

app.get('/', (req, res) => {
    switch (req.query.query) {
        case 'products':
            productQueries.listProducts()
                .then(response => {
                    res.status(200).send(response);
                    console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'categories':
            productQueries.listCategories()
                .then(response => {
                    res.status(200).send(response);
                    console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'subcats':
            productQueries.listSubcats()
                .then(response => {
                    res.status(200).send(response);
                    console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'card':
            productQueries.getDetails(req.query.id)
                .then(response => {
                    res.status(200).send(response);
                    console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'productprice':
            productQueries.getProdPrice(req.query.id)
                .then(response => {
                    res.status(200).send(response);
                    console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'itemprice':
            productQueries.getItemPrice(req.query.id)
                .then(response => {
                    res.status(200).send(response);
                    console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        default:
            res.sendStatus(404);
            break;
    }

})

// // --------------- PRODUCTS ---------------
// app.get('/products', (req, res) => {
//     productQueries.listProducts()
//         .then(response => {
//             res.status(200).send(response);
//         })
//         .catch(error => {
//             res.status(500).send(error);
//         })
// })
// // --------------- CATEGORIES ---------------
// app.get('/categories', (req, res) => {
//     productQueries.listCategories()
//         .then(response => {
//             res.status(200).send(response);
//         })
//         .catch(error => {
//             res.status(500).send(error);
//         })
// })
//
// // --------------- SUBCATEGORIES ---------------
// app.get('/subcats', (req, res) => {
//     productQueries.listSubcats()
//         .then(response => {
//             res.status(200).send(response);
//         })
//         .catch(error => {
//             res.status(500).send(error);
//         })
// })


// #############################################################################################


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})