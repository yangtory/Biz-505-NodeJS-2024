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

router.get("/:isbn/detail", (req, res) => {
  const isbn = req.params.isbn;
  // return res.json(isbn);
  // const params = [isbn];
  const sql = " SELECT * FROM tbl_books WHERE isbn = ? ";

  dbConn
    .query(sql, isbn)
    .then((rows) => {
      // return res.json(rows[0][0]); 대괄호가 두 개 여서 0번째 위치의 0번째 요소
      return res.render("books/detail1", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.get("/:isbn/delete", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " DELETE FROM tbl_books WHERE isbn = ? ";

  dbConn
    .query(sql, isbn)
    .then((_) => {
      return res.redirect("/books");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

/**
 * 도서정보 자세히 보기에서 수정하기를 클릭했을때 ,
 * 브라우저의 주소창에 /books/isbn/update  라고 입력했을때,
 * GET /books/0003/update 라고 요청을 했을때
 *
 * 이 router 가 요청을 받아서 처리한다
 *
 * 이 요청은 0003 도서의 정보를 input box 에 보여주고 수정할수 있도록
 * 화면을 보여달라
 *
 * 스토리텔링을 통해 코드를 익혀 보자
 */
router.get("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " SELECT * FROM tbl_books WHERE isbn = ? ";
  dbConn
    .query(sql, isbn)
    .then((rows) => {
      return res.render("books/input", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

/**
 * 수정하기 화면에서 input box 에 값을 입력하고
 * 수정하기 버튼을 클릭했을때 POST 방식으로 데이터가 전달된다
 * POST /books/0003/update 로 요청할때
 */
router.post("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const params = {
    isbn: isbn,
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    price: Number(req.body.price),
    discount: Number(req.body.discount),
  };
  // 첫번째 ?: params 전달, 두번째 ? :isbn
  const sql = " UPDATE tbl_books SET ? WHERE isbn=?";
  /**
   * mysql2/promise 도구에서는 UPDATE SQL 문이 매우 간소해짐
   * UPDATE tbl_books SET title=?, author=? ... 과 같이 작성해야하는데
   * mysql2/promise 에서는 SET 이라는 키워드와 함께 json type 으로 만들어진 데이터를 통해
   * 업데이트 SQL 문이 매우 간소해짐
   *
   * 단, UPDATE 를 실행할때 WHERE 절에 isbn = ? 가 필수항목으로 사용해야 하므로
   * query() 함수에 전달하는 값은 배열로 2가지를 전달해야 한다 [params, isbn]
   */
  dbConn
    .query(sql, [params, isbn])
    .then((_) => {
      return res.redirect(`/books/${isbn}/detail`);
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});
export default router;
