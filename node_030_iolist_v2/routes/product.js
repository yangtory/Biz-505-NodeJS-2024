import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";
// sequelize 를 사용할때 추가로 제공되는 확장 연산자
import { Op } from "sequelize";

const PRODUCTS = DB.models.tbl_products;
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;

const router = express.Router();

router.get("/", async (req, res) => {
  const p_search = req.query.p_search || ""; //p_search가 ""이면 걍 문자열 보내, 이거안하면 list초기화면 안뜸
  const sort = req.query.sort || "p_code"; //기본값 지정, sort 없으면 p_code로 검색
  const order = req.query.order || "ASC";

  const rows = await PRODUCTS.findAll({
    where: {
      [Op.or]: [{ p_name: { [Op.like]: `%${p_search}%` } }, { p_code: `${p_search}` }],
      // 조건을 두개를 해놓으면 and 연산자가돼서 아무것도 안나옴
      // p_name: { [Op.like]: `%${p_search}%` },
      // p_code: { [Op.like]: `%${p_search}%` },
    },
    order: [[sort, order]],
  });
  return res.render("product/list", { PRODUCTS: rows, p_search }); // p_search를 render를통해 list에게 보내줌
});

// 검색 내가한거
// router.get("/", async (req, res) => {
//   const rows = await PRODUCTS.findAll({
//     order: [["p_code", "DESC"]],
//   });

//   const search = req.query.p_search;
//   if (search) {
//     const pname = await PRODUCTS.findAll({
//       where: { p_name: search },
//     });
//     return res.render("product/list", { PRODUCTS: pname });
//   }
//   return res.render("product/list", { PRODUCTS: rows });
// });

// router.get("/insert", (req, res) => {
//   return res.render("product/input");
// });

/**
 * 상품코드는 1자리의 Prifix(P) 와 5자리의 연속된 일련번호 형식
 * 상품코드는 중복되면 절대 안되고, 빈(blank,Empty) 값도 안된다.
 * 규칙이 자릿수가 일정한 형태
 *
 * 새로운 상품코드를 생성하기 위하여
 * 1. 기존의 DB Table 에서 가장 큰 상품코드 값을 추출하기
 * 2. Prefix 를 분리
 * 3. 숫자 부분을 분리
 * 4. 숫자 부분의 문자열을 숫자로 변경하고 +1 을 실행
 * 5. Prefix 와 숫자 부분을 결합하여 코드로 생성
 * 6. 숫자부분의 자릿수를 맞추고 공백부분을 0으로 채워넣어야 한다.
 */
const makePCode = (pcode) => {
  const pCodePrefix = pcode.substring(0, 1); //p 추출
  let pCodeNum = pcode.substring(1); // 숫자 부분
  const pCodeNumLength = pCodeNum.length; // 문자열 길이 추출

  pCodeNum = String(Number(pCodeNum) + 1);
  pCodeNum = "0000000000" + pCodeNum;

  // pCodeNum.length = 10 + 숫자 자릿수,
  // 전체 pCodeNum 의 전체 길이에서 원래 코드 숫자부분의 길이 빼기
  pCodeNum = pCodeNum.substring(pCodeNum.length - pCodeNumLength);
  return `${pCodePrefix}${pCodeNum}`;
};

const makePCodeNew = (pcode) => {
  const pCodePrefix = pcode.substring(0, 1);
  let pCodeNum = pcode.substring(1);
  const pCodeNumLength = pCodeNum.length;

  pCodeNum = String(Number(pCodeNum) + 1);
  /**
   * 문자열.padStart(길이, 패턴)
   *
   * 문자열 값을 전체 "길이" 개수만큼 만들고
   * 왼쪽에 비어있는 곳은 "패턴"으로 채워넣은 문자열을 생성하라
   */
  pCodeNum = pCodeNum.padStart(pCodeNumLength, "0"); // 코드 길이만큼 0채워
  return `${pCodePrefix}${pCodeNum}`;
};

router.post("/insert", upLoad.single("p_image"), async (req, res) => {
  let pCdoe = req.body.p_code;
  if (pCdoe === "000") {
    // findAll() 을 실행한 결과가 비록 SELECT 된 결과가 0개 또는 1개 이지만
    // 결과는 배열(List) 이다.
    const rows = await PRODUCTS.findAll({
      order: [["p_code", "DESC"]],
      limit: 1,
    });
    pCdoe = rows[0].p_code;
    pCdoe = makePCodeNew(pCdoe);
    req.body.p_code = pCdoe;
  }
  const file = req.file;
  if (file) {
    req.body.p_image_name = file.filename;
    req.body.p_image_origin_name = file.originalname;
  }
  try {
    await PRODUCTS.create(req.body);
    return res.redirect("/products/");
  } catch (error) {
    return res.json(error);
  }
  // return res.json({ body: req.body, file });
});

// p_code 만들기 내가한거
// 라우터가 수신하고 파일이 있으면 upLoad 미들웨어에있는 single("input name")에게 전달, single=파일1개만 받겠음
// router.post("/insert", upLoad.single("p_image"), async (req, res) => {
//   const file = req.file;

//   const list = await PRODUCTS.findAll({
//     order: [["p_code", "DESC"]],
//   });
//   const last = "P" + String(Number(list[0].p_code.substring(2)) + 1).padStart(5, "0");
//   req.body.p_code = last;

//   return res.json({ body: req.body, file });
// return res.json(row);
// });

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
