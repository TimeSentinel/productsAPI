-- create user login credential storage for admin screen
-- and setup initial login (admin/admin)
-- (c) 2025 Lance Stubblefield

CREATE SCHEMA userAccount;

CREATE TABLE IF NOT EXISTS userAccount.admin
(
    userID       UUID         NOT NULL,
    userName     varchar(255) NOT NULL,
    passwordHash varchar,
    active       varchar(1),
    role         varchar(255),
    access       varchar(255),
    PRIMARY KEY (userID),
    UNIQUE (userID)
);
-- admin/admin (bcrypt, cost 10, no salt)
INSERT INTO userAccount.admin(userID, userName, passwordHash, active, role, access)
VALUES(
       'a3d58939-f720-48c4-ac6b-3a97f2c07df9',
       'admin',
       '$2y$10$i5aF6yeWA2aG7poCRyqZEudCPN6XQCN3qc9SXOdjHmlEtn7sbUIXu',
       'y',
       'admin',
       'all'
      );
