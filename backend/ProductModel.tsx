//access to Postgres - development only!
// install dotenv to store values in a .env file and include that file in .gitignore
// required queries:
//      1. List products
//      2. Retrieve options for 1 product (options, items, types)
//      3. Edit options (options, items, types)
//      4. Edit products (Add, Edit, Delete)

/*
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
    select: {
        listProducts: "SELECT list.productID, list.productName, list.productShort, list.productDesc, list.productPrice," +
            "list.productImage, categories_defs.catName, categories_subcats.subcatName FROM products.list" +
            "LEFT JOIN products.categories_defs ON list.productCategory = categories_defs.catID" +
            "LEFT JOIN products.categories_subcats ON list.productSubCategory = categories_subcats.subcatID" +
            "WHERE productDeleted = 'n'",
        listCategories: "SELECT * FROM products.categoriesDefs",
        listSubcategories: "SELECT * FROM products.categoriesSubcats",
        listKeywords: "SELECT * FROM products.keywordsDefs",
        listProductOptions: "SELECT * FROM products.options",
        listOptionsDefs: "SELECT * FROM products.optionsDefs",
        listOptionsTypes: "SELECT * FROM products.optionsTypes",
        listOptionsItems: "SELECT * FROM products.optionsItems"
    },
    insert: {
        addProduct : "INSERT INTO products.list" +
            "(productID, productName, productShort, productDesc, productPrice, productImage)" +
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'n', now())",
        addKeyword : "INSERT INTO products.keywordsDefs" +
            "(keyID, keyName, keyDesc, keyTypeID)" +
            "VALUES ($1, $2, $3, $4)"
    },
    update: {
        editProduct : "UPDATE products.list" +
            "SET productName = $2, productShort = $3, productDesc = $4, productPrice = $5, productImage = $6," +
            "productCategory = $7, productSubcat = $8, productTags = $8" +
            "WHERE UUID = $1",
        editSubcategory : "UPDATE products.categoriesSubcats" +
            "SET subCatName = $2" +
            "WHERE subCatID = $1",
        editCategory : "UPDATE products.categoriesDefs" +
            "SET catName = $2, catDesc = $3, catAvail = $4" +
            "WHERE UUID = $1",
        editOptionTypes : "UPDATE products.optionTypes" +
            "SET optTypesID = $2, optTypeValue = $3" +
            "WHERE optTypesID = $1",
        editOptionItems : "UPDATE products.optionsItems" +
            "SET optItemName = $2, optItemDefault = $3, optCost = $4" +
            "WHERE fkValue = $1",
        editOptionDefs : "UPDATE products.optionsDefs" +
            "SET optValue = $2, optType = $3, optDesc = $4" +
            "WHERE fkValue = $1"
    },
    delete: {
        removeProduct : "UPDATE products.list" +
            "SET productDeleted='y'" +
            "WHERE UUID = $1",
        removeCategory : "DELETE FROM products.categoriesDefs" +
            "WHERE catID = $1",
        removeSubCategory : "DELETE FROM products.categoriesSubcats" +
            "WHERE subcatID = $1",
        deleteKeyword : "DELETE FROM products.keywordsDefs" +
            "WHERE keyID = $1",
        deleteOptionsDefs : "DELETE FROM products.optionsDefs" +
            "WHERE optValue = $1",
        deleteOptionItems : "DELETE products.optionItems" +
            "WHERE optItemName = $1"
    }
}

const mongoose = async (query, body) => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query(queryString + "$1" + "$2", (error, results) => {
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
const listQuery = async () => {
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
const addQuery = (body) => {
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
const deleteQuery = (id) => {
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
const updateQuery = (id, body) => {
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
    addQuery,     // (productAdd,productOptionAdd,productTypeAdd,optionAdd,addOptionItem,typeAdd,categoryAdd,subcatAdd)
    listQuery,    // (productsList,productOptions,productTypes,optionTypes,optionDefaults,optionItems)
    updateQuery,  // (productUpdate,optionUpdate,typeUpdate,categoryUpdate,subcatUpdate)
    deleteQuery   // (productDelete,productOptionRemove,productTypeRemove,optionDelete,deleteOptionItem,typeDelete,categoryDelete,subcatDelete)
};