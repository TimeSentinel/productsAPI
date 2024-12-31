// required queries:
//      1. List products
//      2. Retrieve options for 1 product (options, items, types)
//      3. Edit options (options, items, types)
//      4. Edit products (Add, Edit, Del

import express from "express";
const app = express()
const port = 3001
import product_model from './ProductModel'

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    product_model.getProducts()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/products', (req, res) => {
    product_model.createProduct(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.delete('/products/:id', (req, res) => {
    product_model.deleteProduct(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    product_model
        .updateProduct(id, body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})