//access to Postgres - development only!
// install dotenv to store values in a .env file and include that file in .gitignore
// required queries:
//      1. List products
//      2. Retrieve options for 1 product (options, items, types)
//      3. Edit options (options, items, types)
//      4. Edit products (Add, Edit, Delete)


const Pool = require("pg").Pool;

const pool = new Pool({
    user: "admin",
    host: "192.168.0.188",
    database: "test",
    password: "password123",
    port: 5432,
});

const querySelect = { //TODO: need to finish queries with db access
    productsList: "SELECT * FROM Products WHERE deleted=False",
    productsAdd: "INSERT INTO Products (things go here) VALUES ($1, $2) RETURNING *",
    productsDelete: "UPDATE Products SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    productsUpdate: "UPDATE Products SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    optionsGet: "SELECT * FROM Options WHERE product_id = $1",
    optionsAdd: "INSERT INTO Options VALUES ($1, $2) RETURNING * ",
    optionsUpdate: "UPDATE Options Set stuff to be equal WHERE id = $2 RETURNING *",
    optionsDelete: "DELETE FROM Options WHERE id = $1"
}

const sendQuery = async (query,body) => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(results.rows);
                } else {
                    reject(new Error("No results found"));
                }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
};



//get all Products our database
const getProducts = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            // #################################### PRODUCTS QUERY ####################################
            pool.query(querySelect.productsList, (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(results.rows);
                } else {
                    reject(new Error("No results found"));
                }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
};

//create a new Product record in the databsse
const createProduct = (body) => {
    return new Promise(function (resolve, reject) {
        const {name, email} = body;
        // #################################### INSERT QUERY ####################################
        pool.query(
            querySelect.productsAdd,
            [name, email],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(
                        `A new Product has been added: ${JSON.stringify(results.rows[0])}`
                    );
                } else {
                    reject(new Error("No results found"));
                }
            }
        );
    });
};

//delete an Option
const deleteOption = (id) => {
    return new Promise(function (resolve, reject) {
        // #################################### DELETE QUERY ####################################
        pool.query(
            querySelect.optionsDelete,
            [id],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(`Product deleted with ID: ${id}`);
            }
        );
    });
};

//update a Product record
const updateProduct = (id, body) => {
    return new Promise(function (resolve, reject) {
        const {name, email} = body;
        // #################################### UPDATE QUERY ####################################
        pool.query(
            querySelect.productsUpdate,
            [name, email, id],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(`Product updated: ${JSON.stringify(results.rows[0])}`);
                } else {
                    reject(new Error("No results found"));
                }
            }
        );
    });
};
module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getOptions,
    addOption,
    updateOption,
    deleteOption
};