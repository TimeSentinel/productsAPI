SELECT list.productID,
       list.productName,
       list.productShort,
       list.productDesc,
       list.productPrice,
       list.productImage,
       categories_defs.catName,
       categories_subcats.subcatName,
       STRING_AGG(CONCAT(keywords_types.keyTypeName, ':', keywords_defs.keyName), ',') AS tastes -- <------ keywords

FROM products.list
         LEFT JOIN products.categories_defs ON list.productCategory = categories_defs.catID
         LEFT JOIN products.categories_subcats ON list.productSubCategory = categories_subcats.subcatID
         LEFT JOIN products.keywords on keywords.fkproduct = list.productID -- <------ keywords
         LEFT JOIN products.keywords_defs on keywords.keyid = keywords_defs.keyid -- <------ keywords
         LEFT JOIN products.keywords_types ON keywords_defs.keyTypeID = keywords_types.keyTypeID -- <------ keywords
WHERE productDeleted = 'n'
