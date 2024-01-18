/**
 * express 프레임워크를 사용하여
 * router 객체 생성
 * 밑의 두 줄은 초기화 코드, 준비
 */
import express from "express";
/**
 * mysql.js 에서 선언하고 export 한 dbCreate 를
 * import DB 라는 이름으로 사용하겠다
 */
import DB from "../config/mysql.js";
const router = express.Router();
// dbCreate 에서 선언된 init() 함수를 호출하여 return 된 정보를 dbConn 변수(객체)에 저장하라
const dbConn = DB.init();

// localhost:3000/student/ 이 마지막 / 를 말함
router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_student";
  dbConn.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // return res.json(result);
      //앞에 / 는 생략되어 있따
      return res.render("student/list", { stList: result });
    }
  });
});

// localhost:3000/student/insert
// GET: localhost:3000/student/insert 겟 방식으로 서비스를 요청
router.get("/insert", (req, res) => {
  return res.render("student/input");
});

// POST: localhost:3000/student/insert 데이터 뭉탱이를 보낼때
router.post("/insert", (req, res) => {
  // form 을 통해 전달된(전송된) 데이터를 변수에 저장해 두기
  const st_num = req.body.st_num;
  const st_name = req.body.st_name;
  const st_dept = req.body.st_dept;

  // DB 에 insert 를 하기 위해 배열 type 으로 변환
  // 변수 없이 만들기 : const params = [req.body.st_num, req.body.st_name, req.body.st_dept];
  const params = [st_num, st_name, st_dept];
  const sql = "INSERT INTO tbl_student(st_num, st_name, st_dept)" + "VALUES(?,?,?)";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // insert 가 성공한 경우 List 를 보여주는 화면으로 전환해라
      return res.redirect("/student");
    }
  });
});
// GET: localhost:3000/student/이몽룡/detail
// GET: localhost:3000/student/홍길동/detail
// GET: localhost:3000/student/학번/detail 요청을 하면
// 주소 중간에 끼워넣어진 학번을 st_num 변수를 통하여 받아라
router.get("/:st_num/detail", (req, res) => {
  // 주소에 포함되어 전달된 값을 변수에 저장하기
  const st_num = req.params.st_num;
  const params = [st_num];
  const sql = "SELECT * FROM tbl_student WHERE st_num = ?";
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // return res.json(result);
      return res.render("student/detail", { STD: result[0] }); // 결과라 배열로 만들어져 있어서
    }
  });
});

router.get("/:st_num/check", (req, res) => {
  const st_num = req.params.st_num;
  const sql = "SELECT st_num FROM tbl_student WHERE st_num = ?"; // 학버으로 조회해서 학번만보기
  dbConn.query(sql, [st_num], (err, result) => {
    if (err) {
      res.json({ result: "ERROR", message: err }); // 변수 두개 만듬
    } else {
      if (result.length > 0) {
        return res.json({ result: "있다", STD: result[0] });
      } else {
        return res.json({ result: " 없다", STD: null });
      }
    }
  });
});
// router 객체를 다른곳에서 import 할수 있도록 export 하기
export default router;
