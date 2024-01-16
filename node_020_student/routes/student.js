// 기본적으로 임포트하기
import mysql from "mysql2";
import express from "express";
// express 프레임워크에 있는 Router() 함수를 사용하여 router 객체 만들기
const router = express.Router();
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!Biz8080",
  database: "schooldb",
  port: "3306",
});

router.get("/", async (req, res) => {
  // dbConn.connect(); // 데이터 베이스 연결
  // 연결된 통로를 통해 select 문을 전송한다
  dbConn.query("SELECT * FROM tbl_student", (err, result, field) => {
    if (err) {
      // sned 문자열을 그대로 보내라
      // js는 비동기 방식이기 때문에 return 을 붙힌다
      return res.send("DB 연결 Query 오류");
    } else {
      // 정상적인 데이터는 json 타입으로 보내서 응답해
      // return res.json(result);
      return res.render("student/list", { stList: result }); // result를 stList에 담아 list.pug한테 보내
    }
  });
  // dbConn.end();
});

//localhost:3000/student/insert
router.get("/insert", (req, res) => {
  res.render("student/input"); //input.pug 열어
});

router.post("/insert", (req, res) => {
  // form.post 의 input에 담긴 데이터를 받아서 배열로 생성
  const params = [req.body.st_num, req.body.st_name, req.body.st_dept];
  // 따로 쓸때는 앞 뒤로 띄어주기
  const sql = " INSERT INTO " + " tbl_student(st_num, st_name, st_dept) " + " VALUES(?,?,?) ";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.send("INSERT SQL 오류");
    } else {
      // 리스트 보여주기
      // 이미 위에 코드가 잇어서 redirect로 재요청, 이미 만들어진 주소로 유도하기
      return res.redirect("/student");
    }
  });
});

/*
 * /book/detail?book_code=0003
 * /book/0003/detail 위에 있는 것보다 안전
 * 값을 받는 방법 : ? 일때 query,post 일때 body, 주소 일때 params
 */

router.get("/:st_num/detail", (req, res) => {
  const st_num = req.params.st_num;
  const sql = " SELECT * FROM tbl_student " + " WHERE st_num = ? ";
  // st_num 의 값을 sql 에 보내서 ? 를 대신해라
  // 한 개의 값이어도 []에 담아 보내준다
  dbConn.query(sql, [st_num], (err, result) => {
    res.json(result);
  });
});
// router 객체를 컴포넌트로 만들어 export 하기
export default router;
