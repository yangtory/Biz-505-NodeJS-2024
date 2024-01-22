import express from "express";
import DB from "../config/mysql.js";

const router = express.Router();
/**
 * DB 연결을 시도하는 DB.init() 함수는 async 키워드가 부착된다
 * 이 함수는 동기방식으로 실행되는데 (mysql.js 에서 async로 만들어서)
 * 일반적인 변수 = DB.init() 방식으로 return 값을 받을 수 없다
 * DB.init() 함수의 return 값은 .then() 함수를 통해서 받아야 한다
 */
let dbConn = null;
// init() 함수에 async 가 설정되어 동기식으로 작동된다
// 이 함수의 return 값을 받기 위해서는 .then() 함수를 사용하여 받아야한다
// db.init 실행돼서 리텅값이 만들어지면 덴 함수 커넥션에게 넘겨줌,
// 그리고 변수에 커넥션을 담는다 함수가끝나도 사라지지않도록
DB.init().then((connection) => (dbConn = connection)); // then은 async 를 붙히면 자동으로 생성되는 함수이다.
// console.log("dbConn", dbConn);
// const dbConn = DB.init();
// console.log(dbConn);

router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_books ";
  dbConn
    // query() 함수를 동기방식으로 실행
    // 비동기때는 쿼리뒤에 바로 명령문을씀
    .query(sql)
    // query() 함수 실행이 완료되면 .then() 함수에게 결과를 전달한다
    .then((rows) => {
      // console.log(rows);
      return res.render("books/list", { books: rows[0] });
    })
    // 실행중 오류가 발생하면 .catch() 에게 결과를 전달한다
    .catch((err) => {
      // trycatch 같은거, 오류가 발생하면 db_error 한테 보냄
      return res.render("db_error", err);
    });
});

router.get("/insert", (req, res) => {
  return res.render("books/input");
});

router.post("/insert", (req, res) => {
  // 표준아니고 mysql2 dependency도구가 지원하는 INSERT 구문
  const sql = " INSERT INTO tbl_books SET ? ";
  // {} 가 있으면 json 데이터임
  const params = {
    isbn: req.body.isbn,
    title: req.body.title,
    publisher: req.body.publisher,
    author: req.body.author,
    price: Number(req.body.price), //문자열형 숫자를 숫자로 변환
    discount: Number(req.body.discount),
  };
  dbConn
    .query(sql, params)
    .then((_) => {
      //_ : 변수가 필요없을때
      return res.redirect("/books");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

export default router;
