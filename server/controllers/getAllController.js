const db = require("../../database/pg_model.js");
const { query } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllController = {};

getAllController.getAllBuyers = async (req, res, next) => {
  const queryString = "SELECT buyer_email from public.buyers";
  await db
    .query(queryString)
    // .then((res) => res.rows)
    .then((data) => {
      res.locals.buyerUsers = data.rows;
    })
    .catch((err) => next(err));
  return next();
};

getAllController.getAllSellers = async (req, res, next) => {
  const queryString =
    "SELECT seller_email, seller_nickname from public.sellers";
  await db
    .query(queryString)
    .then((data) => data.rows)
    .then((data) => (res.locals.sellerUsers = data))
    .catch((err) => next(err));
  return next();
};

module.exports = getAllController;
