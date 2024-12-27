//access to Postgres - development only!
// install dotenv to store values in a .env file and include that file in .gitignore

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "my_user",
    host: "localhost",
    database: "my_database",
    password: "root",
    port: 5432,
});

//get all Products our database
const getProducts = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            // #################################### PRODUCTS QUERY ####################################
            pool.query("SELECT * FROM Products", (error, results) => {
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
        const { name, email } = body;
        // #################################### INSERT QUERY ####################################
        pool.query(
            "INSERT INTO Products (name, email) VALUES ($1, $2) RETURNING *",
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

//delete a Product
const deleteProduct = (id) => {
    return new Promise(function (resolve, reject) {
        // #################################### DELETE QUERY ####################################
        pool.query(
            "DELETE FROM Products WHERE id = $1",
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
        const { name, email } = body;
        // #################################### UPDATE QUERY ####################################
        pool.query(
            "UPDATE Products SET name = $1, email = $2 WHERE id = $3 RETURNING *",
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
    updateProduct
};