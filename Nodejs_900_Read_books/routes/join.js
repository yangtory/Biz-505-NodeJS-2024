import express from "express";
import DB from "../config/mysql.js";

const router = express.Router();
const dbConn = DB.init();

router.get("/", (req, res) => {
  return res.render("book/join");
});

router.post("/join", (req, res) => {
  const M_ID = req.body.id;
  const M_PASSWORD = req.body.password;
  const M_EMAIL = req.body.email;
  const M_NAME = req.body.name;

  const params = [M_ID, M_PASSWORD, M_EMAIL, M_NAME];
  const sql = " INSERT INTO tbl_members(M_ID, M_PASSWORD, M_EMAIL, M_NAME) " + " VALUES = (?,?,?,?) ";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.render("/");
    }
  });
});

export default router;
