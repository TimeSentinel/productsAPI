-- Products module tables
-- Load basic required data
-- (c) 2025 Lance Stubblefield


INSERT INTO products.keywords(keyID, keyName, keyDesc, keyType)
VALUES('6a503e0d-9206-4a52-bd85-eb2db1b65f3c','alcohol', 'Contains alcohol.', "diet"),
      ('cf68c60a-4774-4690-88fa-6d24e53cdaa2','allergen','Contains commonly known allergens (ie. peanuts, shellfish).', "diet"),
      ('ec097db1-b413-43e5-9495-945cb1ac83e0','meat','Contains animal proteins.', "diet"),
      ('92d247a7-8186-4d51-9d2b-258b34951286','fish','Contains protein primarily from fish/seafood.', "diet"),
      ('906eb015-da83-4b53-8ace-3b3e01fa47b1','vegetarian','Mostly plant-based proteins or has vegetarian options. May contain dairy, honey, and/or egg products', "diet"),
      ('352d69f2-1daf-45fc-9ab5-55fa93843e37','vegan','Vegan or vegan options. Entirely plant-based. No animal products.', "diet"),
      ('b8eb49f0-3b8f-4e73-b4bb-704c07af1aa0','dairy','Contains dairy based ingredients.', "diet"),
      ('97c7a7b4-57e4-4319-b65a-33d6d3a58050','low-carb','Low-carb meal option.', "diet"),
      ('659e9f51-7432-44e6-8bf5-b7beb6039fee','low-fat','This product is low in fat.', "diet"),
      ('77e84df2-9407-4d52-8127-4f2a2961fb3b','gluten free','Does NOT contain gluten ingredients or has gluten-free options.', "diet"),
      ('6993d2b6-62ad-419c-aa99-e4f67d3bd372','sweet','Has more of a sweet taste.', "taste"),
      ('b39d1387-2db8-44b2-a796-b535650a213f','savory','Balanced salty and sweet flavor.', "taste"),
      ('bd6d52b9-ff43-45b2-89ec-3da5b3749b77','spicy','Maybe a little spicy or has spicy options.', "taste"),
      ('a45acd55-d9f1-49b6-b298-0289a71713e5','hot','Considered hot by most or has very spicy options.', "taste"),
      ('128605d8-1a24-471a-ab5d-a4f3398e45db','American','American origin or style.)', "ethnicity"),
      ('ef6d159c-2a39-4e38-ae7e-9e0f8519b054','Asian','Asian origin or style.)', "ethnicity"),
      ('33e14fba-f4d4-4394-aa9b-1ad895fe6e09','European','European origin or style.)', "ethnicity"),
      ('7a15a803-689b-48c1-80e6-ee83d9b49a5f','Mexican','Mexican origin or style.)', "ethnicity"),
      ('ba0bf540-e25f-4a9a-b251-9a793e6ee022','Chinese','Chinese origin or style.)', "ethnicity"),
      ('9a5b8062-488a-4abd-858f-dde50de5f47b','Indian','Indian origin or style.)', "ethnicity"),
      ('5c07bf3a-83c5-40dd-b5c8-14a0a31dcd87','Italian','Italian origin or style.)', "ethnicity"),
      ('35597aa2-13a8-4485-879a-8417f49aa63d','Greek','Greek origin or style.)', "ethnicity"),
      ('e7b42161-4cee-4606-bd41-1f49ea9ebc4d','French','French origin or style.)', "ethnicity"),
      ('2885fd4d-82e4-4fe3-9cf0-a1c4bb91c58f','Fusion','A mix of cultures.)', "ethnicity"),
      ('14ab6cfe-78c0-4e25-ba4a-bd312dc21eee','Middle Eastern','Middle Eastern origin or style.)', "ethnicity");

INSERT INTO products.categories(catID, catName, catDesc, catAvail)
VALUES('b6a666ce-4bad-4ba3-bea6-21b252090533', 'Breakfast', 'Traditional morning delights.', 'Opening until noon.'),
     ('83b38dd7-18cd-4b06-9c8f-8923b5432bda', 'Lunch', 'Middle of the day nutrition to keep you going!', '10am until 5pm, daily.'),
     ('ebe993da-245a-4b6b-9853-227e9610d8f9', 'Dinner', 'Early evening meal to round out your day.', '4pm until close.'),
     ('6e008a71-3375-4839-aacf-f27a8e3c1521', 'Dessert', 'Want a sweet treat to finish off your meal?', 'Any time of day!'),
     ('71dd97ef-de40-4e85-a5c0-1bdddb24704e', 'Beverages', 'Quench your thirst and satisfy your cravings!', 'All day long.');

INSERT INTO products.subcats(subcatID,subcatName)
    VALUES ('fde3bd12-b5a3-4466-8667-edf0c5f08f44','Meals'),
            ('140a814f-9fe5-47af-987c-fcf924704a4f','Omelets'),
            ('4f97743e-87e0-45d5-bb4c-c7200a187466','Sandwiches'),
            ('92fe5e22-d55d-486d-80b4-3559c04ad08e','Sides'),
            ('e7521804-1d09-4e50-9f8d-c9e81c263eb9','Sandwiches'),
            ('0d8d3b91-29f1-466b-8da9-949d2508521c','Tacos'),
            ('6e07c72a-c230-4e99-9596-6c91ec147363','Burritos'),
            ('d8cbf11f-d29f-4e4e-a19c-3670d7243b2d','Soups'),
            ('8a1f0614-9c8d-47bd-9c89-461f6770a64f','Salads'),
            ('8c02b7e0-8fd3-4dc8-9019-e6b916349516','Entrees'),
            ('ad21bdba-5fce-412f-944d-3fd48447a71b','Light Meals'),
            ('2aa8c54a-6d0c-4f17-bac8-bc7ce247b79a','A La Carte'),
            ('b8704f24-5852-42af-91e4-13c944f8acbd','Sinful'),
            ('26b15107-2ccb-4ef4-9926-3431766e3246','Sugar-Free'),
           ('1a8376ce-bbfe-4ec5-a41c-06f6be2c25b5','Wines'),
           ('2f75d204-2af8-49b3-93e0-0a10f93944cf','Juices'),
           ('5e00c409-0e7b-41b5-b6d2-d1f698106a2b','Soft Drinks'),
           ('42e4fb99-a4cf-45c8-8871-92f4ff20d3c8','Dairy');


