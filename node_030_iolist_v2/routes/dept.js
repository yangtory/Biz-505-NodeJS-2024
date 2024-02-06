import express from "express";
import DB from "../models/index.js";
const DEPTS = DB.models.tbl_depts;
const router = express.Router();

router.get("/", async (req, res) => {
  const rows = await DEPTS.findAll({
    limit: 10,
    order: [["d_code", "ASC"]],
  });
  return res.render("dept/list", { DEPTS: rows });
});

router.get("/insert", (req, res) => {
  return res.render("dept/insert");
});

export default router;
