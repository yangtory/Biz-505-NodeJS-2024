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

router.post("/bookinput", (req, res) => {
  const b_isbn = req.body.b_isbn;
  const b_title = req.body.b_title;
  const b_author = req.body.b_author;
  const b_publisher = req.body.b_publisher;
  const b_price = req.body.b_price;
  const b_discout = req.body.b_discout;
  const b_descrip = req.body.b_descrip;
  const b_pubdate = req.body.b_pubdate;
  const b_link = req.body.b_link;
  const b_image = req.body.b_image;

  const params = [b_isbn, b_title, b_author, b_publisher, b_price, b_discout, b_descrip, b_pubdate, b_link, b_image];
  const sql = " INSERT INTO tbl_books " + " VALUES(?,?,?,?,?,?,?,?,?,?) ";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect("/booklist");
    }
  });
});

router.get("/:b_isbn/detail", (req, res) => {
  const b_isbn = req.params.b_isbn;
  const params = [b_isbn];
  const sql = " SELECT * FROM tbl_books WHERE isbn = ?";
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.render("book/detail", { BOOK: result[0] });
    }
  });
});

export default router;
