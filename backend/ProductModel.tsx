//access to Postgres - development only!
// install dotenv to store values in a .env file and include that file in .gitignore
// required queries:
//      1. List products
//      2. Retrieve options for 1 product (options, items, types)
//      3. Edit options (options, items, types)
//      4. Edit products (Add, Edit, Delete)

/*
----------------------------------------------------------------------
todo: Queries;
LISTS
productsList: list products w types IN ONE FIELD (ARRAY?)?
productOptions: list options for specific productID
productTypes: list types for specific productID
optionTypes: list option types from optID
optionItems: list option items from optID
optionDefaults: list option defaults from optID

ADDS
productAdd: add product
productOptionAdd: add options for product ID
productTypeAdd: add types for product ID
optionAdd: create new optID
addOptionItem: add option item from optID
typeAdd: create new typeID
categoryAdd: add category
subcatAdd:

UPDATES
productUpdate: update product ID
optionUpdate: edit optID
typeUpdate: update new typeID
categoryUpdate: edit category id
subcatUpdate:

DELETES
productDelete: delete product (mark as deleted)
productTypeRemove: remove types for product ID
productOptionRemove: remove options for product ID
optionDelete: delete optID (and remove from products)
deleteOptionItem: remove option item from optID
typeDelete: delete typeID (and remove from products)
categoryDelete: del category (if not used, remove relqated subcategories)
subcatDelete: delete subcategory id

----------------------------------------------------------------------
todo: add password hash
todo: add uuid generator
todo: dotenv environment variables
 */

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "admin",
    host: "192.168.0.188",
    database: "test",
    password: "password123",
    port: 5432,
});

//TODO: need to finish queries with db access
const querySelect = {
    list: {
        productsList: "SELECT * FROM products.list WHERE productDeleted='n'",
        productOptions: "SELECT * FROM products.options WHERE fkProduct = $1",
        productTypes: "SELECT * FROM products.types WHERE fkProduct = $1",
        optionTypes: "",
        optionDefaults: "",
        optionItems: ""
    },
    add: {
        productAdd: "INSERT INTO products.list " +
            "(productID, productName, productShort, productDesc, productPrice, productImage, productCategory, " +
            "productSubCategory, productDeleted, productDateAdded) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'n', $9) RETURNING *",
        productOptionAdd: "",
        productTypeAdd: "",
        optionAdd: "",
        addOptionItem: "",
        typeAdd: "INSERT INTO types VALUES ($1, $2) RETURNING * ",
        categoryAdd: "",
        subcatAdd: ""
    },
    update: {
        productUpdate: "UPDATE products.list SET " +
            "productName = $2, productShort = $3, productDesc = $4, productPrice = $5, productImage = $6," +
            " productCategory = $7, productSubCategory = $8 WHERE productID = $1 RETURNING *",
        optionUpdate: "",
        typeUpdate: "UPDATE types Set stuff to be equal WHERE id = $2 RETURNING *",
        categoryUpdate: "",
        subcatUpdate: ""
    },
    delete: {
        productDelete: "UPDATE products.list SET productDeleted = 'y' WHERE productID = $1 RETURNING *",
        productOptionRemove: "",
        productTypeRemove: "",
        optionDelete: "",
        deleteOptionItem: "",
        typeDelete: "DELETE FROM types WHERE id = $1",
        categoryDelete: "",
        subcatDelete: ""
    }
}

const sendQuery = async (query, body) => {
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
    productsList,
    productOptions,
    productTypes,
    productAdd,
    productDelete,
    productUpdate,
    productOptionAdd,
    productOptionRemove,
    productTypeAdd,
    productTypeRemove,
    optionAdd,
    optionUpdate,
    optionDelete,
    optionTypes,
    optionDefaults,
    optionItems,
    addOptionItem,
    deleteOptionItem,
    optionsGet,
    typeAdd,
    typeUpdate,
    typeDelete,
    categoryAdd,
    categoryDelete,
    categoryUpdate,
    subcatAdd,
    subcatUpdate,
    subcatDelete
};