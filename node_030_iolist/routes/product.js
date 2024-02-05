import express from "express";
import DB from "../models/index.js";
const PRODUCTS = DB.models.tbl_products;
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;

const router = express.Router();

router.get("/", async (req, res) => {
  const rows = await PRODUCTS.findAll({
    limit: 10,
    order: [["p_code", "ASC"]],
  });
  return res.render("product/list", { PRODUCTS: rows });
});

router.get("/:pcode/detail", async (req, res) => {
  const pcode = req.params.pcode;
  const row = await PRODUCTS.findByPk(pcode, {
    include: {
      model: IOLIST,
      as: "IOS",
      include: { model: DEPTS, as: "IO_거래처" },
    },
  });
  return res.render("product/detail", { PRODUCT: row });
});

router.get("/insert", async (req, res) => {
  const user = req.session?.user;
  if (user) {
    return res.render("product/insert");
  } else {
    const message = "로그인이 필요한 서비스 입니다";
    return res.redirect(`/users/login?fail=${message}`);
  }
});

router.post("/insert", async (req, res) => {
  const data = req.body;
  try {
    await PRODUCTS.create(data, { where: { p_code: req.body.p_code } });
    return res.redirect("/products");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:pcode/update", async (req, res) => {
  const pcode = req.params.pcode;
  const row = await PRODUCTS.findByPk(pcode);
  // return res.json(row);
  return res.render("product/insert", { PRODUCT: row });
});

router.post("/:pcode/update", async (req, res) => {
  const pcode = req.params.pcode;
  const data = req.body;
  try {
    await PRODUCTS.update(data, { where: { p_code: pcode } });
    return res.redirect(`/products/${pcode}/detail`);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:pcode/delete", async (req, res) => {
  const row = await PRODUCTS.destroy({
    where: { p_code: req.params.pcode },
  });
  return res.redirect("/products");
});

export default router;
