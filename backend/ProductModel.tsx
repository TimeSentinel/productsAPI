//access to Postgres - development only!
// install dotenv to store values in a .env file and include that file in .gitignore
// required queries:
//      1. List products
//      2. Retrieve options for 1 product (options, items, types)
//      3. Edit options (options, items, types)
//      4. Edit products (Add, Edit, Delete)

/* todo: Queries;
list products w types IN ONE FIELD (ARRAY?)?
list options for specific product
list types for specific product
add product
 -- add options for product
 -- add types for product
delete product (mark as deleted)
update product ID
add/remove options for product ID
add/remove types for product ID
delete option id (and remove from products)
delete type id (and remove from products)
add category
del category (if not used, remove relqated subcategories)
edit category id
add/delete/edit subcategory id

todo: add password hash
todo: add uuid generator
 */

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "admin",
    host: "192.168.0.188",
    database: "test",
    password: "password123",
    port: 5432,
});

const querySelect = { //TODO: need to finish queries with db access
    productsList: "SELECT * FROM products.list WHERE productDeleted='n'",
    productsAdd: "INSERT INTO products.list " +
        "(productID, productName, productShort, productDesc, productPrice, productImage, productCategory, " +
        "productSubCategory, productDeleted, productDateAdded) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'n', $9) RETURNING *",
    productsDelete: "UPDATE products.list SET productDeleted = 'y' WHERE productID = $1 RETURNING *",
    productsUpdate: "UPDATE products.list SET " +
        "productName = $2, productShort = $3, productDesc = $4, productPrice = $5, productImage = $6," +
        " productCategory = $7, productSubCategory = $8 WHERE productID = $1 RETURNING *",
    optionsGet: "SELECT * FROM products.options WHERE fkProduct = $1",
    optionsAdd: "INSERT INTO products.options (keyID, fkProduct) VALUES ($1, $2) RETURNING * ",
    optionsUpdate: "UPDATE Options Set stuff to be equal WHERE id = $2 RETURNING *",
    optionsDelete: "DELETE FROM Options WHERE id = $1",
    typesGet: "SELECT * FROM products.types WHERE fkProduct = $1",
    typesAdd: "INSERT INTO types VALUES ($1, $2) RETURNING * ",
    typesUpdate: "UPDATE types Set stuff to be equal WHERE id = $2 RETURNING *",
    typesDelete: "DELETE FROM types WHERE id = $1"
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