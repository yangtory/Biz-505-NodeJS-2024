import mysql from "mysql2";

const mysql_info = {
  host: "localhost",
  port: "3306",
  user: "****",
  password: "****",
  database: "****",
};

const dbCreate = {
  init: () => {
    console.log("My SQL Connection!!");
    return mysql.createConnection(mysql_info);
  },
};

export default dbCreate;
