const express = require("express");

const app = express.Router();

const category = require("./subRoutes/category")

const subCategory = require("./subRoutes/subCategory")

const accounts = require("./subRoutes/accounts")

const products = require("./subRoutes/products")

const transaction = require("./subRoutes/transaction")

const faq = require("./subRoutes/faq")

app.use("/account", accounts)

app.use("/category", category)

app.use("/subCategory", subCategory)

app.use("/products", products)

app.use("/transaction", transaction)

app.use("/faq", faq)

module.exports = app;