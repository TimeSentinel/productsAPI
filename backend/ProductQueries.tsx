/* ---------------------------------------
backend/ProductTest.tsx
PROJECT: productsAPI;

(c) 2025 Lance Stubblefield
--------------------------------------- */

const Pool = require("pg").Pool;
require("dotenv").config();

console.log(process.env.DB_NAME)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

function generateUUID() {
    const crypto = require("crypto");
    return crypto.randomUUID();
}

const querySelect = {
    select: {
        listProducts: "SELECT list.productID, list.productName, list.productShort, list.productDesc, list.productPrice," +
            " list.productImage, list.productTags, categories.catName, subcats.subcatName FROM products.list " +
            "LEFT JOIN products.categories ON list.productCategory = categories.catID " +
            "LEFT JOIN products.subcats ON list.productSubCategory = subcats.subcatID WHERE productDeleted = 'n'",
        showProduct: "SELECT list.productName, list.productShort, list.productDesc, list.productPrice," +
            " list.productImage, list.productTags, categories.catName, subcats.subcatName FROM products.list " +
            "LEFT JOIN products.categories ON list.productCategory = categories.catID " +
            "LEFT JOIN products.subcats ON list.productSubCategory = subcats.subcatID WHERE productID  = $1",
        showProductOptions: "SELECT * FROM products.options " +
            "LEFT JOIN products.prodopts ON prodopts.optid = options.optid" +
            " WHERE prodopts.prodID = $1",


        showOptItems: "SELECT * FROM products.optItems WHERE optId = $1",
        listCategories: "SELECT * FROM products.categories ORDER BY catrank",
        listSubcats: "SELECT * FROM products.subcats",
        listKeywords: "SELECT * FROM products.keywords",
    },
    insert: {
        addProduct: "INSERT INTO products.list (productID, productName, productShort, productDesc, productPrice, productImage, " +
            "productCategory, productSubcategory, productTags, productDeleted, productDateAdded) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'n', now())",
        addKeyword: "INSERT INTO products.keywords (keyID, keyName, keyDesc, keyTypeID) VALUES ($1, $2, $3, $4)",
        addProdOpt: "INSERT INTO products.prodOpts (optID, prodID) VALUES ($1, $2)",
        addCategory: "INSERT INTO products.categories (catID, catName, catDesc, catAvail, catRank) VALUES ($1, $2, $3, $4, $5)",
        addSubcat: "INSERT INTO products.subcats (subCatID, subCatName) VALUES ($1, $2)",
        addOption: "INSERT INTO products.options (optID, optName, optDesc, optType) VALUES ($1, $2, $3, $4, $5)",
        addItem: "INSERT INTO products.optItems (itemID, optID, itemName, itemValue, itemCost) VALUES ($1, $2, $3, $4, $5)"
    },
    update: {
        editProduct: "UPDATE products.list SET productName = $2, productShort = $3, productDesc = $4, productPrice = $5, productImage = $6, productCategory = $7, productSubcat = $8, productTags = $8 WHERE UUID = $1",
        editSubcategory: "UPDATE products.subcats SET subCatName = $2 WHERE subCatID = $1",
        editCategory: "UPDATE products.categories SET catName = $2, catDesc = $3, catAvail = $4 WHERE UUID = $1"
    },
    delete: {
        removeProduct: "UPDATE products.list SET productDeleted='y' WHERE UUID = $1",
        removeCategory: "DELETE FROM products.categories WHERE catID = $1",
        removeSubCategory: "DELETE FROM products.subcats WHERE subcatID = $1",
        deleteKeyword: "DELETE FROM products.keywords WHERE keyID = $1",
        deleteOption: "DELETE FROM products.options WHERE optID = $1",
        deleteOptItem: "DELETE FROM products.optItems WHERE itemID = $1"
    }
}

// ---------------------------------------------------- LISTS ----------------------------------------------------
const listStuff = async (arg) => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query(arg, (error, results) => {
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

const getItem = async (arg, id) => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query(arg, [id], (error, results) => {
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
}


const listCategories = () => listStuff(querySelect.select.listCategories)
const listProducts = () => listStuff(querySelect.select.listProducts)
const listSubcats = () => listStuff(querySelect.select.listSubcats)

const getDetails = (id) => {
    const prodDetails = getItem(querySelect.select.showProduct, id)
    const prodOptions = getItem(querySelect.select.showProductOptions, id)
    return Promise.all([prodDetails, prodOptions]).then(results => {
        // @ts-ignore
        return Promise.all(results[1].map(option =>
            getItem(querySelect.select.showOptItems, option.optid).then(optItems => {
                    return {
                        "optid": option.optid,
                        "optname": option.optname,
                        "optdesc": option.optdesc,
                        "opttype": option.opttype,
                        "items": optItems
                    }
                }
            )
        )).then(options => {
            console.log(results[0])
            return {
                ...results[0][0],
                "options": options
            }
        })
    })
}

/*Promise.all(results[1].map(option =>
                        getItem(querySelect.select.showOptItems, option.optid)
                    )).then((items) => {
                        items.map((item) => {
                            return {
                                "optid": option.optid,
                                "optname": option.optname,
                                "optdesc": option.optdesc,
                                "optType": option.opttype,
                            }
                        })
                    }

 */

// #############################################################################################

module.exports = {
    listProducts,
    listCategories,
    listSubcats,
    getDetails,
};