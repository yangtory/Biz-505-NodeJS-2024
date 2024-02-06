import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";

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

router.get("/insert", (req, res) => {
  return res.render("product/input");
});

// 라우터가 수신하고 파일이 있으면 upLoad 미들웨어에있는 single("input name")에게 전달, single=파일1개만 받겠음
router.post("/insert", upLoad.single("p_image"), (req, res) => {
  const file = req.file;
  return res.json({ body: req.body, file });
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
