import express from "express";
import DB from "../config/mysql.js";

const router = express.Router();
const dbConn = DB.init();

router.get("/", (req, res) => {
  const sql = " SELECT * FROM tbl_books";
  dbConn.query(sql, (err, result) => {
    if (err) {
      return res.json();
    } else {
      return res.render("book/list", { bookList: result });
    }
  });
});

router.get("/bookinput", (req, res) => {
  return res.render("book/input");
});

router.post("/");
export default router;
