import express from "express";
import DB from "../models/index.js";

const router = express.Router();
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;
const PRODUCTS = DB.models.tbl_products;

router.get("/", async (req, res) => {
  try {
    // iolist 전체를 가져오고 프로덕트 모델을 포함시켜
    const rows = await IOLIST.findAll({
      include: [
        { model: PRODUCTS, as: "IO_상품" },
        { model: DEPTS, as: "IO_거래처" },
      ],
    });
    // return res.json(rows);
    return res.render("iolist/list", { IOLIST: rows });
  } catch (error) {
    res.json(error);
  }
});

router.get("/insert", async (req, res) => {
  const user = req.session?.user; // session 에 있는 user 정보 가져오기
  if (user) {
    return res.render("iolist/input");
  } else {
    const message = "로그인이 필요한 서비스 입니다";
    return res.redirect(`/users/login?fail=${message}`);
  }
});

router.get("/:io_seq/detail", async (req, res) => {
  const seq = req.params.io_seq;
  const row = await IOLIST.findByPk(seq);
  return res.render("iolist/detail", { IO_ITEM: row });
});

router.get("/:io_seq/delete", async (req, res) => {
  const seq = req.params.io_seq;
  const row = await IOLIST.findByPk(seq);
  row.io_delete = 1;
  await row.save();
  return res.redirect("/iolist");
});

router.get("/count", async (req, res) => {
  const rows = await IOLIST.findAll();
  return res.json({ count: rows.length });
});
export default router;
