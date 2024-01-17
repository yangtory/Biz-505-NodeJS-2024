/**
 * express 프레임워크를 사용하여
 * router 객체 생성
 * 밑의 두 줄은 초기화 코드, 준비
 */
import express from "express";
const router = express.Router();

// localhost:3000/student/ 이 마지막 / 를 말함
router.get("/", (req, res) => {
  return res.render("student/list"); // student 앞에 / 는 생략되어 있따
});

router.get("/insert", (req, res) => {
  return res.render("student/input");
});
// router 객체를 다른곳에서 import 할수 있도록 export 하기
export default router;
