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

// function generateUUID() {
//     const crypto = require("crypto");
//     return crypto.randomUUID();
// }

const querySelect = {
    select: {
        listProducts: "SELECT list.productid, list.productname, list.productshort, list.productdesc, list.productprice," +
            " list.productimage, list.producttags, categories.catname, subcats.subcatname FROM products.list " +
            "LEFT JOIN products.categories ON list.productcategory = categories.catid " +
            "LEFT JOIN products.subcats ON list.productsubcategory = subcats.subcatid WHERE productdeleted = 'n'",
        showProduct: "SELECT list.productname, list.productshort, list.productdesc, list.productprice," +
            " list.productimage, list.producttags, categories.catname, subcats.subcatname FROM products.list " +
            "LEFT JOIN products.categories ON list.productcategory = categories.catid " +
            "LEFT JOIN products.subcats ON list.productsubcategory = subcats.subcatid WHERE productid  = $1",
        showProductOptions: "SELECT * FROM products.options " +
            "LEFT JOIN products.prodopts ON prodopts.optid = options.optid" +
            " WHERE prodopts.prodid = $1",
        showOptItems: "SELECT * FROM products.optitems WHERE optid = $1",
        getProductPrice: "SELECT list.productprice FROM products.list WHERE productid = $1",
        getItemPrice: "SELECT optitems.itemprice FROM products.optitems WHERE itemid = $1",
        listCategories: "SELECT * FROM products.categories ORDER BY catrank",
        listSubcats: "SELECT * FROM products.subcats",
        listKeywords: "SELECT * FROM products.keywords",
    },
    insert: {
        addProduct: "INSERT INTO products.list (productid, productname, productshort, productdesc, productprice, productimage, " +
            "productcategory, productSubcategory, producttags, productdeleted, productdateadded) " +
            "VaLUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'n', now())",
        addKeyword: "INSERT INTO products.keywords (keyid, keyname, keydesc, keytype) VaLUES ($1, $2, $3, $4)",
        addProdopt: "INSERT INTO products.prodopts (optid, prodid) VaLUES ($1, $2)",
        addCategory: "INSERT INTO products.categories (catid, catname, catdesc, catavail, catrank) VaLUES ($1, $2, $3, $4, $5)",
        addSubcat: "INSERT INTO products.subcats (subcatid, subcatname) VaLUES ($1, $2)",
        addOption: "INSERT INTO products.options (optid, optname, optdesc, optType) VaLUES ($1, $2, $3, $4)",
        addItem: "INSERT INTO products.optitems (itemid, optid, itemname, itemValue, itemprice) VaLUES ($1, $2, $3, $4, $5)"
    },
    update: {
        editProduct: "UPDATE products.list SET productname = $2, productshort = $3, productdesc = $4, " +
            " productprice = $5, productimage = $6, productcategory = $7, productSubcat = $8, producttags = $8 " +
            " WHERE productid = $1",
        editSubcategory: "UPDATE products.subcats SET subcatname = $2 WHERE subcatid = $1",
        editCategory: "UPDATE products.categories SET catname = $2, catdesc = $3, catavail = $4 WHERE catid = $1"
    },
    delete: {
        removeProduct: "UPDATE products.list SET productdeleted='y' WHERE productid = $1",
        removeCategory: "DELETE FROM products.categories WHERE catid = $1",
        removeSubcategory: "DELETE FROM products.subcats WHERE subcatid = $1",
        deleteKeyword: "DELETE FROM products.keywords WHERE keyid = $1",
        deleteOption: "DELETE FROM products.options WHERE optid = $1",
        deleteOptItem: "DELETE FROM products.optitems WHERE itemid = $1"
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

const getProdPrice = (id) => {
    return getItem(querySelect.select.getProductPrice, id)
}

const getItemPrice = (id) => {
    return getItem(querySelect.select.getItemPrice, id)
}

// #############################################################################################

module.exports = {
    listProducts,
    listCategories,
    listSubcats,
    getDetails,
    getProdPrice,
    getItemPrice,
};