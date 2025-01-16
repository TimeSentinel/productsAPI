-- create Products module tables
--
-- (c) 2025 Lance Stubblefield

CREATE SCHEMA products;

-- Categories ------------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.categories (
    catID UUID NOT NULL,
    catName varchar(255) NOT NULL,
    catDesc varchar(255),
    catAvail varchar(255),
    catRank integer,
    PRIMARY KEY(catID),
    UNIQUE(catID)
);

CREATE TABLE IF NOT EXISTS products.subcats (
    subcatID UUID NOT NULL UNIQUE,
    subcatName varchar(255) NOT NULL
);

-- KEYWORDS ------------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.keywords (
    keyID uuid unique,
    keyName varchar(255) NOT NULL,
    keyDesc varchar(255),
    keyType varchar(16)
);

-- OPTIONS ------------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.options (
    optID UUID NOT NULL UNIQUE,
    optName varchar(255) NOT NULL,
    optDesc varchar(255),
    optType varchar(16)
);

CREATE TABLE IF NOT EXISTS products.optItems (
    itemID UUID NOT NULL UNIQUE,
    optID UUID,
    itemName varchar(255) NOT NULL,
    itemValue varchar(255),
    itemCost numeric(5, 2)
);

CREATE TABLE IF NOT EXISTS products.prodOpts (
    optID UUID NOT NULL,
    prodID UUID NOT NULL
);

-- PRODUCT LIST/CATALOG ------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.list (
    productID UUID NOT NULL,
    productName varchar(255),
    productShort varchar(255),
    productDesc varchar,
    productPrice numeric(5,2),
    productImage varchar(255),
    productCategory UUID REFERENCES products.categories(catID),
    productSubCategory UUID REFERENCES products.subcats(subcatID),
    productTags varchar,
    productDeleted char(1),
    productDateAdded date,
    PRIMARY KEY(productID),
    UNIQUE(productID)
);


