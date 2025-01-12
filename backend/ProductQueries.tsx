/* ---------------------------------------
backend/ProductTest.tsx
PROJECT: productsAPI;

(c) 2025 Lance Stubblefield
--------------------------------------- */


const Pool = require("pg").Pool;

const pool = new Pool({
    user: "admin",
    host: "192.168.1.100",
    database: "test",
    password: "password123",
    port: 5432,
});

const querySelect = {
    select: {
        listProducts: "SELECT list.productID, list.productName, list.productShort, list.productDesc, list.productPrice, list.productImage, list.productTags, categoriesDefs.catName, categoriesSubcats.subcatName FROM products.list LEFT JOIN products.categoriesDefs ON list.productCategory = categoriesDefs.catID LEFT JOIN products.categoriesSubcats ON list.productSubCategory = categoriesSubcats.subcatID WHERE productDeleted = 'n'",
        listCategories: "SELECT * FROM products.categoriesDefs",
        listSubcategories: "SELECT * FROM products.categoriesSubcats",
        listKeywords: "SELECT * FROM products.keywordsDefs",
        listProductOptions: "SELECT options.value FROM products.options WHERE prodID = $1",
        listOptItems: "SELECT * FROM products.optItems WHERE optId = $1",
    },
    insert: {
        addProduct: "INSERT INTO products.list (productID, productName, productShort, productDesc, productPrice, productImage) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'n', now())",
        addKeyword: "INSERT INTO products.keywordsDefs (keyID, keyName, keyDesc, keyTypeID) VALUES ($1, $2, $3, $4)",
        addCategory: "INSERT INTO products.categoriesDefs (catID, catName, catDesc) VALUES ($1, $2, $3)",
        addSubcat: "INSERT INTO products.categoriesSubcats (subCatID, subCatName) VALUES ($1, $2)",
        addOption: "INSERT INTO products.options (optID, prodID, optName, optDesc, optType) VALUES ($1, $2, $3, $4, $5)",
        addItem: "INSERT INTO products.optItems (itemID, optID, itemName, itemValue, itemCost) VALUES ($1, $2, $3, $4, $5)"
    },
    update: {
        editProduct: "UPDATE products.list SET productName = $2, productShort = $3, productDesc = $4, productPrice = $5, productImage = $6, productCategory = $7, productSubcat = $8, productTags = $8 WHERE UUID = $1",
        editSubcategory: "UPDATE products.categoriesSubcats SET subCatName = $2 WHERE subCatID = $1",
        editCategory: "UPDATE products.categoriesDefs SET catName = $2, catDesc = $3, catAvail = $4 WHERE UUID = $1"
    },
    delete: {
        removeProduct: "UPDATE products.list SET productDeleted='y' WHERE UUID = $1",
        removeCategory: "DELETE FROM products.categoriesDefs WHERE catID = $1",
        removeSubCategory: "DELETE FROM products.categoriesSubcats WHERE subcatID = $1",
        deleteKeyword: "DELETE FROM products.keywordsDefs WHERE keyID = $1",
        deleteOption: "DELETE FROM products.options WHERE optID = $1",
        deleteOptItem: "DELETE FROM products.optItems WHERE itemID = $1"
    }
}

//get all Products our database
const listQuery = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            // #################################### PRODUCTS QUERY ####################################
            pool.query(querySelect.select.listProducts, (error, results) => {
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

module.exports = {
    //addQuery,     // (productAdd,productOptionAdd,productTypeAdd,optionAdd,addOptionItem,typeAdd,categoryAdd,subcatAdd)
    listQuery    // (productsList,productOptions,productTypes,optionTypes,optionDefaults,optionItems)
    //updateQuery,  // (productUpdate,optionUpdate,typeUpdate,categoryUpdate,subcatUpdate)
    //deleteQuery   // (productDelete,productOptionRemove,productTypeRemove,optionDelete,deleteOptionItem,typeDelete,categoryDelete,subcatDelete)
};