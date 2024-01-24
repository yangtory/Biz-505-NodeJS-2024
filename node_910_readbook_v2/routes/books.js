import express from "express";
import DB from "../models/index.js"; // sequelize 는 얘만 가져오면 db만듬

const router = express.Router();
const BOOK = DB.models.tbl_books;

router.get("/", async (req, res) => {
  try {
    // findAll() seq의 함수, 모든것을 찾아 rows에 담기
    const rows = await BOOK.findAll();
    return res.render("books/list", { books: rows });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/insert", async (req, res) => {
  // const book_data = new BOOK();
  // 각 요소의 값이 defaultValue 로 채워진 Data 객체 만들기 , 위 코드도 같다
  const book_data = await BOOK.build(); // 공백의 데이터 보내기
  return res.render("books/input", { book: book_data });
});

router.post("/insert", async (req, res) => {
  // sequelize 는 데이터를 모두 적어줄 필요가 없다 짱좋
  const book_data = req.body;
  try {
    await BOOK.create(book_data);
    return res.redirect("/books");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:isbn/update", async (req, res) => {
  const isbn = req.params.isbn;
  try {
    // findByPk() : pk 기준으로 찾아
    const row = await BOOK.findByPk(isbn);
    return res.render("books/input", { book: row });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:isbn/detail", async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const row = await BOOK.findByPk(isbn);
    return res.render("books/detail1", { book: row });
  } catch (error) {
    return res.json(error);
  }
});

router.post("/:isbn/update", async (req, res) => {
  const book_data = req.body;
  const isbn = req.params.isbn;
  try {
    // where 절의 기준으로 update 해
    await BOOK.update(book_data, { where: { isbn: isbn } });
    return res.redirect(`/books/${isbn}/detail`);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:isbn/delete", async (req, res) => {
  const isbn = req.params.isbn;
  try {
    await BOOK.destroy({ where: { isbn } });
    return res.redirect("/books");
  } catch (error) {
    return res.json(error);
  }
});

export default router;
