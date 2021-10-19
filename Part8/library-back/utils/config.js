require('dotenv').config();

let PORT = process.env.PORT || 3003;

const MONGODB_URI = process.env.DB_CONN_STRING;
const MONGODB_URI_W_PWORD = process.env.DB_CONN_STRING_WITH_PWORD;

module.exports = {
  PORT,
  MONGODB_URI,
  MONGODB_URI_W_PWORD
};