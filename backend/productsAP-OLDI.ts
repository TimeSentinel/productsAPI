//todo: passport.js / login credentials?
//todo: UUID generations

const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const port = 3001
const productModule = require("./ProductModule")

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    productModule.getProducts()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/products', (req, res) => {
    productModule.createProduct(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.delete('/products/:id', (req, res) => {
    productModule.deleteProduct(req.params.id)
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
    productModule.deleteQuery
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