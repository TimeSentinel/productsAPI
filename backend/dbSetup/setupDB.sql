-- create Products module tables
--
-- (c) 2025 Lance Stubblefield

CREATE SCHEMA products;

-- Categories ------------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.categories (
    catid UUID NOT NULL unique primary key,
    catname varchar(255) NOT NULL,
    catdesc varchar(255),
    catavail varchar(255),
    catrank integer
);

CREATE TABLE IF NOT EXISTS products.subcats (
    subcatid UUID NOT NULL unique primary key ,
    subcatname varchar(255) NOT NULL
);

-- KEYWORDS ------------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.keywords (
    keyid uuid unique primary key,
    keyname varchar(255) NOT NULL,
    keydesc varchar(255),
    keytype varchar(16)
);

-- OPTIONS ------------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.options (
    optid UUID NOT NULL unique primary key,
    optname varchar(255) NOT NULL,
    optdesc varchar(255),
    opttype varchar(16)
);

CREATE TABLE IF NOT EXISTS products.optitems (
    itemid UUID NOT NULL unique primary key ,
    optid UUID,
    itemname varchar(255) NOT NULL,
    itemvalue varchar(255),
    itemcost numeric(5, 2)
);

CREATE TABLE IF NOT EXISTS products.prodopts (
    optid UUID NOT NULL,
    prodid UUID NOT NULL
);

-- PRODUCT LIST/CATALOG ------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.list (
    productid UUID NOT NULL unique primary key ,
    productname varchar(255),
    productshort varchar(255),
    productdesc varchar,
    productprice numeric(5,2),
    productimage varchar(255),
    productcategory UUID references products.categories(catid),
    productsubcategory UUID references products.subcats(subcatid),
    producttags varchar,
    productdeleted char(1),
    productdateadded date,

);


